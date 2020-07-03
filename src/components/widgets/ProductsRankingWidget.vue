<template>
  <div class="card">
    <div class="card-body">
      <div class="border-bottom pb-2 card-title">
        Ranking de productos
        <div class="small text-muted">Basado en la opinion de los clientes</div>
      </div>
      <div>
        <loading-view v-if="loading" />
        <div v-else-if="error">Ha ocurrido un error</div>
        <table v-else class="table table-striped">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th class="text-right" scope="col">Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.id">
              <td>{{ index+1 }}</td>
              <td>{{product.name}}</td>
              <td class="text-right">
                <div class="d-inline-block" v-if="product.rating > 0">
                  <star-rating
                    :rating="product.rating"
                    :read-only="true"
                    :show-rating="false"
                    star-size="20"
                  />
                </div>
                <div v-else>Sin votos</div>
              </td>
              <td>
                <template v-if="product.rating > 0">
                  <span class="badge badge-success" v-if="product.rating >= 4">{{product.rating}}</span>
                  <span
                    class="badge badge-warning"
                    v-else-if="product.rating >= 2"
                  >{{product.rating}}</span>
                  <span class="badge badge-danger" v-else>{{product.rating}}</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";

import LoadingView from "@/components/LoadingView.vue";

export default {
  components: {
    StarRating,
    LoadingView
  },
  data() {
    return {
      loading: true,
      error: false,
      products: [],
      data: null
    };
  },
  async created() {
    try {
      this.products = await this.getData();
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  },
  methods: {
    async getData() {
      const response = await axios.get("/analytics/productsranking");
      return response.data;
    }
  }
};
</script>
