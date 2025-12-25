import { ref, inject } from "vue"

const icons = {
    tree: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#662113" d="M22.088 32.83c0 1.997-1.619 2.712-3.616 2.712s-3.616-.715-3.616-2.712l.904-8.136c0-1.996.715-1.808 2.712-1.808s2.712-.188 2.712 1.808z"/><path fill="#5c913b" d="M30.59 27.675c-6.294-5.392-8.843-13.112-12.118-13.112s-5.824 7.721-12.118 13.112c-2.645 2.266-1.385 3.577 2.241 3.314c3.232-.233 6.255-.966 9.877-.966s6.646.733 9.876.966c3.627.263 4.886-1.049 2.242-3.314"/><path fill="#3e721d" d="M28.546 25.538c-4.837-4.435-7.555-10.787-10.074-10.787c-2.517 0-5.236 6.352-10.073 10.787c-3.844 3.524 5.037 4.315 10.073 0c5.034 4.316 13.917 3.524 10.074 0"/><path fill="#5c913b" d="M28.546 21.945c-4.837-4.143-7.555-10.077-10.074-10.077c-2.517 0-5.236 5.934-10.073 10.077c-3.844 3.292 5.037 4.031 10.073 0c5.034 4.032 13.917 3.292 10.074 0"/><path fill="#3e721d" d="M26.336 19.003c-3.775-3.235-5.897-7.868-7.864-7.868c-1.965 0-4.088 4.632-7.864 7.868c-3 2.57 3.932 3.147 7.864 0c3.93 3.146 10.865 2.57 7.864 0"/><path fill="#5c913b" d="M26.336 16.311c-3.775-3.235-5.897-7.867-7.864-7.867c-1.965 0-4.088 4.632-7.864 7.867c-3 2.571 3.932 3.147 7.864 0c3.93 3.147 10.865 2.571 7.864 0"/><path fill="#3e721d" d="M24.818 13.92c-3.047-2.61-4.76-6.349-6.347-6.349c-1.586 0-3.299 3.739-6.347 6.349c-2.422 2.075 3.174 2.54 6.347 0c3.174 2.54 8.77 2.075 6.347 0"/><path fill="#5c913b" d="M24.818 11.894c-3.047-2.61-4.76-6.349-6.347-6.349c-1.586 0-3.299 3.739-6.347 6.349c-2.422 2.075 3.174 2.54 6.347 0c3.174 2.54 8.77 2.075 6.347 0"/><path fill="#3e721d" d="M23.301 8.911C20.983 6.925 19.68 4.08 18.472 4.08s-2.511 2.845-4.83 4.831c-1.843 1.579 2.415 1.933 4.83 0c2.414 1.933 6.673 1.579 4.829 0"/><path fill="#5c913b" d="M23.301 7.832C20.983 5.845 19.68 3 18.472 3s-2.511 2.845-4.83 4.832c-1.843 1.579 2.415 1.933 4.83 0c2.414 1.932 6.673 1.578 4.829 0"/><circle cx="16.5" cy="12.042" r="1.5" fill="#ffcc4d"/><circle cx="20" cy="25" r="2" fill="#ffcc4d"/><circle cx="22.5" cy="15.5" r="2.5" fill="#dd2e44"/><circle cx="10" cy="26" r="2" fill="#dd2e44"/><circle cx="14" cy="19" r="2" fill="#a6d388"/><circle cx="26" cy="23" r="2" fill="#a6d388"/><path fill="#ffac33" d="M19.379 1.679c.143.275.512.549.817.609l1.379.269c.305.06.377.29.159.512l-.983 1.004c-.217.222-.365.657-.326.965l.17 1.394c.038.309-.159.448-.438.31L18.9 6.117c-.279-.138-.738-.144-1.02-.013l-1.274.594c-.282.13-.476-.014-.43-.322l.205-1.39c.045-.307-.091-.745-.302-.973l-.959-1.027c-.212-.227-.135-.457.172-.508l1.385-.234c.307-.051.681-.316.832-.588L18.19.427c.151-.272.394-.269.537.006z"/></svg>`,
    santa: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#513f35" d="M69.41 94.83H45.75c-1.36 0-1.94.91-1.04 2.28c1.26 1.91 5.91 5.59 12.87 5.59s11.61-3.68 12.87-5.59c.89-1.37.31-2.28-1.04-2.28"/><path fill="#be2006" d="M60.5 5.94s30.38-1.52 43.84 19.89c12.59 20.02 11.17 42.3 11.17 42.3h-8.34s-.36-9.31-3.93-19.8c-1.6-4.71-3.28-8.64-6.69-13.83C89.31 23.48 75.02 12.91 60.5 5.94"/><circle cx="111.38" cy="76.74" r="10.79" fill="#cfd8dc"/><path fill="#e49500" d="M98.99 62.77s7.59 1.32 7.59 9.49c0 7.21-5.54 10.06-11.08 10.06V62.77zm-82.82 0s-7.59 1.32-7.59 9.49c0 7.21 5.54 10.06 11.08 10.06V62.77z"/><path fill="#fbc11b" d="M57.58 9.22c-32.72 0-41.28 25.37-41.28 61c0 36.95 23.75 46.5 41.28 46.5c17.28 0 41.28-9.28 41.28-46.5c0-35.63-8.56-61-41.28-61"/><path fill="#e49500" d="M63.29 84.78c-2.01.57-4.1.85-5.71.85s-3.7-.28-5.71-.85c-.86-.24-1.2.57-.89 1.11c.64 1.12 3.21 3.39 6.6 3.39s5.96-2.27 6.6-3.39c.31-.54-.03-1.36-.89-1.11"/><path fill="#444" d="M44.12 72.55c0 3.64-2.44 6.59-5.46 6.59s-5.47-2.95-5.47-6.59c0-3.65 2.45-6.6 5.47-6.6c3.03 0 5.46 2.95 5.46 6.6m26.91 0c0 3.64 2.44 6.59 5.47 6.59c3.01 0 5.46-2.95 5.46-6.59c0-3.65-2.45-6.6-5.46-6.6c-3.03 0-5.47 2.95-5.47 6.6"/><path fill="#6d4c41" d="m16.3 72.55l-2.18-13.43S9.39 7.35 58.7 7.35s41.64 54.02 41.64 54.02l-1.51 11.18l-12.81-21.7s-24.34 1.96-55.96-.42z"/><path fill="#dd2c00" d="M101.92 44.39C99.73 27.87 90.77 5.92 58.65 5.92C25.46 5.92 15.73 28.38 13 44.34a210.1 210.1 0 0 1 88.92.05"/><g fill="#e0e0e0"><path d="M57.58 123.5c-5.66-2.38-16.01-2.86-25.53-6.78C15.42 109.88 13.79 99.85 14 92.69c.29-9.82 1.93-10.72 1.69-20.15C15.52 66.08 13 58.88 13 58.88h10.43c-1.17 28.93 8.92 39.88 34.16 32.31z"/><path d="M57.58 123.5c5.66-2.38 16.01-2.86 25.53-6.78c16.62-6.85 18.26-16.88 18.05-24.03c-.29-9.82-1.93-10.72-1.69-20.15c.17-6.47 2.69-13.67 2.69-13.67H91.73c1.17 28.93-8.92 39.88-34.16 32.31z"/></g><g fill="#e0e0e0"><path d="M26.45 95.09c5.42-1.34 12.82-9.79 31.49-3.96c0 0 .9 9.47-10.08 11.42c-15 2.67-27.78-5.89-21.41-7.46"/><path d="M88.71 95.09c-5.42-1.34-12.82-9.79-31.49-3.96c0 0-.9 9.47 10.08 11.42c14.99 2.67 27.77-5.89 21.41-7.46"/></g><defs><path id="SVG6LrZeMbf" d="M106.33 61.34c-.04-4.39-.07-8.78-.11-13.17c-.05-1.6-1.34-3.18-2.93-3.53a210.1 210.1 0 0 0-91.68 0c-1.58.35-2.88 1.93-2.93 3.53c-.04 4.39-.07 8.77-.11 13.16c0 0-.17 3.37 2.04 4.74c0 0 1.34-1.8 4.07-2.85c28.1-5.81 57.44-5.81 85.54 0c2.73 1.05 4.15 2.66 4.15 2.66c2.1-1.32 1.97-4.49 1.96-4.54"/></defs><use fill="#f5f5f5" href="#SVG6LrZeMbf"/><clipPath id="SVG6HYuvcHg"><use href="#SVG6LrZeMbf"/></clipPath><path fill="#cfd8dc" d="M95.11 42.91c1.19.25 3.98 1.76 4.05 4.37c.1 3.4.26 4.64.05 6.09c-.35 2.47-3.29 3.62-6.11 3.26c-15.55-1.98-28.59-5.62-44.21-4.35c-11.48.94-23.33 4.76-34.83 5.4c-3.24.18-5.55-2-5.62-3.24c-.02 3.32-.41 7.01-.43 10.33c6.11 10.97 49.13 3.42 73.84 3.82c7.84.12 15.78.51 23.42-1.27c.53-.12 1.07-.27 1.49-.62c.47-.39.7-.99.92-1.56c.6-1.59 1.2-3.18 1.8-4.76c.85-2.24 1.7-4.51 1.87-6.9c.2-2.85-.6-5.7-1.77-8.31c-.24-.53-.52-1.09-1.01-1.4c-.41-.27-.92-.33-1.41-.39l-8.6-.99" clip-path="url(#SVG6HYuvcHg)"/><path fill="#4c3734" d="M69.41 94.83H45.75c-1.36 0-1.94.91-1.04 2.28c1.26 1.91 5.91 5.59 12.87 5.59s11.61-3.68 12.87-5.59c.89-1.37.31-2.28-1.04-2.28"/></svg>`,
    candy: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><path fill="currentColor" d="M517.8 103.6c30.2 45.6 34.7 103.3 13.3 152.4H365.7l41.4-41.4c.8-.8 1.5-1.6 2.2-2.4zM364 166.9c-.8.7-1.6 1.4-2.4 2.2l-28.1 28.1c-25 25-65.5 25-90.5 0s-25-65.5 0-90.5l28-28.1c54.9-54.8 139.5-61.3 201.5-20.2zM221.7 400l80-80h181l-82.5 82.5V400zm117 64L237.4 565.3c-25 25-65.5 25-90.5 0s-25-65.5 0-90.5l10.7-10.7h181z"/></svg>`,
}

const extension = ctx => ctx.scope('xmas')

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
        <div class="mb-2 flex justify-center">
            <svg class="size-20 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#513f35" d="M69.41 94.83H45.75c-1.36 0-1.94.91-1.04 2.28c1.26 1.91 5.91 5.59 12.87 5.59s11.61-3.68 12.87-5.59c.89-1.37.31-2.28-1.04-2.28"/><path fill="#be2006" d="M60.5 5.94s30.38-1.52 43.84 19.89c12.59 20.02 11.17 42.3 11.17 42.3h-8.34s-.36-9.31-3.93-19.8c-1.6-4.71-3.28-8.64-6.69-13.83C89.31 23.48 75.02 12.91 60.5 5.94"/><circle cx="111.38" cy="76.74" r="10.79" fill="#cfd8dc"/><path fill="#e49500" d="M98.99 62.77s7.59 1.32 7.59 9.49c0 7.21-5.54 10.06-11.08 10.06V62.77zm-82.82 0s-7.59 1.32-7.59 9.49c0 7.21 5.54 10.06 11.08 10.06V62.77z"/><path fill="#fbc11b" d="M57.58 9.22c-32.72 0-41.28 25.37-41.28 61c0 36.95 23.75 46.5 41.28 46.5c17.28 0 41.28-9.28 41.28-46.5c0-35.63-8.56-61-41.28-61"/><path fill="#e49500" d="M63.29 84.78c-2.01.57-4.1.85-5.71.85s-3.7-.28-5.71-.85c-.86-.24-1.2.57-.89 1.11c.64 1.12 3.21 3.39 6.6 3.39s5.96-2.27 6.6-3.39c.31-.54-.03-1.36-.89-1.11"/><path fill="#444" d="M44.12 72.55c0 3.64-2.44 6.59-5.46 6.59s-5.47-2.95-5.47-6.59c0-3.65 2.45-6.6 5.47-6.6c3.03 0 5.46 2.95 5.46 6.6m26.91 0c0 3.64 2.44 6.59 5.47 6.59c3.01 0 5.46-2.95 5.46-6.59c0-3.65-2.45-6.6-5.46-6.6c-3.03 0-5.47 2.95-5.47 6.6"/><path fill="#6d4c41" d="m16.3 72.55l-2.18-13.43S9.39 7.35 58.7 7.35s41.64 54.02 41.64 54.02l-1.51 11.18l-12.81-21.7s-24.34 1.96-55.96-.42z"/><path fill="#dd2c00" d="M101.92 44.39C99.73 27.87 90.77 5.92 58.65 5.92C25.46 5.92 15.73 28.38 13 44.34a210.1 210.1 0 0 1 88.92.05"/><g fill="#e0e0e0"><path d="M57.58 123.5c-5.66-2.38-16.01-2.86-25.53-6.78C15.42 109.88 13.79 99.85 14 92.69c.29-9.82 1.93-10.72 1.69-20.15C15.52 66.08 13 58.88 13 58.88h10.43c-1.17 28.93 8.92 39.88 34.16 32.31z"/><path d="M57.58 123.5c5.66-2.38 16.01-2.86 25.53-6.78c16.62-6.85 18.26-16.88 18.05-24.03c-.29-9.82-1.93-10.72-1.69-20.15c.17-6.47 2.69-13.67 2.69-13.67H91.73c1.17 28.93-8.92 39.88-34.16 32.31z"/></g><g fill="#e0e0e0"><path d="M26.45 95.09c5.42-1.34 12.82-9.79 31.49-3.96c0 0 .9 9.47-10.08 11.42c-15 2.67-27.78-5.89-21.41-7.46"/><path d="M88.71 95.09c-5.42-1.34-12.82-9.79-31.49-3.96c0 0-.9 9.47 10.08 11.42c14.99 2.67 27.77-5.89 21.41-7.46"/></g><defs><path id="SVG6LrZeMbf" d="M106.33 61.34c-.04-4.39-.07-8.78-.11-13.17c-.05-1.6-1.34-3.18-2.93-3.53a210.1 210.1 0 0 0-91.68 0c-1.58.35-2.88 1.93-2.93 3.53c-.04 4.39-.07 8.77-.11 13.16c0 0-.17 3.37 2.04 4.74c0 0 1.34-1.8 4.07-2.85c28.1-5.81 57.44-5.81 85.54 0c2.73 1.05 4.15 2.66 4.15 2.66c2.1-1.32 1.97-4.49 1.96-4.54"/></defs><use fill="#f5f5f5" href="#SVG6LrZeMbf"/><clipPath id="SVG6HYuvcHg"><use href="#SVG6LrZeMbf"/></clipPath><path fill="#cfd8dc" d="M95.11 42.91c1.19.25 3.98 1.76 4.05 4.37c.1 3.4.26 4.64.05 6.09c-.35 2.47-3.29 3.62-6.11 3.26c-15.55-1.98-28.59-5.62-44.21-4.35c-11.48.94-23.33 4.76-34.83 5.4c-3.24.18-5.55-2-5.62-3.24c-.02 3.32-.41 7.01-.43 10.33c6.11 10.97 49.13 3.42 73.84 3.82c7.84.12 15.78.51 23.42-1.27c.53-.12 1.07-.27 1.49-.62c.47-.39.7-.99.92-1.56c.6-1.59 1.2-3.18 1.8-4.76c.85-2.24 1.7-4.51 1.87-6.9c.2-2.85-.6-5.7-1.77-8.31c-.24-.53-.52-1.09-1.01-1.4c-.41-.27-.92-.33-1.41-.39l-8.6-.99" clip-path="url(#SVG6HYuvcHg)"/><path fill="#4c3734" d="M69.41 94.83H45.75c-1.36 0-1.94.91-1.04 2.28c1.26 1.91 5.91 5.59 12.87 5.59s11.61-3.68 12.87-5.59c.89-1.37.31-2.28-1.04-2.28"/></svg>
        </div>
        <h2 class="text-2xl font-semibold text-red-700 dark:text-red-300 mb-2">Merry Xmas!</h2>
    `
}

