import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeView.vue") },
    { path: "/movie/:id", component: () => import("../views/MovieView.vue") },
    {
      path: "/favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
