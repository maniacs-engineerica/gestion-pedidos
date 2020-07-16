<template>
  <div>
    <!-- Carousel -->
      <main id="main">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://images.pexels.com/photos/1129510/pexels-photo-1129510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://images.pexels.com/photos/1546892/pexels-photo-1546892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="d-block w-100" alt="...">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
      </div>
      </main>

      <!-- Cards -->
      <loading-view v-if="loading" />
      <error-view v-else-if="error"/>
      <section v-else id="promos" class="mt-4">
          <div class="container">
            <div class="row">
              <div class="col text-center text-uppercase">
                <h1><span class="badge badge-secondary">Productos recomendados</span></h1>
              </div>
            </div>
            <div class="row">
              <div v-for="product in topProducts" :key="product.id" @click="showProduct(product.slug)" class="col-12 col-md-4 mt-4 mb-4">
                <div class="card">
                  <div class="container">
                    <img class="mt-2 card-img-top" :src="product.image" :alt="product.name">
                    <button class="button btn btn-light btn-lg" @click="showProduct(product.slug)">Ver detalle</button>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title"><strong>{{product.name}}</strong></h5>
                    <p class="card-text">{{product.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </section>
  <hr>
        <!-- Newsletter -->
  <section id="newsletter" class="pt-4 pb-4">
      <div class="container">
        <div class="row pb-2">
          <div class="col text-center pb-2">
            <h4>Suscribite a nuestro newsletter</h4>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-md-4 offset-md-3 text-center pl-2 pr-2">
              <input type="email" class="form-control" placeholder="Escribe tu e-mail">
          </div>
          <div class="form-group col-12 col-md-2 text-center pl-2 pr-0">
            <button type="button" class="btn btn-outline-success"> Recibir notificaciones </button>
          </div>
        </div>
      </div>
  </section>
  
  </div>
</template>

<script>
import axios from "axios";
import LoadingView from "@/components/LoadingView.vue";
import ErrorView from "@/components/ErrorView.vue";

export default {
  name: "Home",  
  data() {
    return {
      loading: true,
      error: false,
      topProducts: []
    }
  },
  async created(){
    try {
      const allProducts = await this.getProducts();
      this.topProducts = allProducts.slice(0, 3);
    } catch (error) {
      this.error = true;
    }
    this.loading = false;
  },
  methods: {
    async getProducts() {
      const response = await axios.get("/analytics/productsranking");
      return response.data;
    },
    showProduct: function(slug) {
      this.$router.push('/products/'+ slug);
    }
  },
  components: {
    LoadingView,
    ErrorView
  }
};
</script>

<style scoped>
.carousel .carousel-item {
  height: 450px;
}

.carousel-item img {
    position: absolute;
    object-fit: cover;
    top: 0;
    left: 0;
    max-height: 450px;    
}

.card {
  cursor: pointer;
}

.container {
  position: relative;
}

.container .button { 
  display: none;
  position: absolute; 
  right: 5.5em; 
  top: 9em;
}

img:hover + .button, .button:hover {
    display: inline-block;
}

.container img {
  max-height: 370px;
}
</style>
