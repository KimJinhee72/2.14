<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-800">가방 운반 관리 대시보드</h1>

    <!-- 통계 카드 -->
    <div class="grid grid-rows-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-suitcase text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">전체 운반 예약</h3>
            <p class="text-2xl font-semibold text-gray-800">120</p>
            <span class="text-sm text-green-600">+12%</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-users text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">활성 운반 기사</h3>
            <p class="text-2xl font-semibold text-gray-800">15</p>
            <span class="text-sm text-green-600">+2명</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-star text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">평균 만족도</h3>
            <p class="text-2xl font-semibold text-gray-800">4.8</p>
            <span class="text-sm text-green-600">+0.2</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 예약 현황 -->
    <div class="bg-white rounded-lg shadow">
      <!-- 검색 필터 -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- 날짜 선택 -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">기준일</label>
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="today">오늘</option>
              <option value="week">일주일</option>
              <option value="month">한달</option>
              <option value="all">전체</option>
            </select>
            <input
              type="date"
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            <span>~</span>
            <input
              type="date"
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>

          <!-- 터미널 선택 -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">터미널</label>
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">전체</option>
              <option value="t1">제1터미널</option>
              <option value="t2">제2터미널</option>
            </select>
          </div>

          <!-- 운반 상태 -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">운반상태</label>
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">전체</option>
              <option value="waiting">대기중</option>
              <option value="assigned">기사배정</option>
              <option value="in_progress">운반중</option>
              <option value="completed">완료</option>
              <option value="cancelled">취소</option>
            </select>
          </div>

          <!-- 검색 버튼 -->
          <button
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            검색
          </button>
        </div>
      </div>

      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">운반 예약 현황</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                예약번호
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                운반유형
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                터미널
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
                담당기사
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="reservation in reservations"
              :key="reservation.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reservation.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reservation.customerName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reservation.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reservation.terminal }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reservation.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(reservation.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ reservation.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reservation.worker }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                  상세
                </button>
                <button class="text-yellow-600 hover:text-yellow-900">
                  수정
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div
        class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            이전
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            다음
          </button>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              총 <span class="font-medium">{{ totalItems }}</span
              >개 중
              <span class="font-medium">{{
                (currentPage - 1) * itemsPerPage + 1
              }}</span
              >-
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, totalItems)
              }}</span
              >개 표시
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">이전</span>
                <i class="fas fa-chevron-left"></i>
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  currentPage === page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                ]">
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">다음</span>
                <i class="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- 기사 현황 -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">기사 현황</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                기사ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연락처
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평점
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                현재상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                담당예약
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="worker in workers"
              :key="worker.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.rating }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(worker.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ worker.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.reservations }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3">
                  상세
                </button>
                <button class="text-red-600 hover:text-red-900">
                  비활성화
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 차트와 최근 예약 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 차트 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">예약 추이</h2>
        <div class="h-64">
          <Chart />
        </div>
      </div>

      <!-- 최근 예약 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">최근 예약</h2>
        <div class="space-y-4">
          <div
            v-for="reservation in recentReservations"
            :key="reservation.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">
                {{ reservation.customerName }}
              </p>
              <p class="text-sm text-gray-500">{{ reservation.date }}</p>
            </div>
            <span
              :class="getStatusClass(reservation.status)"
              class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ reservation.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Chart from "@/components/Chart.vue";

// 검색 필터 상태

// 페이지네이션 상태
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

// 계산된 속성
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
);

// 페이지네이션 함수
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const reservations = ref([
  {
    id: "#1001",
    customerName: "김철수",
    type: "출국 운반",
    terminal: "제1터미널",
    date: "2024-04-10 14:00",
    status: "대기중",
    worker: "이지은",
  },
  {
    id: "#1002",
    customerName: "박영희",
    type: "입국 운반",
    terminal: "제2터미널",
    date: "2024-04-11 10:00",
    status: "운반중",
    worker: "최윤호",
  },
  {
    id: "#1003",
    customerName: "이민수",
    type: "출국 운반",
    terminal: "제1터미널",
    date: "2024-04-12 15:00",
    status: "완료",
    worker: "김지훈",
  },
]);

const workers = ref([
  {
    id: "#C001",
    name: "이지은",
    phone: "010-1234-5678",
    rating: 4.8,
    status: "운반중",
    reservations: "2건",
  },
  {
    id: "#C002",
    name: "최윤호",
    phone: "010-8765-4321",
    rating: 4.5,
    status: "대기중",
    reservations: "1건",
  },
]);

const recentReservations = ref([
  { id: 1, customerName: "김철수", date: "2024-03-20", status: "완료" },
  { id: 2, customerName: "이영희", date: "2024-03-21", status: "대기중" },
  { id: 3, customerName: "박민수", date: "2024-03-22", status: "취소" },
  { id: 4, customerName: "정지은", date: "2024-03-23", status: "운반중" },
]);

const getStatusClass = (status) => {
  const statusClasses = {
    대기중: "bg-yellow-100 text-yellow-800",
    운반중: "bg-blue-100 text-blue-800",
    완료: "bg-green-100 text-green-800",
    취소: "bg-red-100 text-red-800",
    기사배정: "bg-purple-100 text-purple-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};
</script>