// Replace HomeTools features
const HomeTools = {
    template: `<DarkModeToggle class="mt-4" />`,
}

const XmasPage = {
    template: `
    <div class="relative overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-900 shadow-2xl border-b border-white/10 select-none">
        
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div class="absolute -top-10 left-[10%] opacity-50 transform rotate-12 transition-transform duration-[20s] ease-in-out [&>svg]:w-full [&>svg]:h-full" v-html="icons.candy" style="width: 120px; color: white;"></div>
            <div class="absolute -bottom-10 right-[10%] opacity-50 transform -rotate-12 transition-transform duration-[15s] ease-in-out [&>svg]:w-full [&>svg]:h-full" v-html="icons.candy" style="width: 140px; color: white;"></div>
        </div>
        
        <div class="container mx-auto px-4 py-8 relative z-10">
            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                
                <!-- Left Icon -->
                <div class="hidden md:block w-32 h-32 transform hover:scale-110 transition-transform duration-500 drop-shadow-2xl filter brightness-110 [&>svg]:w-full [&>svg]:h-full" v-html="icons.tree"></div>
                
                <!-- Main Content -->
                <div class="flex-1 max-w-2xl text-center">
                    <h2 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 mb-6 drop-shadow-sm font-serif tracking-wide py-2">
                        🎄 Holiday Greetings 🎅
                    </h2>
                    
                    <form @submit.prevent="onSubmit" class="bg-white/10 backdrop-blur-md p-2 rounded-full shadow-inner border border-white/20 flex flex-col sm:flex-row transition-all focus-within:ring-4 ring-yellow-400/30">
                        <input 
                            id="name" 
                            name="name"
                            v-model="request.name"
                            type="text" 
                            placeholder="Who should we greet?" 
                            class="flex-1 bg-transparent border-none text-white placeholder-gray-300 px-6 py-3 rounded-full focus:ring-0 text-lg text-center sm:text-left outline-none"
                            required
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
                <div class="hidden md:block w-32 h-32 transform hover:scale-110 transition-transform duration-500 drop-shadow-2xl filter brightness-110 [&>svg]:w-full [&>svg]:h-full" v-html="icons.santa"></div>

            </div>
        </div>
    </div>
    `,
    setup() {
        const ctx = inject('ctx')
        const ext = extension(ctx)
        const request = ref({ name: '' })
        const result = ref('')
        async function onSubmit(e) {
            const form = new FormData(e.target)
            const res = await ext.postForm('/greet', {
                body: form
            })
            try {
                result.value = (await res.json()).result
            } catch (e) {
                result.value = `${e}`
            }
        }
        return {
            request,
            onSubmit,
            result,
            icons,
        }
    }
}

