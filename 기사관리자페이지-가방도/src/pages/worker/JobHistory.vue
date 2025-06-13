<template>
  <div class="space-y-4 md:space-y-6 p-4 md:p-6">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-800">
          가방 운반 내역
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          완료된 가방 운반 작업의 내역과 평가를 확인할 수 있습니다.
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <div class="relative w-full md:w-64">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="고객명 또는 주소로 검색"
            @input="handleInput"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" />
          <i
            class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <select
          v-model="dateRange"
          @change="updateJobHistory"
          class="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          <option value="week">최근 1주일</option>
          <option value="month">최근 1개월</option>
          <option value="year">최근 1년</option>
          <option value="all">모든 작업</option>
        </select>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i
              class="fas fa-check-circle text-xl md:text-2xl text-green-500"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-500">총 완료 작업</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">6</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <i class="fas fa-clock text-xl md:text-2xl text-blue-500"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-500">평균 운반 시간</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">30분</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <i class="fas fa-star text-xl md:text-2xl text-yellow-500"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-500">평균 평가</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">
              {{ averageRating }}
            </p>
            <div class="flex gap-1 mt-1">
              <i
                v-for="n in 5"
                :key="n"
                class="fas fa-star text-sm md:text-base"
                :class="
                  n <= Math.round(averageRating)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                "></i>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <i class="fas fa-won-sign text-xl md:text-2xl text-purple-500"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-500">총 수령 금액</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">
              300,000원
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 작업 목록 -->
    <div class="bg-white rounded-lg shadow-sm">
      <!-- 모바일 카드 뷰 -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="bg-white border rounded-lg p-4 space-y-4 hover:bg-gray-50 transition-all duration-200">
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <div class="text-sm font-medium text-gray-900">
                {{ formatDate(job.date) }} ({{ getDayOfWeek(job.date) }})
              </div>
              <div class="text-sm font-medium text-gray-900">
                <i class="fas fa-user-circle text-indigo-500 mr-2"></i>
                {{ job.customer }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">
                <i class="fas fa-won-sign text-gray-400 mr-2"></i>
                {{ job.earnings.toLocaleString() }}원
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500">
              <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
              {{ job.address }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-clock text-gray-400 mr-2"></i>
              {{ job.duration }}분
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <i
                v-for="n in 5"
                :key="n"
                class="fas fa-star text-sm"
                :class="
                  n <= job.rating ? 'text-yellow-500' : 'text-gray-300'
                "></i>
            </div>
            <span
              v-if="job.review"
              class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <i class="fas fa-comment text-blue-500 text-xs"></i>
            </span>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <button
              @click="showJobDetails(job)"
              class="flex-1 px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200">
              <i class="fas fa-info-circle mr-1"></i>상세
            </button>
          </div>
        </div>
      </div>

      <!-- 데스크톱 테이블 뷰 -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                날짜
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                픽업 위치
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                운반 위치
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업 시간
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                수령 금액
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평가
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상세
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="filteredJobs.length === 0" class="bg-white">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                <i
                  class="fas fa-clipboard-list text-4xl mb-4 text-gray-400"></i>
                <p class="text-lg">작업 내역이 없습니다.</p>
              </td>
            </tr>
            <tr
              v-for="job in filteredJobs"
              :key="job.id"
              class="hover:bg-gray-50 transition-colors duration-200"
              :class="{ 'bg-gray-50': job.review }">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatDate(job.date) }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ getDayOfWeek(job.date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <i class="fas fa-user-circle text-indigo-500 mr-2"></i>
                  <span class="text-sm font-medium text-gray-900">{{
                    job.customer
                  }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                  <span class="text-sm text-gray-500">{{ job.address }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                  <span class="text-sm text-gray-500">{{ job.address }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <i class="fas fa-clock text-gray-400 mr-2"></i>
                  <span class="text-sm text-gray-500"
                    >{{ job.duration }}분</span
                  >
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <i class="fas fa-won-sign text-gray-400 mr-2"></i>
                  <span class="text-sm text-gray-500"
                    >{{ job.earnings.toLocaleString() }}원</span
                  >
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <i
                      v-for="n in 5"
                      :key="n"
                      class="fas fa-star"
                      :class="
                        n <= job.rating ? 'text-yellow-500' : 'text-gray-300'
                      "></i>
                  </div>
                  <span
                    v-if="job.review"
                    class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <i class="fas fa-comment text-blue-500 text-xs"></i>
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  @click="showJobDetails(job)"
                  class="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2">
                  <i class="fas fa-info-circle"></i>
                  상세
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 작업 상세 모달 -->
    <div
      v-if="selectedJob"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click="selectedJob = null">
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div
          class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">작업 상세 정보</h2>
          <button
            @click="selectedJob = null"
            class="text-gray-400 hover:text-gray-500 transition-colors duration-200">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">기본 정보</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-500 mb-1">고객명</label>
                <p class="text-gray-900">{{ selectedJob.customer }}</p>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1"
                  >작업 날짜</label
                >
                <p class="text-gray-900">
                  {{ formatDate(selectedJob.date) }} ({{
                    getDayOfWeek(selectedJob.date)
                  }})
                </p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm text-gray-500 mb-1"
                  >픽업 위치</label
                >
                <p class="text-gray-900">{{ selectedJob.address }}</p>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1"
                  >운반 위치</label
                >
                <p class="text-gray-900">{{ selectedJob.address }}</p>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1"
                  >작업 시간</label
                >
                <p class="text-gray-900">{{ selectedJob.duration }}분</p>
              </div>
              <div>
                <label class="block text-sm text-gray-500 mb-1"
                  >수령 금액</label
                >
                <p class="text-gray-900">
                  {{ selectedJob.earnings.toLocaleString() }}원
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">가방 운반 정보</h3>
            <div class="space-y-2">
              <div
                v-for="(task, index) in selectedJob.transportTasks"
                :key="index"
                class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i>
                <span class="text-gray-600">{{ task }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">평가 및 리뷰</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-500 mb-1">평가</label>
                <div class="flex gap-1">
                  <i
                    v-for="n in 5"
                    :key="n"
                    class="fas fa-star"
                    :class="
                      n <= selectedJob.rating
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    "></i>
                </div>
              </div>
              <div v-if="selectedJob.review">
                <label class="block text-sm text-gray-500 mb-1"
                  >리뷰 내용</label
                >
                <div class="p-4 bg-gray-50 rounded-lg">
                  <p class="text-gray-600">{{ selectedJob.review }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex justify-end gap-2">
          <button
            @click="selectedJob = null"
            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const dateRange = ref("week");
const searchQuery = ref("");
const selectedJob = ref(null);

const jobHistory = ref([
  {
    id: 1,
    customer: "박민수",
    address: "인천공항 제1터미널 출국장 → 입국장",
    date: "2024-03-20",
    duration: 30,
    earnings: 50000,
    rating: 5,
    status: "완료",
    review:
      "매우 친절하고 안전하게 가방을 운반해주셔서 감사합니다. 다음에도 꼭 부탁드리고 싶어요!",
    transportTasks: ["대형 가방 2개", "소형 가방 1개", "특별 취급 가방 1개"],
  },
  {
    id: 2,
    customer: "최지훈",
    address: "김포공항 제2터미널 출국장 → 입국장",
    date: "2024-03-22",
    duration: 25,
    earnings: 40000,
    rating: 4,
    status: "완료",
    review: "시간 약속을 잘 지켜주셔서 감사합니다.",
    transportTasks: ["중형 가방 2개"],
  },
  {
    id: 3,
    customer: "김서연",
    address: "인천공항 제1터미널 출국장 → 입국장",
    date: "2024-03-25",
    duration: 35,
    earnings: 60000,
    rating: 5,
    status: "완료",
    review: null,
    transportTasks: ["대형 가방 3개", "소형 가방 1개"],
  },
  {
    id: 4,
    customer: "이지은",
    address: "김포공항 제1터미널 출국장 → 입국장",
    date: "2024-03-26",
    duration: 40,
    earnings: 80000,
    rating: 5,
    status: "완료",
    review:
      "가방을 매우 조심스럽게 다뤄주셔서 감사합니다. 특히 특별 취급 가방을 잘 챙겨주셨어요.",
    transportTasks: ["대형 가방 2개", "중형 가방 1개", "특별 취급 가방 2개"],
  },
  {
    id: 5,
    customer: "정민호",
    address: "인천공항 제2터미널 출국장 → 입국장",
    date: "2024-03-27",
    duration: 30,
    earnings: 70000,
    rating: 4,
    status: "완료",
    review: "친절하고 안전하게 운반해주셨습니다. 다음에도 부탁드릴게요.",
    transportTasks: ["대형 가방 1개", "중형 가방 2개", "소형 가방 1개"],
  },
  {
    id: 6,
    customer: "한수진",
    address: "김포공항 제2터미널 출국장 → 입국장",
    date: "2024-03-28",
    duration: 45,
    earnings: 100000,
    rating: 5,
    status: "완료",
    review: null,
    transportTasks: ["대형 가방 3개", "중형 가방 2개", "특별 취급 가방 1개"],
  },
]);

const averageRating = computed(() => {
  const total = jobHistory.value.reduce((sum, job) => sum + job.rating, 0);
  return (total / jobHistory.value.length).toFixed(1);
});

const filteredJobs = computed(() => {
  let result = [...jobHistory.value];

  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (job) =>
        job.customer.toLowerCase().includes(query) ||
        job.address.toLowerCase().includes(query)
    );
  }

  return result;
});
// // 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getDayOfWeek = (dateString) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  return days[date.getDay()];
};

const showJobDetails = (job) => {
  selectedJob.value = job;
};

const cancelReservation = (job) => {
  if (confirm("정말로 이 예약을 취소하시겠습니까?")) {
    job.status = "취소됨";
    alert("예약이 취소되었습니다.");
    selectedJob.value = null;
  }
};

const updateJobHistory = () => {
  // 실제 API 호출 로직 추가 예정
  console.log("업데이트된 날짜 범위:", dateRange.value);
};
</script>

<style>
/* Remove all scoped styles as we're using Tailwind now */
</style>
