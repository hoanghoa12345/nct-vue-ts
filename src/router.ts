import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./layouts/index.vue"),
    children: [
      {
        path: "/",
        component: () => import("./pages/index.vue"),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
});
