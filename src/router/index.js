import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import PurchasesList from "@/components/PurchasesList.vue";
import PurchasesView from "@/components/PurchaseView.vue";
import ProductView from "@/components/ProductView.vue";
import Login from "@/views/Login.vue";

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
    component: PurchasesList
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
