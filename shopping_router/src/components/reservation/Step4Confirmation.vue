<template>
  <div class="step-container">
    <h3>예약완료</h3>
    <p>결제가 정상적으로 완료되었습니다.</p>
    <p class="summary">
      출발지: {{ reservationDate.departure }} → 도착지:
      {{ reservationDate.destination }}
    </p>
    <p>예약자 : {{ reservationDate.name }} - ({{ reservationDate.phone }})</p>
    <p>짐개수 :{{ reservationDate.luggageCount }}</p>
    <div class="btn-group">
      <button @click="prevStep">이전</button>
      <button @click="goHome" class="btn"> 홈으로 이동</button><!--:disabled="!agree"는 비동의시 다음 넘어가 지지x-->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const emit = defineEmits(["prev"]); //기능은defineEmits들고오고 reserv에 @기능을 다 가져와야함(전페이지에서 들고옴)
defineProps({ reservationDate: Object });
const prevStep = ()=> emit("prev")
const goHome =()=>{
    router.push("/")//router link 바로 넣지 않고 홈으로 가게 const 해줘야 깔끔이 됨
}
</script>

<style lang="scss" scoped>
a{text-decoration: none;}
.step-container {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.btn{
    color: #fff;
}
p {
  line-height: 2;
}
.step-container {
  text-align: left;
}
.agreement {
  margin: 15px 0;
  font-size: 14px;
}

.btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
