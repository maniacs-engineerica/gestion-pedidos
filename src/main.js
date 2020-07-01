import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@/css/styles.css";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:5000/api";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
