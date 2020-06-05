<template>
  <div id="app">
    <Header />
    <main class="app-body p-3">
      <div class="container-fluid">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style>
body {
  background-color: #e4e5e6 !important;
}

#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-body {
  margin-top: 55px;
  width: 100%;
}

.table-hover tr:hover > td {
    cursor: pointer;
}

</style>
