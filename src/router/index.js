import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ricette",
    name: "ricette",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/RecipeView.vue"),
  },
  {
    path: "/ricetta/:id",
    name: "recipe-details",
    component: () => import("../views/RecipeDetails.vue"),
    props: true,
  },
  {
    path: "/profilo",
    name: "profilo",
    component: () => import("../views/UserView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("../views/EditorView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "login" };
  }
  if (to.name === "login" && isLoggedIn) {
    return { name: "home" };
  }
  return true;
});

export default router;
