<template>
    <div>    
        <div class="card" style="width: 11rem; ">
            <img class="card-img-top" width="100" height="200" :src="image" :alt="nombre"/>
                <div class="card-body">
                    <h5 class="card-title">{{ nombre }}</h5>
                </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "ProductCard",
    props:['nombre','image','score'],
}
    
</script>
