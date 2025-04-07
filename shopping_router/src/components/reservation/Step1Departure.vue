<template>
  <div class="step-container">
    <h3>출발지 선택</h3>
    <p>지도에서 출발지와 도착지를 선택하세요.</p>
    <!--카카오맵 API 지도 -->
    <div id="map"></div>
    <div class="selection-box">
      <label>
        <span>출발지:</span>
        <select v-model="departure">
          <option value="">출발지를 선택하세요.</option>
          <option v-for="place in places" :key="place">{{ place }}</option>
        </select>
      </label>
      <!-- 도착하기 -->
      <label>
        <span>도착지:</span>
        <select v-model="destination">
          <option value="">도착지를 선택하세요.</option>
          <option v-for="place in filteredDestinations" :key="place">
            {{ place }}
          </option>
        </select>
      </label>
    </div>
    <button @click="nextStep">다음</button>
  </div>
 
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
const emit = defineEmits(["next"]);
const departure = ref(""); //출발지 선택한 값
const destination = ref(""); //도착지 선택한 값
// 출발지 장소 목록 선언
const places = ["서울역", "강남역", "제휴 숙소 A", "제휴 숙소 B"];
// 출발지와 같은 값은 도착지에서 제외
const filteredDestinations = computed(() => {
  return places.filter((place) => place !== departure.value);
});
// 다음버튼 클릭
const nextStep = () => {
  emit("next", { departure: departure.value, destination: destination.value });
};
// 카카오맵 API생성
// 지도 객체를 전역 변수로 선언
let map = null;
// 지도 초기화 함수
const initMap = () => {
  // 카카오지도API로드시 생성되는 전역 객체
  // 지도가 로그 되었는디 확인
  if (window.kakao && window.kakao.maps) {
    // 지도를 표시할 HTML 요소 선택
    const container = document.getElementById("map");
    // 마커할 장소 위도/경도를 저장
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 서울시청 좌표
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    // 사용자 이미지 마커 설정
    const markerImage = new kakao.maps.MarkerImage(
      "/public/images/가방도 캐릭터 작업 모음.gif", // 이미지 URL
      new kakao.maps.Size(64, 64), // 마커 이미지 크기
    //   { offset: new kakao.maps.Point(32, 64) } // 마커 위치 조정
    );
    // 지도 생성 후 전역 변수에 저장
    map = new kakao.maps.Map(container, options);
    // 마커 생성 및 지도에 표시
    const markerPosition = new kakao.maps.LatLng(37.5665, 126.978);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 사용자 이미지 마커 적용
    });
    marker.setMap(map); // 마커 지도에 표시
    console.log("지도 초기화 완료");
  } else {
    console.error("카카오 지도 API로드되지 않았습니다.");
  }
};
// 카카오 지도 스크립트 로드
const loadKakaoMap = () => {
  const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_KEY;
  // API키 설정 여부 확인
  if (!kakaoApiKey) {
    console.error("카카오 API키가 설정되지 않았습니다.");
    return;
  }
  const scriptId = "kakao-map-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
    script.onload = () => {
      kakao.maps.load(initMap); // kakao 지도 API초기화
      console.log("카카오 지도 API로드 완료"); //스크립트 로드 확인
      initMap();
    };
    document.head.appendChild(script);
  } else {
    console.log("카카오 지도 API 스크립트가 이미 로드됨");
    window.kakao.maps.load(initMap);
  }
};
onMounted(loadKakaoMap);
</script>
<style scoped>
.step-container {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

select {
  width: 100%;
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

.selection-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.selection-box label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.selection-box label span {
  width: 15%;
}
</style>
