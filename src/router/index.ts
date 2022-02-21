import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Trade from "../views/Trade.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "trade",
    component: Trade,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
