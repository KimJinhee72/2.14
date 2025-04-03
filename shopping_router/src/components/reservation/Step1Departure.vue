<template>
    <div class="step-container">
        <h3>출발지 선택</h3>
        <p>지도에서 출발지와 도착지를 선택하세요.</p>
        <!-- 카카오 맵 api지도 -->
         <div id="map"></div>
         <div class="selection-box">
            <label >
                <span>출발지:</span>
                <select v-model="departure">
                    <option value="#">출발지를 선택하세요</option>
                    <option v-for="place in places" :key="place">{{place}}</option>
                </select>
            </label>
            <!-- 도착하기 -->
            <label >
                <span>도착지:</span>
                <select v-model="destination">
                    <option value="#">도착지를 선택하세요.</option>
                    <option v-for="place in filteredDestinations" :key="place">{{ place }}</option>
                </select>
            </label>
         </div>
         <button @click="nextStep">다음</button>
    </div>

</template>

<script setup>
import { computed, ref } from 'vue';
const emit = defineEmits(["next"]) //앞의 @next 쓰려고 emit 정의 내리고 밑에 씀
const departure = ref("")// 선택한 출발지
const destination = ref("")//도착지 선택값
// 출발지 장소 목록 선언
const places = ["서울역", "강남역", "제휴 숙소 A", "제휴 숙소 B"]
// 출발지와 같은 값은 도착지에서 제외
const filteredDestinations = computed(()=>{
    return places.filter((place)=> place !== departure.value)
})
// 다음버튼  클릭시내용 만들기
const nextStep = ()=>{//담지 않고 바로 행동 할 때 바로 화살표 함수 씀
    emit("next" , {departure:departure.value , destination:destination.value})
}
</script>

<style lang="scss" scoped>

.step-container {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

select {
  width: 88%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

#map {
  width: 100%;
  height: 300px;
  margin: 10px 0;
  border-radius: 10px;
}
</style>