<template>
  <div>
    <page-title v-bind:message="'Pedido de ' + purchase.client.name" />
    <h4 v-if="purchase.date" class="text-muted">{{ parseDate() }}</h4>
    <div class="row mb-3" v-if="purchase.status != 0">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <template v-if="isAdmin">
              <button
                v-if="purchase.status == 2"
                class="btn btn-success mr-3"
                @click="changeStatus(1)">
                Marcar como listo
              </button>
              <button v-if="purchase.status == 1" class="btn btn-success mr-3" @click="changeStatus(0)">
                Marcar como entregado
              </button>
            </template>
            <template v-else-if="purchase.status == 3">
              <button class="btn btn-success mr-3" @click="confirm" v-bind:disabled="purchase.items.length == 0">Confirmar compra</button>
            </template>
            <button class="btn btn-danger" @click="cancel" v-if="purchase.items.length > 0">Cancelar</button>
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
            <span v-else-if="purchase.status == 2" class="badge badge-warning">Preparando en pastelería</span>
            <span v-else-if="purchase.status == 3" class="badge badge-primary">Carrito en proceso</span>
            </div>
            <table class="table table-striped table-hover">
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col" class="text-right">Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in purchase.items"
                  :key="item.id"
                  @click="showProduct(item.product.slug)"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.product.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>${{ item.product.price }}</td>
                  <td class="text-right">${{ item.quantity * item.product.price }}</td>
                </tr>
                <tr>
                  <td colspan="5" class="text-right font-weight-bold">Total: ${{ totalAmount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import UserHelper from "@/helpers/UserHelper";
import PurchaseHelper from "@/helpers/PurchaseHelper";
// import purchases from "@/data/purchases.js";
import moment from "moment";

export default {
  data() {
    return {
      purchase: PurchaseHelper.getOrCreate(this.$route.params.id),
      isAdmin: UserHelper.getLoggedUser().isAdmin
    };
  },
  computed: {
    totalAmount: function() {
      return this.purchase.items.reduce(
        (prev, current) => prev + current.quantity * current.product.price,
        0
      );
    }
  },
  methods: {
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
    confirm: function(){
      this.changeStatus(2)
      this.purchase.date = new Date().toISOString();
    },
    cancel: function(){
      this.purchase.items = [];
      // const index = purchases.findIndex(p => p.id == this.purchase.id)
      // purchases.splice(index, 1)
    }
  },
  components: {
    PageTitle
  }
};
</script>
