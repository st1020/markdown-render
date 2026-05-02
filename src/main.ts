import { createPinia } from "pinia"

import "virtual:uno.css"
import { createApp } from "vue"

import "vue-sonner/style.css"
import App from "./App.vue"

import "./assets/css/index.css"

const app = createApp(App)
app.use(createPinia())
app.mount("#app")
