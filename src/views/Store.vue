<template>
  <div>
    <page-title message="Tienda"/>
    <router-view></router-view>     
  <div class="row">
        <div class="col-6 col-md-2">
            <div>
                <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"  v-model="searchText">         
            </div>        
            <div name="searchButttonsConainer" >
                <button class="btn btn-outline-dark btn-block" id="allCategories" @click="searchAllCategories"> Todas las categorias</button>
                <button class="btn btn-outline-dark btn-block" id="cakeCategory" @click="searchCakes"> Tortas </button>
                <button class="btn btn-outline-dark btn-block" id="dessertCategory" @click="searchDessert"> Postres </button>
                <button class="btn btn-outline-dark btn-block" id="candiesCategory" @click="searchCandies"> Masas </button>
            </div>

            <div id="filtersContainer">
                <h3>Filtros</h3>
                <div>
                    <p>Rango de precios</p>
                   <form class="multi-range-field my-5 pb-5">
                <input id="multi" class="multi-range" type="range" />
                </form>
                    <div>
                        <input type="number" placeholder="Precio minimo" v-model="minPrice">
                        <a> - </a>
                        <input type="number" placeholder="Precio máximo" v-model="maxPrice">                    
                    </div>

                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Ubicación
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Capital Fed</a>
                    <a class="dropdown-item" href="#">Barracas</a>
                    <a class="dropdown-item" href="#">Avellaneda</a>
                    </div>
                    </div>


                    <div >
                        <label>Ubicación</label>
                        <select id="score" v-model="productLocation">
                        <option value="0"> Seleccionar </option>
                            <option value="1"> Capital Fed </option>
                            <option value="2"> Barracas </option>
                            <option value="3"> Avellaneda </option>
                            <option value="4"> Lanus </option>
                        </select>                    
                    </div>

                    <div>
                        <label>Calificación</label>
                        <select id="score" v-model="productScore">
                            <option value=0> Seleccionar </option> 
                            <option value="1"> 1 estrellas </option>
                            <option value="2"> 2 estrellas </option>
                            <option value="3"> 3 estrellas </option>
                            <option value="4"> 4 estrellas </option>
                        </select>
                    </div>
                </div>   
        </div>
        <div class = "col-12 col-md-10">
        <div id="resultsContaianer">            
            <ul id="results" class="container">
               <li v-for="(product ,index) in filter" :key="index" @click="showProduct(product.slug)">                    
                    <productCard
                        :nombre="product.name" 
                        :image="product.image" 
                        :score="product.rating">
                    </productCard>
                </li>
            </ul>
        </div>               
        </div>
    </div>  
     
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import ProductCard from "@/components/ProductCard.vue";
import products from "@/data/products.js"

export default {
  name: "Home",
  components: {
    PageTitle,
    productCard:ProductCard
  },        
        data() {
            return {
            searchText: '',
            productScore : '',
            productLocation : '',
            minPrice: '',
            maxPrice: '',
            productos: products,
            filterProducts: [],
            visible: 'disabled',
        }
         
        },
        methods: {            
            searchAllCategories (){
                this.filterProducts = this.productos
            }
            ,
            searchCakes () {
                this.filterProducts = this.productos.filter((producto) => producto.category.toLowerCase().includes("cake"))
            },
            searchDessert () {
                this.filterProducts = this.productos.filter((producto) => producto.category.toLowerCase().includes("dessert"))
            },
            searchCandies () {
                this.filterProducts = this.productos.filter((producto) => producto.category.toLowerCase().includes("baked"))
            },
            searchProductByScore(){
                this.filterProducts = this.filterProducts.filter((producto) => producto.raiting.includes(this.productScore))
            },
             showProduct: function(slug) {
              this.$router.push('/products/'+ slug);
             }
    },
    computed: {
      
      filter () {          
          // let a = []
        //   if(this.productScore){
        //       a = this.filterProducts.filter((item) => item.rating.includes(this.productScore))
        //   }
        //    return a
           return  this.filterProducts.filter((item) => item.name.toLowerCase().includes(this.searchText))
      }
    //   ,
    //   filterByScore () {
    //       return this.filterProducts.filter((producto) => producto.rating.includes(this.productScore))
    //   }
    },
    mounted: function() {
        this.searchAllCategories()    
    }
    
    

};
       


   
</script>
<style scoped>

</style>