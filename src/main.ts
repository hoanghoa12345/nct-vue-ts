import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
import router from "./router";

const app = createApp(App);
app.use(VueTippy);
app.use(router);
app.mount("#app");
