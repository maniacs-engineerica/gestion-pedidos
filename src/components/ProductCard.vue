<template>
    <div>    
        <div>
            <img width="100" :src="image" :alt="nombre"/>
            <h2 >{{ nombre }}</h2>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "ProductCard",
    props:['nombre','image','score'],
}
    
</script>
