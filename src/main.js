import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";

// The app
createApp(App).use(router).mount("#app");
createApp(App).use(firestorePlugin);