import json
from pathlib import Path

from aiohttp import web


# runs after providers are configured but before server is run
def install(ctx):
    # Load greetings from extension's `./ui/greetings.json`
    greetings_path = Path(__file__).parent / "ui" / "greetings.json"
    if greetings_path.exists():
        with open(greetings_path) as f:
            greetings = json.load(f)
    else:
        greetings = ["Merry Christmas!"]

    count = 0

    async def greet(request):
        nonlocal count
        name = request.query.get("name")
        if not name:
            data = await request.post()
            name = data.get("name")

        if not name:
            name = "Stranger"

        greeting = greetings[count % len(greetings)]
        count += 1
        return web.json_response({"result": f"Hello {name}, {greeting}"})

    ctx.add_get("greet", greet)  # GET  /ext/xmas/greet
    ctx.add_post("greet", greet)  # POST /ext/xmas/greet

    async def story(request):
        model = request.query.get("model")
        chat = ctx.chat_request(model=model, text="Tell me a short Christmas tale")
        response = await ctx.chat_completion(chat)
        return web.json_response(response)

    ctx.add_get("story", story)  # GET /ext/xmas/story


# register install extension handler
__install__ = install
