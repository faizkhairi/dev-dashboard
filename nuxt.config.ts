export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  nitro: { preset: 'vercel' },
  runtimeConfig: {
    githubToken: '',
    vercelToken: '',
    public: {
      githubUsername: 'faizkhairi',
    },
  },
  tailwindcss: { cssPath: '~/assets/css/main.css' },
  typescript: { strict: true },
})
