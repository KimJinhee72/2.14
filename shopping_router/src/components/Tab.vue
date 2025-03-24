<template>
  <div class="container">
    <!-- 탭메뉴 -->
    <div class="tabs">
      <button
        @click="activeTab = 'detail'"
        :class="{ active: activeTab === 'detail' }">
        상세정보</button
      ><!--css임 activeTab === 'detail'때 active 됨-->
      <!-- ===는 "엄격한 비교"를 의미 =(한개)는 단순히 값을 할당하는 데 사용되며 비교와는 전혀 다릅-->
      <button @click="activeTab = 'review'" :class="{ active: activeTab === 'review' }">리뷰</button>
    </div>
    <!-- 상세정보 영역 -->
    <div class="content" v-if="activeTab === 'detail'">
      <h2>제품 상세 설명</h2>
      <p>
        이 이어폰은 최상의 음질을 제공하며, 무선으로 편리하게 사용할 수
        있습니다.
      </p>
      <ul>
        <li>✔ 블루투스 5.0 지원</li>
        <li>✔ 최대 24시간 사용 가능</li>
        <li>✔ 노이즈 캔슬링 기능 포함</li>
      </ul>
      <div class="img_container" :class="{expanded: isExpaned}"> <!--isExpaned의 false (블리언)값이 들어감-->
        <img src="/public/images/image.png"         alt="상세이미지" />
        <div class="gradient_overay" v-if="!isExpaned"></div>
      </div>
      <div class="moreBtn" @click="toggleReadMore">
        {{ isExpaned ? "접기" : "더보기" }}
      </div>
    </div>
    <!-- 리뷰영역 -->
    <div class="content" v-if="activeTab === 'review'">
        <h2>리뷰작성</h2>
        <form @submit.prevent="addReview"><!--submit.prevent해야 방지하고 addReview실행됨-->
            <input v-model="newReview.name" type="text" placeholder="이름" required>
            <textarea v-model="newReview.text" placeholder="리뷰를 작성하세요" required></textarea>
            <input @change="handleReviewImage" type="file" accept="image/*"><!--accept="image/*"모든 이미지를 들고 오겠다.-->
            <button type="submit">리뷰등록</button>
        </form>
        <h3>사용자 리뷰</h3>
        <ul v-if="reviews.length">
      <li v-for="(review, index) in reviews" :key="index" class="review-item">
        <div class="txt">
          <strong>{{ review.name }}</strong> : {{ review.text }}
        </div>
        <div v-if="review.image" class="review-image">
          <img :src="review.image" alt="리뷰이미지" />
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
// 현재 활성화된 탭(기본값:detail)
const activeTab = ref("detail"); //담겨 있어 처음부터 보임
// 더보기 버튼 상태 초기값을 (false로 설정)
const isExpaned = ref(false)
// 더보기 토글함수
const toggleReadMore = ()=>{
    isExpaned.value = !isExpaned.value
}
// 로컬스토리지에서 리뷰 데이터를 불러오기(화면에 출력되게하게 함)
const loadReviews = ()=>{
  const savedReviews = localStorage.getItem("reviews");//revies의 내용을 savedRevies담아둠
  return savedReviews ? JSON.parse(savedReviews) : [];
}
// 리뷰 목록(초기값:로컬스토리지에서 불러오기)
const reviews = ref(loadReviews())//loadReviews()함수를 ref담아서 씀
// 새리뷰 입력필드 (초기값:빈값)
const newReview = ref({name : "", text : "" , image : ""})//""만하면 쌓이지 않아 {}로 해야 
// 리뷰추가함수 입력값을 로컬스토리지로 넣기
const addReview = ()=>{
  if(newReview.value.name && newReview.value.text){
    const reviewData = {...newReview.value}//{...newReview.value}을 손상없이 복사해서 reviewData를 쓰겠다는 의미
    if (reviewImage.value) {
      reviewData.image = reviewImage.value;
    }
    reviews.value.unshift(reviewData)//unshift()작성을 위로 쌓이게
    // reviews.value.push(reviewData)
    localStorage.setItem("reviews", JSON.stringify(reviews.value))//로컬스토리지에 저장
    // 입력필드 초기값
    newReview.value = { name: "", text: "", image: "" } //const 안담으면 ref없이 사용해야 됨
    reviewImage.value = null;
  }
}
// // 로컬스토리지 데이터 변경시 자동저장
// watchEffect(()=>{//다르게 저장된 파일을 감시를 하기 위해 그러나 위에 처럼 써도 여기서는 반응됨
//   localStorage.setItem("reviews", JSON.stringify(reviews.value));
// })
console.log("리뷰목록" , reviews.value);
// 리뷰이미지 (초기값:null)
const reviewImage = ref(null)
// 리뷰이미지 처리 함수
const handleReviewImage = (event) => {
  // event.target.files : 사용자가 업로드한 파일 목록(filelist)
  // [0] : 사용자가 선택한 첫번째 파일을 가져옴
  const file = event.target.files[0];
//   console.log(file);
//   console.log(event.target.files);
if(file){
    // console.log("선택한 파일:" ,file );
    // 파일을 읽어 올 수 있도록 FileReader()객체 생성
    const reader = new FileReader()
      // console.log(reader);
      reader.onload = (e)=>{
        reviewImage.value = e.target.result;
      }
       // 파일을 읽어서 Data URl(이미지를 base64로 변환한 문자열)
      reader.readAsDataURL(file);
      
        
}
  
}
</script>

<style scoped>
.container {
  max-width: 600px !important;
  margin: auto !important;
}
.tabs {
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
}
.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: #d3d3d3;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.tabs button.active {
  font-weight: bold;
  color: #fff;
  background-color: #42b983;
}
ul 
{
  list-style: none;
  padding: 0;
}
li {
  list-style: none;
  background: #f9f9f9;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
}
.img_container{
    width: 100%;
    height: 500px;
    overflow: hidden;
    transition: all .3s ease;
}
.img_container.expended {
  height: 3600px;
}
.img_container img {
  width: 100%;
}
.gradient_overay{
    position: absolute;
    bottom: -50px;
    width: 600px;
    height: 100px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0% , white 100%);/*0%는 위치*/
}
/* 리뷰 */

/* 리뷰 폼 */
form {
  display: flex;
  flex-direction: column;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.review-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
.review-item {
  display: flex;
  justify-content: space-around;
}
</style>
