<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Tab from "@/components/Tab.vue";
const route = useRoute(); // useRoute()는 속성 정보 가져옴(params 등)
const router = useRouter(); //라우트를 변경이동할 때 사용(push() , replace(), go())
const goBack = () => {
  router.push("/");
};
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
const product = computed(() => {
  //{}은 리턴하기 product {}내용들에 id 타겟으로 써보려 설정
  return products.value.find((p) => p.id == route.params.id) || {}; //route 속성 id를 사용하기 위해서 씀
});
// 선택된 이미지
const selectedImage = ref(product.value.images ? product.value.images[0] : "");
console.log("초기선택된 이미지:", selectedImage.value);
// 가격포멧함수
const formatPrice = (price) => {
  //price는 route.params.id때문에 하나의 가격이 표시됨
  return `₩${price.toLocaleString()}`;
};
// 수량 및 상태 관리
// 수량 상태 변수
const quantity = ref(1); //처음 1로 담겨지는 것만 됨 ref는 value써야 원하는 것을 받아올수 있음
console.log("수량초기값", quantity.value); //quantity만 찍으면 저장함수 내용 전체이 나오나 그것의 속성을 내용 value을 접근하기 위해 quantity.value로 헤야 나옴
// 수량변경함수
const changeQuantity = (amount) => {
  console.log("변경할 수량", amount);
  if (quantity.value + amount > 0 && quantity.value + amount <= 5) {
    //여기선 +더하기의미
    quantity.value += amount;
    console.log("변경된수량값", quantity.value); //quantity.value 합해진 수량
  }
};
// 총금액 계산 (상품가격 * 수량)
const totalPrice = computed(() => {
  //위에 1을 담아두려니 ref(1)로 하고 계산하려니computed(()=>{})를 써야함
  //상품가격 * 수량
  console.log(product.value.price);
  console.log(quantity.value);
  return product.value.price * quantity.value;
});
//찜하기 구매하기
// 찜하기 상태 변수 (초기값:false)
const liked = ref(false)
console.log(liked.value);//ref니 value 잊지 말자, ()리턴도
// 찜하기 토글함수 기능
const toggleLike = ()=>{
  liked.value = !liked.value
  console.log(liked.value);
  console.log(!liked.value);  
}
// 구매하기
// 클릭시 
const showModal = ref(false)
// console.log(showModal.value);
// 구매확인 버튼 클릭시
const confirmBtn = ()=>{
  alert(`${product.value.name}을(를) ${quantity.value}개 구매 완료!`)//밑에 quantity만이 아니라 quantity.value로 써야함(자바는)
}
</script>
<template>
  <div>
    <button @click="goBack">뒤로가기</button>
    <div class="product-container">
      <!-- 상품 이미지 -->
      <div class="image-section">
        <img :src="selectedImage" alt="products.name" class="main-image" />
        <!--import "selectedImage" from "src/views/ProductDetail.vue". 로 뜨면 src문제 :src해주기-->
        <!-- 썸네일 -->
        <div class="thumnails">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            class="thumb"
            @click="selectedImage = img" />
          <!--product를 이미 받아서 쓰는 함수를 만들어 뒀으니 products가 아님-->
          <!--(img , index) in product.images로 담아뒀으니 :src="img"로 받으면 바로 받아지나,   
          @click="selectedImage = img" selectedImage 담아둔것을 img로 선택되어 선택된 이미지가 표시됨 -->
        </div>
      </div>
      <!-- 상품 정보 -->
      <div class="info-section">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <p class="description">{{ product.description }}</p>
      
      <!-- 수량선택 -->
      <div class="quantity">
        <button @click="changeQuantity(-1)"><span>-</span></button>
        <!-- changeQuantity()로 함수로 실행해야 반응이 됨-->
        <input v-model="quantity" /><!--text는 프리포멧이 되니 수량 정할 수 없어 그냥 타입은 없애야 그 내용을 한정할 수 있다.-->
        <!-- ref(1)로 담아두었으니 1나오고 totalPrice에 if에 && 추가하니 min max가 됨-->
        <button @click="changeQuantity(1)"><span>+</span></button>
      </div>
      <!-- 총금액 -->
      <p class="total_price">총금액{{ formatPrice(totalPrice) }}</p>
      <!--()는  formatPrice의 함수 내용을 totalPrice에 적용 시킨다.-->
      <!-- 찜하기 구매하기 버튼 -->
      <button class="like" @click="toggleLike"><!--toggleLike만 쓴 이유는 그 값인 참거짓 만 필요하니 ()필요 없음-->
        {{ liked ? " ❤ 찜하기 취소" : "🤍 찜하기" }}</button><!--false초기값으로 색없는게 나옴-->
      <button class="buy" @click="showModal = true">구매하기</button><!--=할당-->
      <!--  -->
    </div>

  </div>
  </div>
  <!-- 구매하기 클릭시 모달창 -->
  <div v-if="showModal" class="modal_overlay" @click="showModal = false"><!--showModal이 위에 true로 되어 있어 다시 설정이 필요함 -->
    <div class="modal_content">
      <h2>구매완료</h2>
      <p>{{ product.name }}을(를) {{ quantity }}개 구매하시겠습니까?</p>
      <p class="total_price"> 총금액 : {{ formatPrice(totalPrice) }}</p>
      <div class="buttons">
        <button class="like">취소</button>
        <button class="buy" @click="confirmBtn">확인</button>
      </div>
    </div>
  </div>
  <!-- Tab -->
  <Tab/>
</template>
<style scoped>
.product-container {
  margin: auto;
  display: flex;
  max-width: 800px;
  gap: 20px;
}
.main-image {
  width: 300px;
  margin: 0 auto;
  border-radius: 10px;
  filter: brightness(1.1);
}
.image-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.thumnails {
  display: flex;
  justify-content: center;

  gap: 10px;
}
.thumb {
  width: 50px;
  border-radius: 10px;
  cursor: pointer;
}
/*상품설명 */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.price, .total_price{
  font-size: 20px;
  font-weight: bold;
  color: #e63946;
}
.description{
  color: gray;
}
.quantity{
  display: flex;
  gap: 10px;
}
.quantity button{
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  /*중간으로 가게함*/
  display: flex;
  align-items: center;
  justify-content: center;


}
.quantity input{
  width: 50px;
  text-align: center;
  font-size: 16px;
}
.like{
  background-color: gray !important;
}
.buy{
  background-color: #e63946 !important;
}
.modal_overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  /* 모달창 중간으로도 가능 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal_content{
  background-color: #fff;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.buttons{
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>
