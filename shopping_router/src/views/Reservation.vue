<template>
  <!-- 부모페이지 -->
  <div class="wrap">
    <main>
      <div class="reservation-container">
        <h2>짐 보관 & 배송예약</h2>
        <component :is="currentStepcomponent" @next="goToNextStep" /><!--처음을 표시하기 위한 작업-->
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Step1Departure from "@/components/reservation/Step1Departure.vue";
import Step2Info from "@/components/reservation/Step2Info.vue";
import Step3Payment from "@/components/reservation/Step3Payment.vue";
import Step4Confirmation from "@/components/reservation/Step4Confirmation.vue";
// 현재 단계
const cuurentStep = ref(1);
const steps = [Step1Departure, Step2Info, Step3Payment, Step4Confirmation];
// 현재 표시할 컴포넌트
const currentStepcomponent = computed(()=> steps[cuurentStep.value - 1])//페이지 전환도 computed 씀
// currentStepcomponent는 결국 0이 됨

// 예약진행 데이터 받아 둘곳 만들기(출발지, 도착지 , 예약정보)
const reservationDate = ref({
    departure:"",//출발지 정보
    destination:"",//도착지 정보
    name:"", //예약자 이름
    phone:"", //예약자 전화번호
    lugaggeCount:1,//짐개수
    paymentConfirmed: false,//결제 확인 안된걸로 담아둠
})

// 다음 버튼 클릭시 다음단계
const goToNextStep = (data)=>{//다음 누르면 첫페이지 내용 가지고 넘어가야함
    console.log(data);
    // 기존 데이터에 새 데이터를 병합
    reservationDate.value = {...reservationDate.value , ...data}//다음을 누르면 내용이 들어가게 만듦    
    console.log("다음단계로 이동" , reservationDate.value );    
    if(cuurentStep.value <= steps.length)cuurentStep.value++
    
}
</script>

<style lang="scss" scoped>
.reservation-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}</style>
