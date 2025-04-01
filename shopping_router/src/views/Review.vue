<template>
  <div class="review-container">
    <h2>이용후기</h2>
    <!-- 후기 카드 리스트 -->
    <div class="review-list">
      <div
        v-for="(review, index) in allReviews"
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
    <!-- 글쓰기 버튼 -->
     <button @click="showForm = !showForm" class="write-btn"><!--1. @click="showForm = !showForm" 토글 버튼-->
      {{ showForm ? "취소" : "글쓰기" }}
     </button>
     <!-- 후기 작성 폼 -->
     <form v-if="showForm" class="review-form"><!--2. 토글버튼을 만들어 뒀으니  v-if="showForm"게 있으면 보임-->
      <input type="text" v-model="newReview.name" placeholder="이름"><!--3. 입력값이 추가되게 newReview는 그에 걸맞는 속성을 써야함-->
      <input type="text" v-model="newReview.title" placeholder="제목">
      <textarea v-model="newReview.content" placeholder="내용"></textarea>
      <!-- 이미지 업로드 -->
      <input type="file" @change="imageUploadHandler" accept="image/*"><!--type="file" 파일 @change 선택가능 accept="image/*" 모든이미지를-->
      <img v-if="previewImage" :src="previewImage" alt="이미지미리보기" class="preview-image"><!--:src="" 변수에 담아둔것을 쓰기 위해-->
      <div class="form-button">
        <button type="button" @click="addReview">확인</button>
        <button type="button" @click="cancelForm">취소</button>
      </div>
     </form>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
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
// 로컬스토지에서 불러올 데이터를 한곳에 
// 사용자가 새롭게 작성한 리뷰를 저장하고 불러오는 역할
const reviews = ref([])

// 최종 더미데티터 + 로컬스토리지 데이터 합치기
const allReviews = computed(()=>[...dummyReviews , ...reviews.value])//ref로 담기니 value 쓰기

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
// 페이지 로드시 로컬스토리지에서 후기 데이터를 불러오기 감시해 출력부분
watchEffect(()=>{//감시 안하면 새로고침 해야지 반영이 잘 안되기에 watch 로 get함
  const savedReviews = localStorage.getItem("reviews")
  if(savedReviews){
    reviews.value = JSON.parse(savedReviews)//객체로 가져오기 위해 get하는 내용
  }
})
// 글쓰기
const showForm = ref(false)
const newReview = ref({//3.추가를 위해 빈배열을 담아두고
  name:"", title:"", content:"",image:"",
})
// 이미지 미리보기 저장함수
const previewImage = ref("")// 사용자가 이미지 업로드시 미리보기로 보여줄 base64 데이터를 저장하는 변수
// 이미지 업로드 처리
const imageUploadHandler = (event)=>{
  const file = event.target.files[0]
  if(file){//file이 있으면 여기서base64 데이터변환하기 위해 담기
    const reader = new FileReader() //new 새롭게 FileReader()를 reader에 담아둠
    reader.readAsDataURL(file);
    reader. onload= ()=>{
      previewImage.value = reader.result //이미지미리보기 설정
      newReview.value.image = reader.result //후기 데이터에도 이미지 추가
    }
  }
}
// 후기 추가함수
const addReview = ()=>{//버튼 누르면 
  // 입력한 값이 모두 채워졌는지 확인(하나라도 비워있으면 알림)
  
  if(!newReview.value.name || !newReview.value.title || !newReview.value.content ){//  || or임
    alert("모든 필드를 채워주세요.");
  return;
}
const newReviewData = { //푸시로 입력값 넣기 
  name: newReview.value.name, 
  title: newReview.value.title, 
  content:newReview.value.content,
  image:newReview.value.image || "/images/default-user.png",
}
// reviews 배열에 새 리뷰 추가
reviews.value.push(newReviewData);
cancelForm();//폼초기화
}
// 취소 버튼
const cancelForm = ()=>{
  newReview.value = {
    name:"", title:"", content:"",image:"",//취소누르면 입력필드 초기화시킴
  };
  previewImage.value = "";
  showForm.value = false;
}
watchEffect(()=>{
  localStorage.setItem("reviews", JSON.stringify(reviews.value));//사용자가 작성한 것을 watch로 set담아두어 감시
  console.log(`로컬에 저장된 리뷰 : ${reviews.value}`);
})
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
