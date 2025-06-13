<!-- DriverPage.vue -->
<template>
  <div class="space-y-4 md:space-y-6 p-4 md:p-6">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-800">
          나의 가방 운반 예약 목록
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          가방 운반 예약 현황과 일정을 확인할 수 있습니다.
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
          v-model="statusFilter"
          @change="filterDeliveries"
          class="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          <option value="all">전체 상태</option>
          <option value="대기중">대기중</option>
          <option value="진행중">진행중</option>
          <option value="완료">완료</option>
        </select>
      </div>
    </div>

    <!-- 배송 목록 -->
    <div class="bg-white rounded-lg shadow-sm">
      <!-- 모바일 카드 뷰 -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="item in filteredDeliveries"
          :key="item.id"
          class="bg-white border rounded-lg p-4 space-y-4 hover:bg-gray-50 transition-all duration-200">
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getStatusClass(item.status),
                ]">
                <i :class="getStatusIcon(item.status)" class="mr-1"></i>
                {{ item.status }}
              </span>
              <div class="text-sm font-medium text-gray-900">
                배송번호: {{ item.id }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-900">{{ item.datetime }}</div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-900">
              <i class="fas fa-user-circle text-indigo-500 mr-2"></i>
              {{ item.customer }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-phone text-gray-400 mr-2"></i>
              {{ item.phone }}
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500">
              <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
              픽업: {{ item.pickup }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-truck text-gray-400 mr-2"></i>
              배송: {{ item.delivery }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-box text-gray-400 mr-2"></i>
              수화물: {{ item.count }}개
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <button
              v-if="item.status === '대기중'"
              @click="updateStatus(item, '진행중')"
              class="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              <i class="fas fa-play mr-1"></i>배송 시작
            </button>
            <button
              v-else-if="item.status === '진행중'"
              @click="updateStatus(item, '완료')"
              class="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
              <i class="fas fa-check mr-1"></i>배송 완료
            </button>
            <span
              v-else
              class="flex-1 px-3 py-1.5 text-gray-500 flex items-center justify-center">
              <i class="fas fa-check-circle text-green-500 mr-1"></i>
              완료
            </span>
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
                배송번호
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연락처
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
                가방 수
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                예약일시
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                처리
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in filteredDeliveries"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors duration-200">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ item.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <i class="fas fa-user-circle text-indigo-500 mr-2"></i>
                  {{ item.customer }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-phone text-gray-400 mr-2"></i>
                  {{ item.phone }}
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                  {{ item.pickup }}
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-truck text-gray-400 mr-2"></i>
                  {{ item.delivery }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-box text-gray-400 mr-2"></i>
                  {{ item.count }}개
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="far fa-calendar-alt text-gray-400 mr-2"></i>
                  {{ item.datetime }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getStatusClass(item.status),
                  ]">
                  <i :class="getStatusIcon(item.status)" class="mr-1"></i>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  v-if="item.status === '대기중'"
                  @click="updateStatus(item, '진행중')"
                  class="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                  <i class="fas fa-play"></i>
                  운반 시작
                </button>
                <button
                  v-else-if="item.status === '진행중'"
                  @click="updateStatus(item, '완료')"
                  class="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
                  <i class="fas fa-check"></i>
                  운반 완료
                </button>
                <span v-else class="text-gray-500 flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-500"></i>
                  완료
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const searchQuery = ref("");
const statusFilter = ref("all");

const myDeliveries = ref([
  {
    id: "A123",
    customer: "홍길동",
    phone: "010-1234-5678",
    pickup: "인천공항 제1터미널 출국장",
    delivery: "인천공항 제1터미널 입국장",
    count: 2,
    datetime: "2024-03-20 10:00",
    status: "대기중",
  },
  {
    id: "A124",
    customer: "김영희",
    phone: "010-9876-5432",
    pickup: "김포공항 제2터미널 출국장",
    delivery: "김포공항 제2터미널 입국장",
    count: 1,
    datetime: "2024-03-20 12:30",
    status: "진행중",
  },
  {
    id: "A125",
    customer: "박준형",
    phone: "010-1111-2222",
    pickup: "인천공항 제1터미널 출국장",
    delivery: "인천공항 제1터미널 입국장",
    count: 3,
    datetime: "2024-03-21 09:00",
    status: "완료",
  },
  {
    id: "A126",
    customer: "이하늘",
    phone: "010-3333-4444",
    pickup: "김포공항 제1터미널 출국장",
    delivery: "김포공항 제1터미널 입국장",
    count: 2,
    datetime: "2024-03-21 15:00",
    status: "대기중",
  },
  {
    id: "A127",
    customer: "정지원",
    phone: "010-5555-6666",
    pickup: "인천공항 제2터미널 출국장",
    delivery: "인천공항 제2터미널 입국장",
    count: 1,
    datetime: "2024-03-22 07:30",
    status: "진행중",
  },
  {
    id: "A128",
    customer: "최민수",
    phone: "010-7777-8888",
    pickup: "김포공항 제1터미널 출국장",
    delivery: "김포공항 제1터미널 입국장",
    count: 2,
    datetime: "2024-03-22 10:00",
    status: "완료",
  },
  {
    id: "A129",
    customer: "한예슬",
    phone: "010-9999-0000",
    pickup: "인천공항 제2터미널 출국장",
    delivery: "인천공항 제2터미널 입국장",
    count: 4,
    datetime: "2024-03-23 09:00",
    status: "진행중",
  },
  {
    id: "A130",
    customer: "장민호",
    phone: "010-8888-7777",
    pickup: "김포공항 제2터미널 출국장",
    delivery: "김포공항 제2터미널 입국장",
    count: 1,
    datetime: "2024-03-23 13:30",
    status: "대기중",
  },
  {
    id: "A131",
    customer: "송지효",
    phone: "010-6666-5555",
    pickup: "인천공항 제1터미널 출국장",
    delivery: "인천공항 제1터미널 입국장",
    count: 2,
    datetime: "2024-03-24 08:45",
    status: "완료",
  },
  {
    id: "A132",
    customer: "김수현",
    phone: "010-4444-3333",
    pickup: "김포공항 제1터미널 출국장",
    delivery: "김포공항 제1터미널 입국장",
    count: 3,
    datetime: "2024-03-24 10:15",
    status: "진행중",
  },
]);

// computed 속성으로 검색 및 필터링 처리
const filteredDeliveries = computed(() => {
  let result = [...myDeliveries.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (item) =>
        item.customer.toLowerCase().includes(query) ||
        item.pickup.toLowerCase().includes(query) ||
        item.delivery.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value !== "all") {
    result = result.filter((item) => item.status === statusFilter.value);
  }

  return result;
});
// // 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}

const updateStatus = (item, nextStatus) => {
  item.status = nextStatus;
  alert(`상태가 "${nextStatus}"(으)로 변경되었습니다.`);
};

const getStatusClass = (status) => {
  const statusClasses = {
    완료: "bg-green-100 text-green-800",
    진행중: "bg-blue-100 text-blue-800",
    대기중: "bg-yellow-100 text-yellow-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const getStatusIcon = (status) => {
  const statusIcons = {
    완료: "fas fa-check-circle text-green-500",
    진행중: "fas fa-truck text-blue-500",
    대기중: "fas fa-clock text-yellow-500",
  };
  return statusIcons[status] || "fas fa-circle text-gray-500";
};
</script>

<style>
/* Remove all scoped styles as we're using Tailwind now */
</style>
