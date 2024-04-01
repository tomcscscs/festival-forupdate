import * as bootstrap from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import Map from "./screens/Map.vue";
import Login from "./screens/Login.vue";
import Signup from "./screens/Signup.vue";
import Index from "./screens/Index.vue";

import FestivalView from "./components/festival/FestivalView.vue";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index },
    {
      path: "/map",
      component: Map,
      children: [{ path: "festival/:id", component: FestivalView }],
    },
    { path: "/login/email", component: Login },
    { path: "/signup/email", component: Signup },
  ],
  linkActiveClass: "active",
});
app.use(router);
app.mount("#app");
