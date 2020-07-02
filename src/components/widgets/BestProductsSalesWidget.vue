<template>
  <div class="card">
    <div class="card-body">
      <div class="border-bottom pb-2 card-title">
        {{ top }} Productos más exitosos
        <div class="small text-muted">
          Basado en la cantidad de unidades vendidas
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
import axios from 'axios';

export default {
  components: {
    PieChart
  },
  data() {
    return {
      loading: true,
      data: null,
      top: 5,
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label =
                data.labels[tooltipItem.index] +
                ": " +
                data.datasets[0].data[tooltipItem.index] +
                " unidades vendidas";
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
      this.fillData(data)
    } catch (error) {
      console.log("ERROR", error);
    }
    this.loading = false
  },
  methods: {
     async getData() {
      const response = await axios.get(`/analytics/productsales?limit=${this.top}`);
      return response.data;
    },
    fillData(mostSoldProducts) {
      this.data = {
        labels: mostSoldProducts.map(p => p.name),
        datasets: [
          {
            backgroundColor: mostSoldProducts.map(
              p => toMaterialStyle(p.name).backgroundColor
            ),
            data: mostSoldProducts.map(c => c.count)
          }
        ]
      };
    }
  }
};
</script>
