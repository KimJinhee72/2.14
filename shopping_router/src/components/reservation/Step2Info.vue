<template>
    <div>
        <h3>예약정보 입력</h3>
        <p class="summary">
        출발지: {{ reservationDate.departure }}  →  도착지: {{ reservationDate.destination }}
        </p>
        <div class="form-group">
            <label >이름: <input type="text" v-model="name"/> </label>
            <label >전화번호: <input type="tel" v-model="phone"/> </label>
            <label >짐개수: <input type="number" v-model.number="luggageCount" min="1"/> </label><!--v-model.number 로도 쓸 수있음-->
        </div>
        <div class="btn-group">
            <button @click="prevStep">이전</button>
            <button @click="nextStep">다음</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(["next", "prev"])//기능은defineEmits들고오고 reserv에 @기능을 다 가져와야함(전페이지 들고와 추가)
defineProps({reservationDate:Object})
const name = ref("")
const phone = ref("")
const luggageCount = ref(1)
const prevStep = ()=>{
    emit("prev")
}
const nextStep = ()=>{
    emit("next",{
        name : name.value,
        phone : phone.value,
        luggageCount : luggageCount.value,
    })
}

</script>

<style lang="scss" scoped>
.step-container {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.summary {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>