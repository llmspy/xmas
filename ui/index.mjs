import { ref, inject, watch, onMounted } from "vue"

// Scope for 'xmas' extension
let ext

const icons = {
    candy: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><path fill="currentColor" d="M517.8 103.6c30.2 45.6 34.7 103.3 13.3 152.4H365.7l41.4-41.4c.8-.8 1.5-1.6 2.2-2.4zM364 166.9c-.8.7-1.6 1.4-2.4 2.2l-28.1 28.1c-25 25-65.5 25-90.5 0s-25-65.5 0-90.5l28-28.1c54.9-54.8 139.5-61.3 201.5-20.2zM221.7 400l80-80h181l-82.5 82.5V400zm117 64L237.4 565.3c-25 25-65.5 25-90.5 0s-25-65.5 0-90.5l10.7-10.7h181z"/></svg>`,
}

const santaSystemPrompt = `
    You are Santa Claus—warm, wise, and good-humored—speaking from the North Pole just before Christmas.
    You answer questions with kindness, gentle humor, and a touch of holiday magic.
    You may reference elves, reindeer, the workshop, and the Naughty-or-Nice list, but your advice should be sincere, encouraging, and age-appropriate.
    When helpful, you offer practical wisdom wrapped in festive storytelling.
    You never break character, and you always aim to leave the reader feeling hopeful, inspired, and a little more merry.        
`

// Replace Brand component
const Brand = {
    template: `
    <div class="flex-shrink-0 p-2 border-b border-gray-200 dark:border-gray-700 select-none">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <button type="button"
                    @click="$router.push('/')"
                    class="text-lg uppercase font-semibold text-green-800 dark:text-green-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors"
                    title="Go back home">
                    🎄 {{ $state.title }} 🎄
                </button>
            </div>
        </div>
    </div>
    `,
}

// Replace Welcome component
const Welcome = {
    template: `
        <!-- decor -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div v-for="(decor, i) in decors" :key="'decor-'+i"
                    class="absolute select-none"
                    :style="decor.style">
                {{decor.icon}}
            </div>
        </div>

        <div class="mb-2 flex justify-center">
            <span class="text-8xl">🎅🏻</span>
        </div>
        <h2 class="text-2xl font-semibold text-red-700 dark:text-red-300 mb-2">Merry Xmas!</h2>
    `,
    setup() {
        const chars = [
            '❄️', '⭐', '🥛', '🍪', '🦌', '🕯️', '🎁', '☃️', '🛷', '🎶', '🎄', '🌨️', '🌟', '💝', '🍬', '🍰', '🔔', '🍷']

        let i = 0
        const decors = Array.from({ length: 50 }).map(() => ({
            icon: chars[++i % chars.length],
            style: {
                top: Math.max(Math.random() * 100, 5) + '%',
                left: Math.random() * 100 + '%',
                fontSize: Math.floor(Math.random() * (60 - 20 + 1) + 18) + 'px',
                opacity: Math.random() * .3 + .1
            }
        }))

        return { decors }
    }
}

// Replace HomeTools features
const HomeTools = {
    template: `<DarkModeToggle class="mt-4" />`,
}

const XmasPage = {
    template: `
    <div class="relative h-full overflow-y-auto bg-gradient-to-r from-green-900 via-green-800 to-green-900 shadow-2xl border-b border-white/10 select-none">
        
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div class="absolute -top-10 left-[10%] opacity-50 transform rotate-12 transition-transform duration-[20s] ease-in-out [&>svg]:w-full [&>svg]:h-full" v-html="icons.candy" style="width: 120px; color: white;"></div>
            <div class="absolute -bottom-10 right-[10%] opacity-50 transform -rotate-12 transition-transform duration-[15s] ease-in-out [&>svg]:w-full [&>svg]:h-full" v-html="icons.candy" style="width: 140px; color: white;"></div>
        </div>
        
        <div class="container mx-auto px-4 py-8 relative z-10">
            <div class="flex justify-center">
                <h2 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 mb-6 drop-shadow-sm font-serif tracking-wide py-2 whitespace-nowrap">
                    🎄 Holiday Greetings 🎅
                </h2>
            </div>
            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                
                <!-- Left Icon -->
                <div class="hidden md:block text-9xl transform hover:scale-110 transition-transform duration-500 drop-shadow-2xl filter brightness-110 [&>svg]:w-full [&>svg]:h-full">🎄</div>
                    
                <!-- Main Content -->
                <div class="flex-1 max-w-2xl text-center">
                    <form @submit.prevent="onSubmit" class="bg-white/10 backdrop-blur-md p-2 rounded-full shadow-inner border border-white/20 flex flex-col sm:flex-row transition-all focus-within:ring-4 ring-yellow-400/30">
                        <input 
                            id="name" 
                            name="name"
                            v-model="ext.prefs.name"
                            type="text" 
                            placeholder="Who should we greet?" 
                            class="flex-1 bg-transparent border-none text-white placeholder-gray-300 px-6 py-3 rounded-full focus:ring-0 text-lg text-center sm:text-left outline-none"
                            autocomplete="off"
                        />
                        <button 
                            type="submit"
                            class="mt-2 sm:mt-0 bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-red-900 font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-lg uppercase tracking-wider"
                        >
                            Greet
                        </button>
                    </form>

                    <!-- Result Area -->
                     <div v-if="result" class="mt-8 animate-fade-in-up">
                        <div class="inline-block relative">
                            <div class="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
                            <div class="relative bg-white/10 backdrop-blur-xl border border-white/30 text-yellow-100 px-12 py-6 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
                                <p class="text-2xl font-serif italic leading-relaxed text-shadow-sm">
                                    "{{ result }}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Icon -->
                <div class="hidden text-9xl md:block transform hover:scale-110 transition-transform duration-500 drop-shadow-2xl filter brightness-110 [&>svg]:w-full [&>svg]:h-full">🎅🏻</div>

            </div>
            <!-- Story Section -->
            <div v-if="ext.state.story" class="mt-12 max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 0.3s">
                <div class="relative bg-[#fdfbf7] dark:bg-[#1a1614] rounded-lg shadow-[0_0_40px_rgba(255,215,0,0.1)] border-8 border-double border-red-800/20 dark:border-red-900/40 p-1">
                    
                    <!-- Inner Border -->
                    <div class="border-2 border-dashed border-yellow-600/30 rounded px-8 py-10 md:px-12 md:py-14 relative overflow-hidden">
                        
                        <!-- Corner Decorations -->
                        <div class="absolute top-0 left-0 text-4xl opacity-20 transform -translate-x-1/4 -translate-y-1/4">❄️</div>
                        <div class="absolute top-0 right-0 text-4xl opacity-20 transform translate-x-1/4 -translate-y-1/4">❄️</div>
                        <div class="absolute bottom-0 left-0 text-4xl opacity-20 transform -translate-x-1/4 translate-y-1/4">❄️</div>
                        <div class="absolute bottom-0 right-0 text-4xl opacity-20 transform translate-x-1/4 translate-y-1/4">❄️</div>

                        <div class="text-center mb-8">
                            <h3 class="font-serif text-3xl text-red-800 dark:text-red-400 mb-2">A Christmas Tale</h3>
                            <div class="flex items-center justify-center gap-2 text-yellow-500/60">
                                <span class="h-px w-12 bg-current"></span>
                                <span class="text-xl">❦</span>
                                <span class="h-px w-12 bg-current"></span>
                            </div>
                        </div>

                        <div class="prose prose-lg dark:prose-invert mx-auto font-serif leading-loose text-gray-800 dark:text-gray-200">
                             <div class="whitespace-pre-wrap first-letter:text-5xl first-letter:text-red-700 first-letter:font-black first-letter:mr-1 first-letter:float-left first-letter:leading-none selection:bg-red-100 dark:selection:bg-red-900/30">
                                {{ ext.state.story }}
                            </div>
                        </div>

                        <div class="text-center mt-12 opacity-50">
                            <div class="text-2xl mb-2">🎄</div>
                            <div class="text-sm font-serif italic text-gray-500">Wishing you a Merry Christmas</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    setup() {
        const ctx = inject('ctx')

        const result = ref('')

        async function onSubmit(e) {
            generateStory()
            ext.savePrefs() // saves {"name":"..."} to localStorage['llms.xmas']
            const form = new FormData(e.target)
            // POST /ext/xmas/greet (multipart/form-data)
            const res = await ext.postForm('/greet', {
                body: form
            })
            try {
                result.value = (await res.json()).result
            } catch (e) {
                result.value = `${e}`
            }
        }

        async function generateStory() {
            const freeStoryModelNames = ['Kimi K2 0905', 'Kimi K2 Instruct', 'Kimi K2 (free)', 'Kimi Dev 72b (free)', 'GPT OSS 120B']
            const availableStoryModel = freeStoryModelNames.map(name => ctx.chat.getModel(name)).find(x => !!x)
            if (!availableStoryModel) {
                console.log('No story models available')
                return
            }
            ext.state.story = `Santa begins to tell you a christmas story...`
            const request = ctx.chat.createRequest({
                model: availableStoryModel,
                text: `Write a short, feel-good Christmas story set on a quiet winter evening. Focus on simple kindness, cozy details, and gentle magic—twinkling lights, warm drinks, falling snow, and a small act of generosity that brings people together. Keep the tone hopeful and comforting, with a soft, joyful ending that leaves the reader smiling.`,
                systemPrompt: santaSystemPrompt,
            })
            const api = await ctx.chat.completion({
                request
            })
            if (api.response) {
                ext.state.story = ctx.chat.getAnswer(api.response)
            } else if (api.error) {
                ext.state.story = api.error.message
            }
        }

        onMounted(() => {
            if (!ext.state.story) {
                generateStory()
            }
        })

        return {
            ext,
            onSubmit,
            result,
            icons,
        }
    }
}

