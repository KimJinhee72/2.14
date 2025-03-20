<template>
    <div>
        <h2>상품목록</h2>
        <div class="product_list">
            <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.image" :alt="product.name" @click="gotoDetail(product.id)">
                <p>상품명: {{product.name }}</p>
                <p>금액: {{product.price }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";
const products = ref([
    {        id:1 , name: "상품A" , price :10000, image:"/public/images/product1.png"    },
    {        id:2 , name: "상품B" , price :20000, image:"/public/images/product2.png"    },
    {        id:3 , name: "상품C" , price :30000, image:"/public/images/product3.png"    },
    {        id:4 , name: "상품D" , price :30000, image:"/public/images/product4.png"    }
])
// const router = useRouter(()=>{

// })
const gotoDetail = (id)=>{
    // console.log(id);
    router.push(`/product/${id}`)
    
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
  width: 150px;
  height: 150px;
  border-radius: 10px;
}
</style>