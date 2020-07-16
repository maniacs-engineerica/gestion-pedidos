<template>
  <div>
    <button class="btn btn-primary mb-3" @click="create()">Crear nuevo</button>
    <table class="table table-striped table-hover">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producto</th>
          <th scope="col">Categor&iacute;a</th>
          <th scope="col">Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id" @click="showProduct(product.slug)">
          <td class="align-middle">{{ product.id }}</td>
          <td>
            <div>
              <a href="javascript:void(0)">{{ product.name }}</a>
            </div>
            <div class="small text-muted">{{ product.description }}</div>
          </td>
          <td class="align-middle">{{ product.category }}</td>
          <td class="align-middle">${{ product.price }}</td>
          <td class="align-middle text-right">
            <button class="btn btn-link" @click.stop="remove(index)">Eliminar</button>
          </td>
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
      products: [],
      loading: true
    };
  },
  async created() {
    this.reload();
  },
  methods: {
    async getProducts() {
      const response = await axios.get("/products");
      return response.data;
    },
    async removeProduct(product){
      await axios.delete(`/products/${product.id}`);
    },
    reload: async function() {
      this.loading = true;
      this.error = false;
      this.products = [];
      try {
        this.products = await this.getProducts();
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    },
    showProduct: function(slug) {
      this.$router.push("/admin/products/edit/" + slug);
    },
    remove: async function(index) {
      try {
        const product = this.products[index];
        await this.removeProduct(product)
        this.products.splice(index, 1);
      } catch (error) {
        alert("test")
        console.log(error);
      }
    },
    create: function(){
      this.$router.push("/admin/products/edit");
    }
  }
};
</script>