const XmasTopPanel = {
    template: `
        <div class="w-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 border-b-8 border-yellow-500/30 p-6 md:p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden select-none min-h-[220px] text-center">
             
             <!-- Background Decor -->
             <div class="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay overflow-hidden">
                <div v-for="(item, i) in candyCanes" :key="i" 
                     class="absolute [&>svg]:w-full [&>svg]:h-full"
                     :style="item.style"
                     v-html="icons.candy">
                </div>
             </div>
             
             <!-- Snowflakes -->
             <div class="absolute inset-0 pointer-events-none overflow-hidden">
                <div v-for="(flake, i) in snowflakes" :key="'flake-'+i"
                     class="absolute select-none"
                     :style="flake.style">
                     ❄️
                </div>
             </div>

             <div class="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
                
                <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-6 w-full">
                    <!-- Santa Icon with Glow -->
                    <div class="relative group shrink-0">
                        <div class="absolute inset-0 bg-white/40 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                        <div class="text-8xl relative z-10 drop-shadow-2xl filter brightness-110 transform group-hover:scale-105 transition-transform duration-300">🎅🏻</div>
                    </div>
                    
                    <div class="space-y-1 text-center md:text-left">
                        <h1 class="text-5xl md:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 drop-shadow-sm tracking-wide leading-tight">
                            Ask Santa
                        </h1>
                        <div class="h-1.5 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-75 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                    </div>
                </div>

                <div class="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 md:px-8 md:py-6 max-w-3xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-colors duration-300">
                     <p class="text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-md">
                        The magical line to the North Pole is open!
                    </p>
                    <p class="text-yellow-100/90 text-sm md:text-base mt-1 font-normal leading-relaxed">
                        Chat directly with Santa Claus about your holiday wishes, good deeds, or ask for a festive story.
                    </p>
                </div>
             </div>
        </div>
    `,
    setup() {
        const candyCanes = [
            { style: { top: '1%', left: '1%', width: '120px', transform: 'rotate(90deg)' } },
            { style: { top: '40%', left: '0%', width: '270px', transform: 'rotate(15deg)' } },
            { style: { bottom: '20%', right: '6%', width: '210px', transform: 'rotate(-25deg)' } },
            { style: { top: '55%', right: '-3%', width: '180px', transform: 'rotate(-60deg)' } },
        ]

        const snowflakes = Array.from({ length: 20 }).map((_, i) => ({
            style: {
                top: Math.max(Math.random() * 100, 5) + '%',
                left: Math.random() * 100 + '%',
                fontSize: Math.floor(Math.random() * (60 - 20 + 1) + 18) + 'px',
                opacity: Math.random() * .2 + .05
            }
        }))

        return { icons, candyCanes, snowflakes }
    }
}

