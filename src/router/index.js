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
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (settings.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "settings" */ "../views/Settings.vue");
    },
  },
  {
    path: "/calculator",
    name: "Calculator",

    component: function () {
      return import(/* webpackChunkName: "settings" */ "../views/Calculator.vue");
    },
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
