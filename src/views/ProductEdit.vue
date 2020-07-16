<template>
  <div>
    <page-title message="Producto" />
    <div class="card mb-3">
      <div class="card-header">Datos del producto</div>
      <div class="card-body">
        <loading-view v-if="loading" />
        <error-view v-else-if="error" />
        <form v-else @submit="save">
          <p class="text-muted">Nombre</p>
          <input type="text" class="mb-3 form-control" v-model="name" required />
          <p class="text-muted">Slug</p>
          <input v-model="slug" type="text" class="mb-3 form-control" required />
          <p class="text-muted">Categor&iacute;a</p>
          <input v-model="category" type="text" class="mb-3 form-control" required />
          <p class="text-muted">Precio</p>
          <input v-model="price" type="number" step=".01" class="mb-3 form-control" required />
          <p class="text-muted">Descripci&oacute;n</p>
          <textarea v-model="description" class="mb-3 form-control" />
          <p class="text-muted">Link de imagen</p>
          <input v-model="image" type="text" class="mb-4 form-control" required />

          <div class="row">
            <div class="col-6">
              <loading-button
                type="submit"
                :loading="saving"
                text="Guardar"
                loadingText="Guardando..."
                class="px-4 btn btn-success"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";

import LoadingView from "@/components/LoadingView.vue";
import LoadingButton from "@/components/LoadingButton.vue";

export default {
  components: {
    LoadingView,
    LoadingButton,
    PageTitle
  },
  data() {
    return {
      loading: false,
      saving: false
    };
  },
  async created() {
    if (this.$route.params.slug) {
      this.loading = true;
      this.error = false;
      try {
        const product = await this.getProduct();
        this.id = product.id;
        this.name = product.name;
        this.slug = product.slug;
        this.price = product.price;
        this.description = product.description;
        this.category = product.category;
        this.image = product.image;
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    }
  },
  methods: {
    async getProduct() {
      const response = await axios.get(`/products/${this.$route.params.slug}`);
      return response.data;
    },
    save: async function(e) {
      e.preventDefault();
      const product = {
        id: this.id,
        name: this.name,
        slug: this.slug,
        price: this.price,
        description: this.description,
        category: this.category,
        image: this.image
      };
      this.saving = true;
      await axios.post("/products", product);
      this.$router.back()
    }
  }
};
</script>