export default {
    install(ctx) {
        // create extension scope
        ext = ctx.scope('xmas')

        ctx.components({
            // Replaces built-in UI Components
            Brand,
            Welcome,
            HomeTools,
            // Registers other custom components used in this UI Extension
            XmasPage,
            XmasTopPanel,
        })

        ctx.setLeftIcons({
            xmas: {
                component: {
                    template: `<button @click="$ctx.togglePath('/xmas')" class="text-lg flex items-center">🎄</button>`
                },
                isActive({ path }) { return path === '/xmas' }
            }
        })

        ctx.routes.push({ path: '/xmas', component: XmasPage, meta: { title: `Merry Christmas!` } })

        // Auto hide top panel on non chat pages
        ctx.onRouterBeforeEach((to, from) => {
            if (to.path !== '/' && !to.path.startsWith('/c/')) {
                ctx.toggleTop('XmasTopPanel', false)
            }
        })

        ctx.setTopIcons({
            xmas: {
                component: {
                    template: `<button @click="toggle" class="text-lg flex items-center">🎁</button>`,
                    setup() {
                        const ctx = inject('ctx')
                        async function toggle() {
                            if (ctx.toggleTop('XmasTopPanel')) {
                                ctx.threads.startNewThread({ title: 'Ask Santa' })
                            }
                        }
                        return {
                            toggle,
                        }
                    }
                },
                isActive({ top }) {
                    return top === 'XmasTopPanel'
                }
            }
        })

        // Intercept layout classes 
        ctx.onClass((id, cls) => {
            // only return custom class for home page
            if (ctx.router.currentRoute.value?.path !== '/') return
            if (id == 'page') {
                return cls + ' bg-slate-50! dark:bg-slate-950!'
            }
        })

        const isTopOpen = () => ctx.layout.top === 'XmasTopPanel'

        ctx.createThreadFilters.push(thread => {
            if (!isTopOpen()) return
            thread.systemPrompt = santaSystemPrompt
        })

        ctx.chatRequestFilters.push(({ request, thread }) => {
            if (!isTopOpen()) return

            // clear existing system prompt
            request.messages = request.messages.filter(x => x.role !== 'system')
            request.messages.unshift({
                role: 'system',
                content: santaSystemPrompt
            })
        })

    },

    async load(ctx) {
        // GET /ext/xmas/greetings.json
        const greetings = await ext.getJson("/greetings.json")

        // maintain in local reactive state in (localized to extension)
        ext.state.greetings = greetings

        // maintain in global reactive state
        ctx.state.greetings = greetings
    }
}