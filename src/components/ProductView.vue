<template>
  <div>
    <div class="container">	
    <div class="card" v-if="product">
      <div class="row">
        <aside class="col-sm-5 border-right">
          <article class="gallery-wrap"> 
              <div><img :src="product.image" 
                :alt="product.name" class="img-fluid"></div>
          </article>
        </aside>
        <aside class="col-sm-7">
          <article class="card-body p-5">
            <h3 class="title mb-3">{{product.name}}</h3>
            <p class="price-detail-wrap"> 
              <span class="price h3 text-warning"> 
                <span class="currency">$</span><span class="num">{{product.price}}</span>
              </span> 
            </p>
            <dl class="item-property">
              <dd><p>{{product.description}}</p></dd>
            </dl>
            <span>
              <star-rating :rating="product.rating" :read-only="true" :show-rating="false"></star-rating>
            </span>
          <hr>
            <div class="row">
              <div class="col-sm-5">
                <dl class="param param-inline">
                  <dt>Cantidad: </dt>
                  <dd>
                    <select class="form-control form-control-sm" style="width:70px;">
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                    </select>
                  </dd>
                </dl>  
              </div> 
              <div class="col-sm-7">
                <dl class="param param-inline">
                    <dt>Tamaño: </dt>
                    <dd>
                      <label class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                      <span class="form-check-label">Mediano</span>
                    </label>
                    <label class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                      <span class="form-check-label">Grande</span>
                    </label>					
                    </dd>
                </dl>  
              </div>
            </div> 
            <hr>
            <a href="#" class="btn btn-lg btn-outline-primary text-uppercase"> <i class="fas fa-shopping-cart"></i> Agregar al carrito </a>
          </article>
        </aside>
      </div> 
    </div>
</div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import products from "@/data/products.js";

export default {
  data(){
      return {
        product: products.find(p => p.slug == this.$route.params.slug),
      };
    },
    components: {
      StarRating
    }
}
</script>


