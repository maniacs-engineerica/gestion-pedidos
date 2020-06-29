<template>
  <div>
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
              <span>
                <star-rating :rating="product.rating" :read-only="true" :show-rating="false"></star-rating>
              </span>
              <hr />
              <template v-if="purchase">
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
                <hr/>
                <div class="alert alert-info" role="alert" v-if="alert">
                    El producto se agregó al carrito.
                </div>
              </template>
            </article>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

import PurchaseHelper from "@/helpers/PurchaseHelper";
import products from "@/data/products.js";

export default {
  data() {
    return {
      product: products.find(p => p.slug == this.$route.params.slug),
      purchase: PurchaseHelper.getCurrent(),
      currentItem: null,
      currentQuantity: null,
      alert: null
    };
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
    add: function() {
      if (!this.item) {
        const item = {
          id: this.purchase.items.length,
          quantity: this.quantity,
          product: this.product
        };
        this.purchase.items.push(item);
        this.currentItem = item;
      } else {
        this.item.quantity = this.quantity;
      }
      this.alert = true
    }
  },
  components: {
    StarRating
  }
};
</script>


