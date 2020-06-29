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
import purchases from "@/data/purchases.js";

export default {
  components: {
    PieChart
  },
  data() {
    return {
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
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      const items = purchases.reduce(
        (prev, current) => prev.concat(current.items),
        []
      );
      const productsCount = items
        .map(p => p.product)
        .reduce((prev, current) => {
          let product = prev.find(p => p.id == current.id);
          if (!product) {
            product = Object.assign({ count: 0 }, current);
            prev.push(product);
          }
          product.count++;
          return prev;
        }, []);
      const mostSoldProducts = productsCount
        .sort((a, b) => b.count - a.count)
        .slice(0, this.top);

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
