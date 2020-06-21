<template>
  <div>
    <page-title message="Tienda"/>
    <router-view></router-view>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  name: "Home",
  components: {
    PageTitle
  }
};
</script>
