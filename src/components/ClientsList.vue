<template>
  <div>
    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Tel&eacute;fono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td class="align-middle">{{ client.id }}</td>
          <td class="align-middle">{{ client.name }}</td>
          <td>
            <a v-bind:href="'mailto:' + client.email">{{ client.email }}</a>
          </td>
          <td>
            <a v-bind:href="'tel:' + client.phone">{{ client.phone }}</a>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <loading-view v-if="loading" />
    <error-view v-else-if="error" />
  </div>
</template>

<script>
import axios from "axios";

import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";

export default {
  components: {
    LoadingView,
    ErrorView
  },
  data() {
    return {
      clients: [],
      loading: true
    };
  },
  async created() {
    this.reload();
  },
  methods: {
    async getClients() {
      const response = await axios.get("/users/clients");
      return response.data;
    },
    reload: async function() {
      this.loading = true;
      this.error = false;
      this.clients = [];
      try {
        this.clients = await this.getClients();
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    }
  }
};
</script>
