import base64
import json
import mimetypes
import time

import aiohttp


def install(ctx):
    from llms.main import GeneratorBase, OpenAiCompatible

    # https://openrouter.ai/docs/guides/overview/multimodal/image-generation
    class OpenRouterImageGenerator(GeneratorBase):
        sdk = "openrouter/image"

        def __init__(self, **kwargs):
            super().__init__(**kwargs)

        async def to_response(self, response, chat, started_at, context=None):
            # Try to extract and save images from OpenRouter's image API response
            images = []
            cost = None
            if "usage" in response and "cost" in response["usage"]:
                cost = response["usage"]["cost"]
            elif "cost" in response:
                cost = response["cost"]

            if "data" in response:
                for i, item in enumerate(response["data"]):
                    b64_json = item.get("b64_json")
                    image_url = item.get("url")
                    media_type = item.get("media_type") or "image/png"

                    ext = "png"
                    if "png" in media_type:
                        ext = "png"
                    elif "jpeg" in media_type or "jpg" in media_type:
                        ext = "jpg"
                    elif "svg" in media_type:
                        ext = "svg"
                    elif "webp" in media_type:
                        ext = "webp"

                    image_data = None
                    if b64_json:
                        if b64_json.startswith("data:"):
                            parts = b64_json.split(",", 1)
                            ext = parts[0].split(";")[0].split("/")[1]
                            image_data = base64.b64decode(parts[1])
                        else:
                            image_data = base64.b64decode(b64_json)
                    elif image_url:
                        ctx.log(f"GET {image_url}")
                        async with aiohttp.ClientSession() as session, await session.get(image_url) as res:
                            if res.status == 200:
                                image_data = await res.read()
                                content_type = res.headers.get("Content-Type")
                                if content_type:
                                    ext = mimetypes.guess_extension(content_type)
                                    if ext:
                                        ext = ext.lstrip(".")
                                    if not ext:
                                        ext = "png"
                            else:
                                raise Exception(f"Failed to download image: {res.status}")

                    if image_data:
                        model_name = chat["model"].split("/")[-1]
                        filename = f"{model_name}-{i}.{ext}"
                        relative_url, info = ctx.save_image_to_cache(
                            image_data,
                            filename,
                            ctx.to_file_info(chat, {"cost": cost}),
                            context=context,
                        )
                        images.append(
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": relative_url,
                                },
                            }
                        )
                    else:
                        raise Exception("No image data found")

                duration = int((time.time() - started_at) * 1000)

                # Construct standard OpenAI Chat Response
                openai_response = {
                    "id": response.get("id") or f"gen-{int(started_at)}",
                    "object": "chat.completion",
                    "created": response.get("created") or int(started_at),
                    "model": chat["model"],
                    "choices": [
                        {
                            "index": 0,
                            "message": {
                                "role": "assistant",
                                "content": self.default_content,
                                "images": images,
                            },
                            "finish_reason": "stop",
                        }
                    ],
                    "usage": response.get("usage")
                    or {
                        "prompt_tokens": 0,
                        "completion_tokens": 0,
                        "total_tokens": 0,
                    },
                }

                if cost is not None:
                    if "usage" not in openai_response:
                        openai_response["usage"] = {}
                    openai_response["usage"]["cost"] = cost
                    openai_response["cost"] = cost

                if "metadata" not in openai_response:
                    openai_response["metadata"] = {}
                openai_response["metadata"]["duration"] = duration

                if context is not None:
                    context["providerResponse"] = openai_response
                return openai_response

            if "error" in response:
                raise Exception(response["error"]["message"])

            ctx.log(json.dumps(response, indent=2))
            raise Exception("No 'data' field in response.")

        async def chat(self, chat, provider=None, context=None):
            headers = self.get_headers(provider, chat)
            if provider is not None:
                chat["model"] = provider.provider_model(chat["model"]) or chat["model"]

            started_at = time.time()
            if ctx.MOCK:
                print("Mocking OpenRouterGenerator")
                text = ctx.text_from_file(f"{ctx.MOCK_DIR}/openrouter-image.json")
                return ctx.log_json(await self.to_response(json.loads(text), chat, started_at, context=context))
            else:
                api = self.api or (provider.api if provider else None) or "https://openrouter.ai/api/v1"
                api_url = f"{api.rstrip('/')}/images"

                image_config = chat.get("image_config", {})
                prompt = ctx.last_user_prompt(chat)
                payload = {
                    "model": chat["model"],
                    "prompt": prompt,
                }

                aspect_ratio = image_config.get("aspect_ratio") or ctx.chat_to_aspect_ratio(chat)
                if aspect_ratio:
                    payload["aspect_ratio"] = aspect_ratio

                for key in ["resolution", "size", "quality", "num_images", "n", "seed", "response_format"]:
                    if key in image_config:
                        payload[key] = image_config[key]

                ctx.log(f"POST {api_url}")
                ctx.log(json.dumps(payload, indent=2))

                metadata = chat.pop("metadata", None)

                async with aiohttp.ClientSession() as session, session.post(
                    api_url,
                    headers=headers,
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=300),
                ) as response:
                    if metadata:
                        chat["metadata"] = metadata
                    if response.status < 300:
                        response_data = await response.json()
                        return ctx.log_json(await self.to_response(response_data, chat, started_at, context=context))
                    else:
                        text = await response.text()
                        try:
                            data = json.loads(text)
                            if "error" in data and "message" in data["error"]:
                                raise Exception(data["error"]["message"])
                        except json.JSONDecodeError:
                            pass
                        raise Exception(f"Failed to generate image {response.status}: {text}")

    ctx.add_provider(OpenRouterImageGenerator)


__install__ = install
