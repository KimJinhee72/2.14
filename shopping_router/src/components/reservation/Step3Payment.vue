<template>
    <div class="step-container">
        <h3>결제하기</h3>
        <p class="summary">
        출발지: {{ reservationDate.departure }}  →  도착지: {{ reservationDate.destination }}
        </p>
        <p>예약자 : {{ reservationDate.name }} - ({{ reservationDate.phone }})</p>
        <p>짐개수 :{{ reservationDate.luggageCount }}</p>
        <div class="agreement">
            <input type="checkbox" v-model="agree"><label>동의합니다.</label>
        </div>
        <!-- 결제하기 -->
        <div class="btn-group">
            <button @click ="prevStep">이전</button>
            <button @click="confirmPayment" :disabled="!agree">결제</button><!--:disabled="!agree"는 비동의시 다음 넘어가 지지x-->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["next", "prev"])//기능은defineEmits들고오고 reserv에 @기능을 다 가져와야함(전페이지에서 들고옴)
defineProps({reservationDate:Object})
const agree = ref(false)
const prevStep = ()=> emit("prev")
const confirmPayment = ()=>emit("next" , {paymentConfirmed : true})//reserv에 처음에 false로 되어 있어 true가 되어 넘어감
</script>

<style lang="scss" scoped>
p{
  line-height: 2;
}
.step-container{
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
.step-container {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>