const XmasTopPanel = {
    template: `
        <div class="w-full bg-gradient-to-b from-red-900 via-red-800 to-red-950 border-b-8 border-yellow-500/30 p-8 md:p-12 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden select-none min-h-[300px] text-center">
             
             <!-- Background Decor -->
             <div class="absolute inset-0 opacity-5 pointer-events-none">
                 <div class="absolute -top-10 -left-10 transform rotate-12" v-html="icons.candy" style="width: 300px; color: white;"></div>
                 <div class="absolute -bottom-10 -right-10 transform -rotate-12" v-html="icons.candy" style="width: 300px; color: white;"></div>
             </div>

             <div class="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6">
                <div class="w-32 h-32 drop-shadow-2xl filter brightness-110" v-html="icons.santa"></div>
                
                <div class="space-y-2">
                    <h1 class="text-5xl md:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 drop-shadow-sm tracking-wider">
                        Ask Santa
                    </h1>
                    <div class="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto opacity-50"></div>
                </div>

                <p class="text-lg md:text-xl text-red-100 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-md border border-white/10 bg-black/20 backdrop-blur-sm rounded-xl p-4">
                    The magical line to the North Pole is open! <br/>
                    <span class="text-yellow-200/90 text-base italic mt-1 block">
                        Chat directly with Santa Claus about your holiday wishes, good deeds, or ask for a festive story.
                    </span>
                </p>
             </div>
        </div>
    `,
    setup() {
        return { icons }
    }
}

export default {
    install(ctx) {

        ctx.components({
            Brand,
            Welcome,
            XmasPage,
            XmasTopPanel,
            HomeTools,
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

        const santaSystemPrompt = `
            You are Santa Claus—warm, wise, and good-humored—speaking from the North Pole just before Christmas.
            You answer questions with kindness, gentle humor, and a touch of holiday magic.
            You may reference elves, reindeer, the workshop, and the Naughty-or-Nice list, but your advice should be sincere, encouraging, and age-appropriate.
            When helpful, you offer practical wisdom wrapped in festive storytelling.
            You never break character, and you always aim to leave the reader feeling hopeful, inspired, and a little more merry.        
        `

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
        const ext = extension(ctx)
        ctx.state.greetings = await ext.getJson("/greetings.json")
    }
}