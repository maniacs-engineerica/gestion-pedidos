import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Store from "@/views/Store.vue";
import Profile from "@/views/Profile.vue";
import Purchases from "@/views/Purchases.vue";
import Login from "@/views/Login.vue";
import Administration from "@/views/Administration.vue";
import ProductEdit from "@/views/ProductEdit.vue";

import PurchasesList from "@/components/PurchasesList.vue";
import PurchasesView from "@/components/PurchaseView.vue";
import ProductView from "@/components/ProductView.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/store",
    name: "Store",
    component: Store
  },
  {
    path: "/products/:slug",
    name: "Producto",
    component: ProductView    
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
    component: PurchasesView    
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
    exact: true,
    component: Administration
  },
  {
    path: "/admin/products/edit/:slug",
    name: "Product",
    component: ProductEdit
  },
  {
    path: "/admin/products/edit",
    name: "Product",
    component: ProductEdit
  }
];

const router = new VueRouter({
  routes
});

export default router;
