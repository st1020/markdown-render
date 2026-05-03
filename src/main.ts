import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import "iconify-icon"

import "virtual:uno.css"
import "vue-sonner/style.css"
import "./assets/index.css"

const app = createApp(App)
app.use(createPinia())
app.mount("#app")
