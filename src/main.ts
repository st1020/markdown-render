import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"

import "virtual:uno.css"
import "vue-sonner/style.css"
import "./assets/index.css"

const app = createApp(App)
app.use(createPinia())
app.mount("#app")
