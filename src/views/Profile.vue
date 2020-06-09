<template>
  <div>
    <page-title v-bind:message="name"/>
    <input type="button" @click="logout" class="px-4 btn btn-danger" value="Cerrar Sesión" />
  </div>
</template>

<script>

import PageTitle from "@/components/PageTitle.vue";
import UserHelper from "@/helpers/UserHelper";

export default {
  name: "Profile",
  data() {
    return {
      name: UserHelper.getLoggedUser().name
    };
  },
  methods: {
    logout: function() {
      UserHelper.logout()
      this.$router.replace("/login");
    }
  },
  components: {
    PageTitle
  }
};
</script>
