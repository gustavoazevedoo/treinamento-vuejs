import { createApp } from "vue";
import "./assets/css/tailwind.css";
import "./assets/css/fonts.css";
import App from "./App.vue";
import "animate.css";
import router from "./router";

createApp(App).use(router).mount("#app");
