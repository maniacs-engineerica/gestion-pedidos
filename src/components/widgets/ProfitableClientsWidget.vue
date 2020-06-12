<template>
  <div class="card">
    <div class="card-body">
      <div class="border-bottom pb-2 card-title">
        {{ top }} Clientes más rentables
        <div class="small text-muted">Basado en el importe de sus pedidos</div>
      </div>
      <div class="m-sm-0 mx-lg-3">
        <pie-chart :chart-data="data" :options="options"></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../charts/PieChart.js";
import toMaterialStyle from "material-color-hash";
import purchases from "@/data/purchases.js";

export default {
  components: {
    PieChart
  },
  data() {
    return {
      data: null,
      top: 10,
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label =
                data.labels[tooltipItem.index] +
                ": $" +
                data.datasets[0].data[tooltipItem.index];
              return label;
            }
          }
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      const clients = purchases.reduce((prev, current) => {
        let client = prev.find(c => c.id == current.client.id);
        if (!client) {
          client = Object.assign({ amount: 0 }, current.client);
          prev.push(client);
        }

        const purchaseAmount = current.items.reduce(
          (prev, current) => prev + current.quantity * current.product.price,
          0
        );

        client.amount += purchaseAmount;

        return prev;
      }, []);

      const mostProfitableClients = clients
        .sort((a, b) => b.amount - a.amount)
        .slice(0, this.top);

      this.data = {
        labels: mostProfitableClients.map(c => c.name),
        datasets: [
          {
            backgroundColor: mostProfitableClients.map(
              c => toMaterialStyle(c.name).backgroundColor
            ),
            data: mostProfitableClients.map(c => c.amount)
          }
        ]
      };
    }
  }
};
</script>
