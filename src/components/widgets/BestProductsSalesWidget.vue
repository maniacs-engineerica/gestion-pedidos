<template>
  <div class="card">
    <div class="card-body">
      <div class="border-bottom pb-2 card-title">
        {{ top }} Productos más exitosos
        <div class="small text-muted">Basado en la cantidad de unidades vendidas</div>
      </div>
      <loading-view v-if="loading" />
      <error-view v-else-if="error"/>
      <div v-else class="m-sm-0 mx-lg-3">
        <pie-chart :chart-data="data" :options="options"></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../charts/PieChart.js";
import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";
import toMaterialStyle from "material-color-hash";
import axios from "axios";

export default {
  components: {
    PieChart,
    LoadingView,
    ErrorView
  },
  data() {
    return {
      loading: true,
      error: false,
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
      this.fillData(data);
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  },
  methods: {
    async getData() {
      const response = await axios.get(
        `/analytics/productsales?limit=${this.top}`
      );
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
