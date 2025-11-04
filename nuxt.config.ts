// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@pinia/nuxt", "nuxt-svgo", "@vueuse/nuxt"],
  app: {
    head: {
      title: "Little Victories",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "https://fav.farm/⛵" },
      ],
    },
  },
  runtimeConfig: {
    turso: {
      databaseUrl: process.env.NUXT_TURSO_DATABASE_URL,
      authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
    },
  },
});