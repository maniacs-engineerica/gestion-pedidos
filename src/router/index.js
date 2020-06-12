import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Profile from "@/views/Profile.vue";
import Purchases from "@/views/Purchases.vue";
import Login from "@/views/Login.vue";
import Administration from "@/views/Administration.vue";

import PurchasesList from "@/components/PurchasesList.vue";
import PurchasesView from "@/components/PurchaseView.vue";
import ProductView from "@/components/ProductView.vue";
import Dashboard from "@/components/Dashboard.vue";


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
    component: Purchases,
    children: [{
      path: "",
      component: PurchasesList
    }]
  },
  {
    path: "/purchases/:id",
    name: "Pedido",
    component: PurchasesView,
    children: [
      {
        path: 'product/:productId', component: ProductView
      }
    ]
  },
  {
    path: "/login",
    name: "Ingresar",
    component: Login
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Administration,
    children: [{
      path: "",
      component: Dashboard
    }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
