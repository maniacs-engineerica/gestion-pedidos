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
import axios from 'axios';

export default {
  components: {
    PieChart
  },
  data() {
    return {
      loading: true,
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
  async created() {
    try {
      const data = await this.getData();
      this.fillData(data);
    } catch (error) {
      console.log("ERROR", error);
    }
    this.loading = false;
  },
  methods: {
    async getData() {
      const response = await axios.get(
        `/analytics/profitableclients?limit=${this.top}`
      );
      return response.data;
    },
    fillData(mostProfitableClients) {
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
