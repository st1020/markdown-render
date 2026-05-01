// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "radix-vue/nuxt",
    "shadcn-nuxt"
  ],

  css: ["@unocss/reset/tailwind.css", "~/assets/css/index.css"],

  shadcn: {
    prefix: "Ui",
    componentDir: "./src/components/ui"
  },

  runtimeConfig: {
    public: {
      googleFontsKey: ""
    }
  },

  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#222" }
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "application-name", content: "Oh My CV!" },
        { name: "apple-mobile-web-app-title", content: "Oh My CV!" },
        { name: "msapplication-TileColor", content: "#fff" },
        { property: "og:url", content: "https://ohmycv.app" },
        { property: "og:type", content: "website" }
      ]
    }
  },

  compatibilityDate: "2026-05-01"
});
