<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-4 mb-3">
        <frequent-clients-widget />
      </div>
      <div class="col-xs-12 col-md-4 mb-3">
        <profitable-clients-widget />
      </div>
      <div class="col-xs-12 col-md-4 mb-3">
        <best-products-sales-widget />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <products-ranking-widget />
      </div>
    </div>
  </div>
</template>

<script>
import FrequentClientsWidget from "@/components/widgets/FrequentClientsWidget.vue";
import ProfitableClientsWidget from "@/components/widgets/ProfitableClientsWidget.vue";
import BestProductsSalesWidget from "@/components/widgets/BestProductsSalesWidget.vue";
import ProductsRankingWidget from "@/components/widgets/ProductsRankingWidget.vue";

export default {
  name: "Home",
  components: {
    FrequentClientsWidget,
    ProfitableClientsWidget,
    BestProductsSalesWidget,
    ProductsRankingWidget
  }
};
</script>