<template>
  <div class="review-container">
    <h2>이용후기</h2>
    <!-- 후기 카드 리스트 -->
    <div class="review-list">
      <div
        v-for="(review, index) in dummyReviews"
        :key="index"
        class="review-card">
        <img
          :src="review.image"
          :alt="review.title"
          class="user-image" /><!-- :쓰면 바로 review.image로 쓸수 있음 그냥 src파일 하나씩 찾아들어가야는데...-->
        <div class="review-content">
          <p class="username">{{ maskedName(review.name) }}</p>
          <h3>{{ review.title }}</h3>
          <!--제목 자리-->
          <p>{{ review.content }}</p>
          <!--내용자리-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const dummyReviews = [
  {
    name: "홍길동",
    image: "/images/people1.png",
    title: "정말 만족스러워요!",
    content: "서비스가 너무 좋아서 다음에도 이용할 생각입니다.",
  },
  {
    name: "김철수",
    image: "/images/people2.png",
    title: "빠른 배송!",
    content: "배송이 예상보다 빨라서 기분 좋았어요.",
  },
  {
    name: "이영희",
    image: "/images/people3.png",
    title: "깔끔한 포장",
    content: "상품이 깔끔하게 포장되어 있어서 만족합니다.",
  },
  {
    name: "홍길동",
    image: "/images/people4.png",
    title: "정말 만족스러워요!",
    content: "서비스가 너무 좋아서 다음에도 이용할 생각입니다.",
  },
  {
    name: "김철수",
    image: "/images/people5.png",
    title: "빠른 배송!",
    content: "배송이 예상보다 빨라서 기분 좋았어요.",
  },
];
// 이름 마스킹(ex:홍길동 홍**)
const maskedName = (name) => {
  //name 받아오려고 매개변수 설정
  console.log(name);
  console.log(name.length);
  // name.chartAt(0) name의 첫번째 글자만 가져옴
  // charAt(0) 문자열 객체의 매서드
  //.repeat(name,length - 1)나머지 글자 수 만큰 *을 붙임
  return name.charAt(0) + "*".repeat(name.length - 1); //첫번째 글자 인덱스0
};
</script>

<style scoped>
.review-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.review-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.review-card {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}
.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.review-content {
    text-align: left;
}
</style>
