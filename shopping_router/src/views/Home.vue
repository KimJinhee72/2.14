<template>
    <div>
        <h2>상품목록</h2>
        <div class="product_list">
            <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.image" :alt="product.name" @click="gotoDetail(product.id)">
                <p>상품명: {{product.name }}</p>
                <p>금액: {{formatPrice(product.price)}}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";
const products = ref([
    {        id:1 , name: "상품A" , price :12900, image:"/public/images/product1.png"    },
    {        id:2 , name: "상품B" , price :22500, image:"/public/images/product2.png"    },
    {        id:3 , name: "상품C" , price :34000, image:"/public/images/product3.png"    },
    {        id:4 , name: "상품D" , price :38900, image:"/public/images/product4.png"    }
])
// const router = useRouter(()=>{

// })
const gotoDetail = (id)=>{
    // console.log(id);
    router.push(`/product/${id}`)    
}
const formatPrice = (price)=>{//price 전체금액을 의미함
  console.log(price);  
  return `₩${price.toLocaleString()}`
}
</script>

<style scoped>
.product_list {
  display: flex;
  gap: 20px;
  justify-content: center;
  
}
.product {
  
  cursor: pointer;
  text-align: left;
  margin-top: 50px;
}
.product img {
  width: 300px;
  height: 300px;
  border-radius: 10px;
}
</style>