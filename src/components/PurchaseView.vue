<template>
  <div>
    <page-title v-bind:message="'Pedido de ' + purchase.client.name" />
    <h4 class="text-muted">{{ parseDate() }}</h4>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
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
                  @click="showProduct(item.product.id)"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.product.title }}</td>
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
      <div class="col-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import purchases from "@/data/purchases.js";
import moment from "moment";

export default {
  data() {
    return {
      purchase: purchases.find(p => p.id == this.$route.params.id)
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
    showProduct: function(id) {
      this.$router.push(this.$router.currentRoute.path + "/product/" + id);
    }
  },
  components: {
    PageTitle
  }
};
</script>
