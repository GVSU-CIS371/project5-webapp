import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import Clothing from "./components/Clothing.vue";
import Electronics from "./components/Electronics.vue";
import Groceries from "./components/Groceries.vue";
import BestSeller from "./components/BestSeller.vue";
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: "/clothing",
    name: "Clothing",
    component: Clothing,
  },
  {
    path: "/electronics",
    name: "Electronics",
    component: Electronics,
  },
  {
    path: "/groceries",
    name: "Groceries",
    component: Groceries,
  },
  {
    path: "/bestseller",
    name: "BestSeller",
    component: BestSeller,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
