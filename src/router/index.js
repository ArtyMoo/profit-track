import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Seettings",
    // route level code-splitting
    // this generates a separate chunk (settings.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "settings" */ "../views/Settings.vue");
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
