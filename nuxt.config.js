export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/vuetify",
    "@nuxtjs/style-resources"
  ],

  vuetify: {
    treeShake: true,
    theme: {
      options: { customProperties: true },
      dark: true,
      themes: {
        dark: {
          primary: "#0076ed",
          secondary: "#ffffff",
          accent: "#282a2e",
          info: "#0076ed",
          warning: "#0076ed",
          error: "#0076ed",
          success: "#0076ed"
        }
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  // modules: ["@nuxtjs/axios"],

  // axios: {
  //   proxy: true,
  //   withCredentials: true,
  //   Headers: true
  // },

  // router: {
  //   middleware: ["auth"]
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  styleResources: {
    scss: ["@/assets/scss/mixins.scss", "@/assets/scss/variables.scss"]
  },

  // publicRuntimeConfig: {
  //   // myPublicVariable: process.env.PUBLIC_VARIABLE,
  //   apiServerPublic: process.env.API_SERVER
  // },
  // privateRuntimeConfig: {
  //   // Might need to go in the above.
  //   apiServer: process.env.API_SERVER
  // }

  env: {
    apiServer: process.env.API_SERVER,
    baseServer: process.env.BASE_SERVER
  }
};
