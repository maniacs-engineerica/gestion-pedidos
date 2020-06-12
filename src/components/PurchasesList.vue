<template>
  <div>
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
                <span v-if="purchase.status == 0" class="badge badge-danger">Pendiente</span>
                <span v-else-if="purchase.status == 1" class="badge badge-warning">Listo</span>
                <span v-else-if="purchase.status == 2" class="badge badge-success">Entregado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserHelper from "@/helpers/UserHelper";

import purchases from "@/data/purchases.js";
import moment from "moment";

export default {
  computed: {
    purchases: function() {
      const user = UserHelper.getLoggedUser();
      return user.isAdmin
        ? purchases
        : purchases.filter(p => p.client.id == UserHelper.getLoggedUser().id);
    }
  },
  methods: {
    parseDate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    parseTime: function(date) {
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
