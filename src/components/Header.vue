<template>
  <header class="app-header navbar sticky-top">
    <ul class="nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link class="nav-link" to="/products">Tienda</router-link>
      <router-link class="nav-link" to="/purchases" v-if="userHelper.isLogged()"
        >Pedidos</router-link
      >
      <router-link class="nav-link" to="/admin" v-if="userHelper.isLogged() && userHelper.getLoggedUser().isAdmin"
        >Administrador</router-link
      >
    </ul>
    <ul class="ml-auto nav">
      <router-link class="btn btn-sm btn-outline-primary" to="/login" v-if="!userHelper.isLogged()"
        >Ingresar</router-link
      >
      <router-link class="nav-link" to="/profile" v-else>{{
        userHelper.getLoggedUser().name
      }}</router-link>
    </ul>
  </header>
</template>

<script>
import UserHelper from "@/helpers/UserHelper";

export default {
  data() {
    return {
      userHelper: UserHelper
    };
  }
};
</script>

<style scoped>
.app-header {
  position: fixed !important;
  width: 100%;
  height: 55px;
  background-color: #ffffff;
}
</style>
