<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()// useRoute()는 정보 가져옴(params 등)
const router = useRouter()//라우트를 변경이동할 때 사용(push() , replace(), go())
const goBack = ()=>{
    router.push("/")
}
const products = ref([
  {
    id: 1,
    name: "상품 A",
    price: 12900,
    description: "A 상품 설명",
    image: "/images/product1.png",
    images: [
      "/images/product1.png",
      "/images/product2.png",
      "/images/product3.png",
      "/images/product4.png",
    ],
  },
  {
    id: 2,
    name: "상품 B",
    price: 22500,
    description: "B 상품 설명",
    image: "/images/product2.png",
    images: [
      "/images/product2.png",
      "/images/product2.png",
      "/images/product3.png",
      "/images/product4.png",
    ],
  },
  {
    id: 3,
    name: "상품 C",
    price: 34000,
    description: "C 상품 설명",
    image: "/images/product3.png",
    images: [
      "/images/product3.png",
      "/images/product2.png",
      "/images/product3.png",
      "/images/product4.png",
    ],
  },
  {
    id: 4,
    name: "상품 D",
    price: 38900,
    description: "D 상품 설명",
    image: "/images/product4.png",
    images: [
      "/images/product4.png",
      "/images/product1.png",
      "/images/product2.png",
      "/images/product3.png",
    ],
  },
]);
// 현재 선택된 상품 가져오기
const product = computed(()=>{//{}은 리턴하기
    return products.value.find((p)=> p.id == route.params.id) || {}
})
// 선택된 이미지
const selectedImage = ref(product.value.images ? product.value.images[0] : "" )
</script>
<template>
  <div>
    <button @click="goBack">뒤로가기</button>
    <div class="product-container">
      <!-- 상품 이미지 -->
      <div class="image-section">
        <img :src="selectedImage" alt="products.name" class="main-image" /> <!--import "selectedImage" from "src/views/ProductDetail.vue". 로 뜨면 src문제 :src해주기-->
      </div>
      <!-- 상품 정보 -->
      <div class="info-section"></div>
    </div>
  </div>
</template>
<style scoped>
</style>
v
