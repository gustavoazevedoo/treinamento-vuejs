import { createApp } from "vue";
import "./assets/css/tailwind.css";
import "./assets/css/fonts.css";
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "animate.css";
import router from "./router";

createApp(App).use(router).use(Toast, { position: POSITION.BOTTOM_RIGHT }).mount("#app");
