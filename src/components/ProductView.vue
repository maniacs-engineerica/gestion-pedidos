<template>
  <div>
    <template v-if="loading || error">
      <div class="card">
        <div class="card-body">
          <loading-view v-if="loading" />
          <error-view v-else />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container">
        <div class="card" v-if="product">
          <div class="row">
            <aside class="col-sm-5 border-right">
              <article class="gallery-wrap">
                <div>
                  <img :src="product.image" :alt="product.name" class="img-fluid" />
                </div>
              </article>
            </aside>
            <aside class="col-sm-7">
              <article class="card-body p-5">
                <h3 class="title mb-3">{{product.name}}</h3>
                <p class="price-detail-wrap">
                  <span class="price h3 text-warning">
                    <span class="currency">$</span>
                    <span class="num">{{product.price}}</span>
                  </span>
                </p>
                <dl class="item-property">
                  <dd>
                    <p>{{product.description}}</p>
                  </dd>
                </dl>
                <span v-if="product.rating">
                  <star-rating :rating="product.rating" :read-only="true" :show-rating="false"></star-rating>
                </span>
                <hr />
                <div id="category">
                  <dl class="item-property">
                    <dd>
                      <p>
                        <strong>Categoría:</strong>
                        <button
                          type="button"
                          class="btn btn-link"
                          @click="scrollDown"
                        >{{product.category}}</button>
                      </p>
                    </dd>
                  </dl>
                </div>
                <template v-if="purchase && isClient">
                  <hr />
                  <div class="row" style="align-items: center">
                    <div class="col-sm-4">
                      <label>
                        <strong>Cantidad:</strong>
                      </label>
                      <input
                        type="number"
                        min="1"
                        class="form-control form-control-sm"
                        style="width:70px;"
                        v-model="quantity"
                      />
                    </div>
                    <div class="col-sm-6">
                      <button @click="add" class="btn btn-md btn-outline-primary text-uppercase">
                        {{
                        item
                        ? "Actualizar carrito"
                        : "Agregar al carrito"
                        }}
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div class="alert alert-info" role="alert" v-if="alert">
                    El producto se agregó al carrito.
                    <br />
                    <a href="javascript:void(0)" @click="redirectToStore">Seguir comprando</a> o
                    <a href="javascript:void(0)" @click="redirectToCart">confirmar pedido</a>.
                  </div>
                </template>
              </article>
            </aside>
          </div>
        </div>
      </div>

      <section id="similarProducts" class="mt-4">
        <div class="container">
          <div class="row">
            <div class="col text-center text-uppercase">
              <h4>Productos similares</h4>
            </div>
          </div>
          <div class="row">
            <div
              v-for="product in similarProducts"
              :key="product.id"
              @click="showProduct(product.slug)"
              class="col-12 col-md-4 mt-4 mb-4"
            >
              <div class="card h-100">
                <div class="container">
                  <img class="mt-2 card-img-top" :src="product.image" :alt="product.name" />
                  <button
                    class="button btn btn-light btn-lg"
                    @click="showProduct(product.slug)"
                  >Ver detalle</button>
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <strong>{{product.name}}</strong>
                  </h5>
                  <p class="card-text">{{product.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";

import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";

import UserHelper from "@/helpers/UserHelper";

export default {
  components: {
    StarRating,
    LoadingView,
    ErrorView
  },
  data() {
    return {
      isClient: UserHelper.isLogged() && !UserHelper.getLoggedUser().isAdmin,
      loading: true,
      error: false,
      product: null,
      purchase: null,
      currentItem: null,
      currentQuantity: null,
      alert: false,
      similarProducts: []
    };
  },
  async created() {
    await this.onCreated();
  },
  computed: {
    item: {
      get: function() {
        if (this.currentItem) {
          return this.currentItem;
        }
        if (this.purchase) {
          return this.purchase.items.find(
            item => item.product.slug == this.$route.params.slug
          );
        }
        return null;
      },
      set: function(item) {
        this.currentItem = item;
      }
    },
    quantity: {
      get: function() {
        return this.currentQuantity
          ? this.currentQuantity
          : this.item
          ? this.item.quantity
          : 1;
      },
      set: function(quantity) {
        this.currentQuantity = quantity;
      }
    }
  },
  watch: {
    async $route() {
      this.loading = true;
      await this.onCreated();
    }
  },
  methods: {
    async onCreated() {
      try {
        this.product = await this.getProduct();
        if (UserHelper.isLogged()) {
          this.purchase = await this.getCurrentPurchase();
        }
        this.similarProducts = await this.getSimilarProducts();
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    },
    async getProduct() {
      const response = await axios.get(`/products/${this.$route.params.slug}`);
      return response.data;
    },
    async getCurrentPurchase() {
      const user = UserHelper.getLoggedUser().id;
      const response = await axios.get(`/purchases/current?user=${user}`);
      return response.data;
    },
    async updatePurchase() {
      try {
        await axios.put(`/purchases/${this.purchase.id}`, this.purchase);
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    async getSimilarProducts() {
      const response = await axios.get("/products");
      return response.data.filter(
        p => p.category == this.product.category && p.id != this.product.id
      );
    },
    add: function() {
      if (!this.item) {
        const item = {
          id: this.purchase.items.length,
          quantity: this.quantity,
          product: this.product,
          rating: 0
        };
        this.purchase.items.push(item);
        this.currentItem = item;
      } else {
        this.item.quantity = this.quantity;
      }
      this.updatePurchase();
      this.alert = true;
    },
    redirectToStore: function() {
      this.$router.push("/store");
    },
    redirectToCart: function() {
      this.$router.push("/purchases/-1");
    },
    scrollDown: function() {
      document
        .getElementById("similarProducts")
        .scrollIntoView({ behavior: "smooth" });
    },
    showProduct: function(slug) {
      this.$router.push("/products/" + slug);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 980px;
  position: relative;
}

#similarProducts .card {
  cursor: pointer;
}

.container .button {
  display: none;
  position: absolute;
  right: 4em;
  top: 7em;
}

img:hover + .button,
.button:hover {
  display: inline-block;
}

.card .container img {
  height: 280px;
}
</style>


