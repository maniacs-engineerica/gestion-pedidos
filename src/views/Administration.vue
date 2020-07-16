<template>
  <div>
    <page-title message="Dashboard" />

    <div class="card">
      <div class="card-body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="analytics-tab"
              data-toggle="tab"
              href="#analytics"
              role="tab"
              aria-controls="analytics"
              aria-selected="true"
            >Estad&iacute;sticas</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="products-tab"
              data-toggle="tab"
              href="#products"
              role="tab"
              aria-controls="products"
              aria-selected="false"
            >Productos</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="clients-tab"
              data-toggle="tab"
              href="#clients"
              role="tab"
              aria-controls="clients"
              aria-selected="false"
            >Clientes</a>
          </li>
        </ul>
        <div class="tab-content mt-3">
          <div
            class="tab-pane fade show active"
            id="analytics"
            role="tabpanel"
            aria-labelledby="analytics-tab"
          >
          <analytics />
          </div>
          <div class="tab-pane fade" id="products" role="tabpanel" aria-labelledby="products-tab">
            <products-list />
          </div>
          <div class="tab-pane fade" id="clients" role="tabpanel" aria-labelledby="clients-tab">
            <clients-list />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import Analytics from "@/components/Analytics.vue";
import ProductsList from "@/components/ProductsList.vue";
import ClientsList from "@/components/ClientsList.vue";

export default {
  name: "Home",
  components: {
    PageTitle,
    Analytics,
    ProductsList,
    ClientsList
  }
};
</script>
