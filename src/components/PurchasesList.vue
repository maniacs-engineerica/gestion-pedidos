<template>
  <div>
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-xs-12 col-md-auto">
            <select class="form-control" v-model="status" @change="onChangeStatus">
              <option value="-1">Todos los estados</option>
              <option value="0">Entregado</option>
              <option value="1">Listo</option>
              <option value="2">Preparando</option>
              <option value="4">Cancelado</option>
            </select>
          </div>
          <div v-if="isAdmin" class="col-xs-12 col-md-auto">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por cliente..."
              v-model="client"
              @input="onChangeClient"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Importe</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases" :key="purchase.id" @click="showPurchase(purchase.id)">
              <td class="align-middle">{{ purchase.id }}</td>
              <td>
                <div>
                  <a href="javascript:void(0)">{{ purchase.client.name }}</a>
                </div>
                <div class="small text-muted">Productos: {{ purchase.items.length }}</div>
              </td>
              <td class="align-middle">{{ parseDate(purchase.date) }}</td>
              <td class="align-middle">{{ parseTime(purchase.date) }}</td>
              <td class="align-middle">${{ calcAmount(purchase.items) }}</td>
              <td class="align-middle">
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
              </td>
            </tr>
          </tbody>
        </table>
        <loading-view v-if="loading" />
        <error-view v-else-if="error"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserHelper from "@/helpers/UserHelper";
import axios from "axios";
import moment from "moment";

import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";

export default {
  components: {
    LoadingView,
    ErrorView
  },
  data() {
    return {
      purchases: [],
      status: -1,
      client: "",
      loading: true,
      isAdmin: UserHelper.getLoggedUser().isAdmin
    };
  },
  async created() {
    this.reload();
  },
  methods: {
    async getPurchases() {
      const user = UserHelper.getLoggedUser().id;
      const response = await axios.get(
        `/purchases?user=${user}&status=${this.status}&client=${this.client}`
      );
      return response.data;
    },
    reload: async function() {
      this.loading = true;
      this.error = false;
      this.purchases = [];
      try {
        this.purchases = await this.getPurchases();
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    },
    onChangeStatus: function() {
      this.reload();
    },
    onChangeClient: function() {
      if (this.dispatchId > 0){
        clearTimeout(this.dispatchId)
      }
      this.dispatchId = setTimeout(this.reload, 250);
    },
    parseDate: function(date) {
      if (!date) {
        return "-";
      }
      return moment(date).format("DD/MM/YYYY");
    },
    parseTime: function(date) {
      if (!date) {
        return "-";
      }
      return moment(date).format("hh:mm a");
    },
    showPurchase: function(id) {
      this.$router.push(this.$router.currentRoute.path + "/" + id);
    },
    calcAmount: function(items) {
      return items.reduce(
        (prev, current) => prev + current.quantity * current.product.price,
        0
      );
    }
  }
};
</script>
