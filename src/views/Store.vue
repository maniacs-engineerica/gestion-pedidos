<template>
  <div>
    <page-title message="Tienda" />
    <router-view></router-view>
    <loading-view v-if="loading" />
    <error-view v-else-if="error" />
    <div v-else class="row">
      <div class="col-6 col-md-3">
        <div class="card">
          <div class="card-body">
            <div>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
                v-model="searchText"
              />
            </div>
            <br />
            <div name="searchButttonsConainer">
              <button
                class="btn btn-outline-dark btn-block"
                id="allCategories"
                @click="searchAllCategories"
              >Todas las categorias</button>
              <button
                class="btn btn-outline-dark btn-block"
                id="cakeCategory"
                @click="searchCakes"
              >Tortas</button>
              <button
                class="btn btn-outline-dark btn-block"
                id="dessertCategory"
                @click="searchDessert"
              >Postres</button>
              <button
                class="btn btn-outline-dark btn-block"
                id="candiesCategory"
                @click="searchCandies"
              >Masas</button>
            </div>
            <br />

            <div id="filtersContainer">
              <h3>
                Filtros
                <button
                  type="button"
                  @click="cleanFilters"
                  class="btn btn-secondary btn-lg"
                  style=" width: 70%; font-size: 15px;"
                >Limpiar</button>
              </h3>
              <br />
              <div>
                <p>Rango de precios</p>

                <div data-role="rangeslider">
                  <label for="price-min" class="badge badge-light" style="font-size: 15px">
                    Precio Mínimo:
                    <span
                      class="badge badge-secondary"
                      style="font-size: 13px"
                    >{{minPrice}}</span>
                  </label>
                  <br />
                  <input
                    type="range"
                    name="price-min"
                    id="price-min"
                    value="0"
                    min="0"
                    max="1000"
                    v-model="minPrice"
                  />
                  <br />
                  <label for="price-max" class="badge badge-light" style="font-size: 15px">
                    Precio Máximo:
                    <span
                      class="badge badge-secondary"
                      style="font-size: 13px"
                    >{{maxPrice}}</span>
                  </label>
                  <br />
                  <input
                    type="range"
                    name="price-max"
                    id="price-max"
                    value="0"
                    min="0"
                    max="1000"
                    v-model="maxPrice"
                  />
                </div>
                <br />
              </div>
              <div>
                <label class="badge badge-light" style="font-size: 16px;">Ubicación</label>
                <select id="score" v-model="productLocation">
                  <option value>Seleccionar</option>
                  <option value="1">Capital Fed</option>
                  <option value="2">Barracas</option>
                  <option value="3">Avellaneda</option>
                  <option value="4">Lanus</option>
                </select>
              </div>

              <div>
                <label class="badge badge-light" style="font-size: 16px">Calificación</label>

                <select id="score" v-model="productScore">
                  <option value>Seleccionar</option>
                  <option value="1">1 estrella</option>
                  <option value="2">2 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="5">5 estrellas</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-9">
        <div id="resultsContaianer">
          <ul id="results" v-if="filter.length > 0">
            <li v-for="(product ,index) in filter" :key="index" @click="showProduct(product.slug)">
              <productCard :nombre="product.name" :image="product.image" :score="product.rating"></productCard>
            </li>
          </ul>
          <div class="alert alert-warning" v-else>Sin resultados</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import ProductCard from "@/components/ProductCard.vue";
import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    PageTitle,
    productCard: ProductCard,
    LoadingView,
    ErrorView
  },
  data() {
    return {
      searchText: "",
      productScore: "",
      productLocation: "",
      minPrice: 0,
      maxPrice: 1000,
      productos: [],
      filterProducts: [],
      visible: "disabled",
      error: false,
      loading: true
    };
  },
  methods: {
    searchAllCategories() {
      this.filterProducts = this.productos;
    },
    searchCakes() {
      this.filterProducts = this.productos.filter(producto =>
        producto.category.toLowerCase().includes("cake")
      );
    },
    searchDessert() {
      this.filterProducts = this.productos.filter(producto =>
        producto.category.toLowerCase().includes("dessert")
      );
    },
    searchCandies() {
      this.filterProducts = this.productos.filter(producto =>
        producto.category.toLowerCase().includes("baked")
      );
    },
    searchProductByScore() {
      this.filterProducts = this.filterProducts.filter(producto =>
        producto.raiting.includes(this.productScore)
      );
    },
    showProduct: function(slug) {
      this.$router.push("/products/" + slug);
    },
    cleanFilters() {
      this.searchText = "";
      this.productScore = "";
      this.productLocation = "";
      this.minPrice = 0;
      this.maxPrice = 1000;
    },
    async getProducts() {
      const response = await axios.get("/products");
      return response.data;
    },
    async created() {
      document.title = "Tienda - Pastelería";
      try {
        this.productos = await this.getProducts();
      } catch (error) {
        this.error = true;
      }
      this.loading = false;
    }
  },
  computed: {
    filter() {
      let a = [];

      a = this.filterProducts.filter(item => {
        const cumpleRating =
          !this.productScore || item.rating == this.productScore;
        const cumpleBusqueda =
          !this.searchText ||
          item.name.toLowerCase().includes(this.searchText.toLowerCase());
        const cumpleLocation =
          !this.productLocation || item.location == this.productLocation;
        const cumpleMinPrice = !this.minPrice || item.price >= this.minPrice;
        const cumpleMaxPrice = !this.maxPrice || item.price <= this.maxPrice;
        return (
          cumpleRating &&
          cumpleBusqueda &&
          cumpleLocation &&
          cumpleMinPrice &&
          cumpleMaxPrice
        );
      });

      return a;
    }
  },
  async mounted() {
    await this.created();
    this.searchAllCategories();
  }
};
</script>
<style scoped>
.select-css {
  display: block;
  font-size: 16px;
  font-family: "Verdana", sans-serif;
  font-weight: 400;
  color: #444;
  line-height: 1.3;
  padding: 0.4em 1.4em 0.3em 0.8em;
  width: 400px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 20px auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.select-css::-ms-expand {
  display: none;
}
.select-css:hover {
  border-color: #888;
}
.select-css:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
.select-css option {
  font-weight: normal;
}

label {
  display: block;
  width: 140px;
}

ul {
  list-style-type: none;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

li {
  float: left;
  margin: 10px;
  border: 5px solid #fff;
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
  display: -webkit-flex;
  display: flex;
  text-decoration: none;
  background: #f7f7f7;
}

li:hover {
  -webkit-box-shadow: 0px 0px 7px rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 7px rgba(229, 102, 229, 1);
  display: -webkit-flex;
  display: flex;
  text-decoration: none;
}
</style>