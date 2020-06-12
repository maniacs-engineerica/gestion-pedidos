<template>
  <div class="card">
    <div class="card-body">
      <div class="border-bottom pb-2 card-title">
        {{ top }} Clientes más frecuentes
        <div class="small text-muted">
          Basado en la cantidad de pedidos realizados
        </div>
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
                ": " +
                data.datasets[0].data[tooltipItem.index] +
                " pedidos";
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
      const clients = purchases
        .map(p => p.client)
        .reduce((prev, current) => {
          let client = prev.find(c => c.id == current.id);
          if (!client) {
            client = Object.assign({ count: 0 }, current);
            prev.push(client);
          }
          client.count++;
          return prev;
        }, []);

      const mostFrequentClients = clients
        .sort((a, b) => b.count - a.count)
        .slice(0, this.top);

      this.data = {
        labels: mostFrequentClients.map(c => c.name),
        datasets: [
          {
            backgroundColor: mostFrequentClients.map(
              c => toMaterialStyle(c.name).backgroundColor
            ),
            data: mostFrequentClients.map(c => c.count)
          }
        ]
      };
    }
  }
};
</script>
