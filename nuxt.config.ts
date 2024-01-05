// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui','@pinia/nuxt', '@vueuse/nuxt'],
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  typescript: {
    strict: true
  },
  pinia: {
      autoImports: [ 'defineStore', [ 'defineStore', 'definePiniaStore' ] ]
  },
  colorMode: {
    preference: 'light'
  },
  css: ['~/assets/css/vello.css']
})
