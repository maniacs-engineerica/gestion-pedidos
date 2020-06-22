<template>
  <div>
    <page-title message="Tienda"/>
    <router-view></router-view>     
        <div>
            <input type="search" placeholder="Buscar" v-model="searchText">
            <button id="searchCakes" @click="searchAll">Buscar torta</button>
        </div>        
        <div name="searchButttonsConainer">
            <div><button id="allCategories" @click="searchAllCategories"> Todas las categorias</button></div>
            <div><button id="cakeCategory" @click="searchCakes"> Tortas </button></div>
            <div><button id="dessertCategory" @click="searchDessert"> Postres </button></div>
            <div><button id="candiesCategory" @click="searchCandies"> Masas </button></div>            
        </div>

         <div id="filtersContainer">
            <h3>Filros</h3>
            <div>
                <label>Rango de precios</label>
                <div>
                    <input type="number" placeholder="Precio minimo" v-model="minPrice">
                    <a> - </a>
                    <input type="number" placeholder="Precio máximo" v-model="maxPrice">                    
                </div>

             </div>


                 <div>
                    <label>Ubicación</label>
                    <select id="score" v-model="productLocation">
                        <option v-bind:value="1"> Capital Fed </option>
                        <option value="2"> Barracas </option>
                        <option value="3"> Avellaneda </option>
                        <option value="4"> Lanus </option>
                    </select>                    
                </div>

                <div>
                    <label>Calificación</label>
                    <select id="score" v-model="productScore">
                        <option v-bind:value="1"> 1 estrellas </option>
                        <option value="2"> 2 estrellas </option>
                        <option value="3"> 3 estrellas </option>
                        <option value="4"> 4 estrellas </option>
                    </select>                    
                </div>
                <div>
                    <button id="btnFilter"> Filtrar </button>
                </div>
        </div>

        <div id="resultsContaianer">            
            <ul id="results">              
               <li v-for="(product ,index) in searchResults" :key="index" @click="showProduct(product.slug)">                    
                    <productCard
                        :nombre="product.name" 
                        :image="product.image" 
                        :score="product.raiting">
                    </productCard>
                </li>
            </ul>
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
            searchResults: [],
            visible: 'disabled',
        }
         
        },
        methods: {
            searchAll () {
                this.searchResults = this.productos.filter((producto) => producto.name.toLowerCase().includes(this.searchText))
                
            },
            searchAllCategories (){
                this.searchResults = this.productos
            }
            ,
            searchCakes () {
                this.searchResults = this.productos.filter((producto) => producto.category.toLowerCase().includes("cake"))
            },
            searchDessert () {
                this.searchResults = this.productos.filter((producto) => producto.category.toLowerCase().includes("dessert"))
            },
            searchCandies () {
                this.searchResults = this.productos.filter((producto) => producto.category.toLowerCase().includes("baked"))
            },
            searchProductByScore(){
                this.searchResults = this.productos.filter((producto) => producto.raiting.includes(this.productScore))
            },
             showProduct: function(slug) {
              this.$router.push('/products/'+ slug);
             }
    },
    

};
       


   
</script>
<style scoped>

</style>