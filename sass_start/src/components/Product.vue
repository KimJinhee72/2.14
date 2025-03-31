<template>
  <div class="home">
    <h1>제품 리스트</h1>
    <!-- 제품 목록 -->
    <div class="product-list">
      <div
        @click="viewPdoductDetails(pro)"
        v-for="(pro, index) in products"
        :key="index"
        class="card">
        <h3>{{ pro.name }}</h3>
        <img :src="pro.image" :alt="pro.name" />
        <p>{{ pro.description }}</p>
        <p>{{ pro.price }}</p>
        <button class="button primary">자세히보기</button>
      </div>
    </div>
  </div>
  <!-- 제품 상세 모달 -->

  <div v-if="showProductModal" class="modal-overlay">
    <div class="modal">
      <h3>{{ selectedProduct.name }}</h3>
      <img :src="selectedProduct.image" :alt="selectedProduct.name" />
      <p>{{ selectedProduct.description }}</p>
      <p>{{ selectedProduct.price }}</p>
      <button class="button secondary" @click="showProductModal = false">
        닫기
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
// 제품 목록 데이터
const products = ref([
  {
    name: "제품 A",
    image: "/public/images/product1.png",
    description: "이 제품은 매우 우수한 품질을 자랑합니다.",
    price: "100,000",
  },
  {
    name: "제품 B",
    image: "/public/images/product2.png",
    description: "이 제품은 혁신적인 기능을 가지고 있습니다.",
    price: "150,000",
  },
  {
    name: "제품 C",
    image: "/public/images/product3.png",
    description: "이 제품은 고급스러운 디자인을 자랑합니다.",
    price: "200,000",
  },
]);
// 모달 상태 및 선택된 제품
const showProductModal = ref(false);
const selectedProduct = ref({});
// 제품 클릭시 상세 정보 보기
const viewPdoductDetails = (pro) => {
  showProductModal.value = true;
  selectedProduct.value = pro;
  // console.log(product);
};
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  max-width: 800px;
  background: red;
  .product-list {
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    .card {
      flex: 1;
      text-align: center;
      &:hover {
        transform: scale(1.05);
      }
      img {
        max-width: 100%;
        height: auto;
      }

      h3 {
        font-size: 1.2rem;
        margin: 10px 0;
      }

      p {
        font-size: 1rem;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
