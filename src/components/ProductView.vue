<template>
  <div>
    <template v-if="loading || error">
      <div class="card">
        <div class="card-body">
          <loading-view v-if="loading" />
          <error-view v-else/>
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
                <template v-if="purchase && isClient">
                  <div class="row">
                    <div class="col-sm-5">
                      <dl class="param param-inline">
                        <dt>Cantidad:</dt>
                        <dd>
                          <input
                            type="number"
                            min="1"
                            class="form-control form-control-sm"
                            style="width:70px;"
                            v-model="quantity"
                          />
                        </dd>
                      </dl>
                    </div>

                    <div class="col-sm-7">
                      <dl class="param param-inline">
                        <dt>Tamaño:</dt>
                        <dd>
                          <label class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <span class="form-check-label">Mediano</span>
                          </label>
                          <label class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <span class="form-check-label">Grande</span>
                          </label>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <hr />
                  <button @click="add" class="btn btn-lg btn-outline-primary text-uppercase">
                    {{
                    item
                    ? "Actualizar carrito"
                    : "Agregar al carrito"
                    }}
                  </button>
                  <hr />
                  <div
                    class="alert alert-info"
                    role="alert"
                    v-if="alert"
                  >El producto se agregó al carrito.</div>
                </template>
              </article>
            </aside>
          </div>
        </div>
      </div>
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
      alert: null
    };
  },
  async created() {
    try {
      this.product = await this.getProduct();
      if (UserHelper.isLogged()) {
        this.purchase = await this.getCurrentPurchase();
      }
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
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
  methods: {
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
    }
  }
};
</script>


