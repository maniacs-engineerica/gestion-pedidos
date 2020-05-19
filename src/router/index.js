import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Purchases from "@/views/Purchases.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/products",
    name: "Productos",
    component: Products
  },
  {
    path: "/purchases",
    name: "Pedidos",
    component: Purchases
  }
];

const router = new VueRouter({
  routes
});

export default router;
