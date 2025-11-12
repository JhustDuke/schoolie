import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.vue";

const app = createApp(App); // ✅ create app instance

app.use(createPinia()); // ✅ register Pinia plugin
app.mount("#app"); // ✅ mount to DOM
