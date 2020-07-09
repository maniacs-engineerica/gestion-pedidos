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
      <page-title v-bind:message="'Pedido de ' + purchase.client.name" />
      <h4 v-if="purchase.date" class="text-muted">{{ parseDate() }}</h4>
      <div class="row mb-3" v-if="purchase.status != 0">
        <div class="col">
          <div class="card" v-if="purchase.status != 4">
            <div class="card-body">
              <template v-if="isAdmin">
                <button
                  v-if="purchase.status == 2"
                  class="btn btn-success mr-3"
                  @click="ready()"
                >Marcar como listo</button>
                <button
                  v-if="purchase.status == 1"
                  class="btn btn-success mr-3"
                  @click="delivered(0)"
                >Marcar como entregado</button>
              </template>
              <template v-else-if="purchase.status == 3">
                <button
                  class="btn btn-success mr-3"
                  @click="confirm"
                  v-bind:disabled="purchase.items.length == 0"
                >Confirmar compra</button>
              </template>
              <button
                class="btn btn-danger"
                @click="cancel"
                v-if="purchase.items.length > 0"
              >Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <span class="font-weight-bold mr-2">Estado Actual:</span>
                <span v-if="purchase.status == 0" class="badge badge-success">Entregado</span>
                <span v-else-if="purchase.status == 1" class="badge badge-warning">Listo</span>
                <span
                  v-else-if="purchase.status == 2"
                  class="badge badge-warning"
                >Preparando en pastelería</span>
                <span
                  v-else-if="purchase.status == 3"
                  class="badge badge-primary"
                >Carrito en proceso</span>
                <span v-else-if="purchase.status == 4" class="badge badge-danger">Cancelado</span>
              </div>
              <table class="table table-striped">
                <thead class="thead-light">
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th class="text-right">Importe</th>
                    <th class="text-right">
                      <a v-if="purchase.status == 0">Puntaje</a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in purchase.items" :key="item.id">
                    <td class="align-middle">{{ index + 1 }}</td>
                    <td
                      class="align-middle product"
                      @click="showProduct(item.product.slug)"
                    >{{ item.product.name }}</td>
                    <td class="align-middle">{{ item.quantity }}</td>
                    <td class="align-middle">${{ item.product.price }}</td>
                    <td class="align-middle text-right">${{ item.quantity * item.product.price }}</td>
                    <td class="align-middle">
                      <button
                        v-if="isEditable"
                        class="btn btn-link"
                        @click.stop="remove(index)"
                      >Eliminar</button>
                      <star-rating
                        v-else-if="purchase.status == 0"
                        :read-only="item.rating != 0 || isAdmin"
                        :show-rating="false"
                        star-size="26"
                        :rating="item.rating"
                        @rating-selected="setRating($event, index)"
                      ></star-rating>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" class="text-right font-weight-bold">Total: ${{ totalAmount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import UserHelper from "@/helpers/UserHelper";
import StarRating from "vue-star-rating";

import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";

import moment from "moment";
import axios from "axios";

export default {
  components: {
    PageTitle,
    StarRating,
    LoadingView,
    ErrorView
  },
  data() {
    return {
      loading: true,
      purchase: null,
      isAdmin: UserHelper.getLoggedUser().isAdmin
    };
  },
  async created() {
    try {
      this.purchase = await this.getPurchase();
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  },
  computed: {
    totalAmount: function() {
      return this.purchase.items.reduce(
        (prev, current) => prev + current.quantity * current.product.price,
        0
      );
    },
    isEditable: function() {
      return this.purchase.status == 3 && !this.isAdmin;
    }
  },
  methods: {
    async getPurchase() {
      const user = UserHelper.getLoggedUser().id;
      const response = await axios.get(
        `/purchases/${this.$route.params.id}?user=${user}`
      );
      return response.data;
    },
    async updatePurchase() {
      try {
        await axios.put(`/purchases/${this.purchase.id}`, this.purchase);
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    parseDate: function() {
      const date = moment(this.purchase.date);
      return date.format("DD/MM/YYYY") + " - " + date.format("hh:mm a");
    },
    showProduct: function(slug) {
      this.$router.push("/products/" + slug);
    },
    changeStatus: function(status) {
      this.purchase.status = status;
    },
    ready: function() {
      this.changeStatus(1);
      this.updatePurchase();
    },
    delivered: function() {
      this.changeStatus(0);
      this.updatePurchase();
    },
    confirm: function() {
      this.changeStatus(2);
      this.purchase.date = new Date().toISOString();
      this.updatePurchase();
    },
    cancel: function() {
      if (this.purchase.status == 3) {
        this.purchase.items = [];
      } else {
        this.purchase.status = 4;
      }
      this.updatePurchase();
    },
    remove: function(index) {
      this.purchase.items.splice(index, 1);
      this.updatePurchase();
    },
    setRating: function(rating, index) {
      this.purchase.items[index].rating = rating;
      this.updatePurchase();
    }
  }
};
</script>

<style scoped>
tr td:last-child {
  width: 1%;
  white-space: nowrap;
}
.product:hover {
  -webkit-box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 7px rgba(229, 102, 229, 1);
  cursor: pointer;
}
</style>
