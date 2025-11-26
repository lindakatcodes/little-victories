// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-svgo", "@vueuse/nuxt"],
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
    public: {
      UNSPLASH_REFERRER: process.env.UNSPLASH_REFERRER,
    },
  },
});