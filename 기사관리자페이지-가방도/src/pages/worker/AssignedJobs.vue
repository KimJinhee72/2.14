<template>
  <div class="space-y-4 md:space-y-6 p-4 md:p-6">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <!-- <h1 class="text-xl md:text-2xl font-bold text-gray-800">
          배정된 예약 목록
        </h1> -->
        <p class="text-sm text-gray-500 mt-1">
          오늘의 가방 운반 예약 현황을 확인할 수 있습니다.
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
        <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <select
            v-model="statusFilter"
            class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
            <option value="all">전체 상태</option>
            <option value="pending">대기중</option>
            <option value="in_progress">진행중</option>
            <option value="completed">완료</option>
          </select>
          <select
            class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
            <option value="all">전체 기간</option>
            <option value="today">오늘</option>
            <option value="week">이번 주</option>
            <option value="month">이번 달</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 작업 목록 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">배정된 예약 목록</h2>
      </div>
      <!-- 모바일 카드 뷰 -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="job in paginatedJobs"
          :key="job.id"
          class="bg-white border rounded-lg p-4 space-y-4 hover:bg-gray-50 transition-all duration-200">
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <span
                :class="[
                  'px-3 py-1 rounded-full sm:text-sm  text-xs font-medium',
                  getStatusClass(job.status),
                ]">
                <i :class="getStatusIcon(job.status)" class="mr-1"></i>
                {{ getStatusText(job.status) }}
              </span>
              <span
                :class="[
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  job.priority === '높음'
                    ? 'bg-red-100 text-red-800'
                    : job.priority === '보통'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800',
                ]">
                {{ job.priority }}
              </span>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-900">
                {{ formatDate(job.date) }}
              </div>
              <div class="text-sm text-gray-500">{{ job.time }}</div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-900">
              {{ job.customer }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-phone mr-1"></i
              >{{ job.contact?.primary || job.phone }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-map-marker-alt mr-1"></i>{{ job.address }}
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-900">
              {{ job.serviceType }}
            </div>
            <div class="text-sm text-gray-500">{{ job.duration }}</div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-users mr-1"></i>{{ job.partySize }}명
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <button
              v-if="job.status !== 'completed'"
              @click="startJob(job)"
              class="flex-1 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
              <i class="fas fa-play mr-1"></i>시작
            </button>
            <button
              v-if="job.status === 'in_progress'"
              @click="completeJob(job)"
              class="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
              <i class="fas fa-check mr-1"></i>완료
            </button>
            <button
              @click="showJobDetails(job)"
              class="flex-1 px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200">
              <i class="fas fa-eye mr-1"></i>상세
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
                상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객 정보
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                서비스 정보
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                일정
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                장소 정보
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="job in paginatedJobs"
              :key="job.id"
              class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getStatusClass(job.status),
                  ]">
                  <i :class="getStatusIcon(job.status)" class="mr-1"></i>
                  {{ getStatusText(job.status) }}
                </span>
                <div class="mt-2">
                  <span
                    :class="[
                      'px-2 py-0.5 text-xs font-medium rounded-full',
                      job.priority === '높음'
                        ? 'bg-red-100 text-red-800'
                        : job.priority === '보통'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800',
                    ]">
                    {{ job.priority }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ job.customer }}
                </div>
                <div class="text-sm text-gray-500">
                  <i class="fas fa-phone mr-1"></i
                  >{{ job.contact?.primary || job.phone }}
                </div>
                <div class="text-sm text-gray-500 mt-1">
                  <i class="fas fa-star text-yellow-400 mr-1"></i
                  >{{ job.customerRating }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ job.serviceType }}
                </div>
                <div class="text-sm text-gray-500">{{ job.duration }}</div>
                <div class="text-sm text-gray-500 mt-1">
                  <span
                    :class="[
                      'px-2 py-0.5 text-xs font-medium rounded-full',
                      job.paymentStatus === '결제완료'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800',
                    ]">
                    {{ job.paymentStatus }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(job.date) }}
                </div>
                <div class="text-sm text-gray-500">{{ job.time }}</div>
                <div class="text-sm text-gray-500 mt-1">
                  <i class="fas fa-users mr-1"></i>{{ job.partySize }}명
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ job.location?.type || "정보 없음" }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ job.location?.floor || "정보 없음" }}
                </div>
                <div class="text-sm text-gray-500 mt-1">
                  <i class="fas fa-map-marker-alt mr-1"></i>{{ job.address }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col space-y-2">
                  <button
                    v-if="job.status !== 'completed'"
                    @click="startJob(job)"
                    class="text-indigo-600 hover:text-indigo-900 flex items-center transition-colors duration-200">
                    <i class="fas fa-play mr-1"></i>시작
                  </button>
                  <button
                    v-if="job.status === 'in_progress'"
                    @click="completeJob(job)"
                    class="text-green-600 hover:text-green-900 flex items-center transition-colors duration-200">
                    <i class="fas fa-check mr-1"></i>완료
                  </button>
                  <button
                    @click="showJobDetails(job)"
                    class="text-blue-600 hover:text-blue-900 flex items-center transition-colors duration-200">
                    <i class="fas fa-eye mr-1"></i>상세
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div
      class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-lg shadow-sm p-4">
      <div class="text-sm text-gray-700">
        총 <span class="font-medium">{{ filteredJobs.length }}</span
        >건의 예약
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="flex gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1.5 border rounded transition-colors duration-200"
            :class="[
              currentPage === page
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 hover:bg-gray-50',
            ]">
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- 작업 상세 모달 -->
    <div
      v-if="selectedJob"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click="closeModal">
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div
          class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">작업 상세 정보</h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-500 transition-colors duration-200">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex flex-wrap items-center gap-2">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getStatusClass(selectedJob.status),
                ]">
                {{ getStatusText(selectedJob.status) }}
              </span>
              <span
                :class="[
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  selectedJob.priority === '높음'
                    ? 'bg-red-100 text-red-800'
                    : selectedJob.priority === '보통'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800',
                ]">
                {{ selectedJob.priority }}
              </span>
            </div>
            <span class="text-sm text-gray-500">
              {{ formatDate(selectedJob.date) }} {{ selectedJob.time }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 고객 정보 섹션 -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">고객 정보</h3>
              <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <label class="block text-sm text-gray-500 mb-1">이름</label>
                  <p class="text-gray-900">{{ selectedJob.customer }}</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1">연락처</label>
                  <p class="text-gray-900">{{ selectedJob.phone }}</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1">주소</label>
                  <p class="text-gray-900">{{ selectedJob.address }}</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1">인원</label>
                  <p class="text-gray-900">{{ selectedJob.partySize }}명</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1"
                    >고객 평점</label
                  >
                  <div class="flex items-center">
                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                    <span class="text-gray-900">{{
                      selectedJob.customerRating
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 서비스 정보 섹션 -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">서비스 정보</h3>
              <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <label class="block text-sm text-gray-500 mb-1"
                    >서비스 유형</label
                  >
                  <p class="text-gray-900">{{ selectedJob.serviceType }}</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1"
                    >작업 시간</label
                  >
                  <p class="text-gray-900">{{ selectedJob.duration }}</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1"
                    >담당 작업자</label
                  >
                  <p class="text-gray-900">{{ selectedJob.assignedWorker }}</p>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1"
                    >결제 상태</label
                  >
                  <span
                    :class="[
                      'px-2 py-0.5 text-xs font-medium rounded-full',
                      selectedJob.paymentStatus === '결제완료'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800',
                    ]">
                    {{ selectedJob.paymentStatus }}
                  </span>
                </div>
                <div>
                  <label class="block text-sm text-gray-500 mb-1"
                    >총 금액</label
                  >
                  <p class="text-gray-900">
                    {{ formatCurrency(selectedJob.totalAmount) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 특별 요청사항 섹션 -->
            <div class="md:col-span-2 space-y-4">
              <h3 class="text-lg font-medium text-gray-900">특별 요청사항</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div v-if="selectedJob.notes" class="mb-4">
                  <label class="block text-sm text-gray-500 mb-1">메모</label>
                  <p class="text-gray-600">{{ selectedJob.notes }}</p>
                </div>
                <div
                  v-if="
                    selectedJob.specialRequests &&
                    selectedJob.specialRequests.length > 0
                  ">
                  <label class="block text-sm text-gray-500 mb-1"
                    >요청사항</label
                  >
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="request in selectedJob.specialRequests"
                      :key="request"
                      class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {{ request }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 필요 장비 섹션 -->
            <div class="md:col-span-2 space-y-4">
              <h3 class="text-lg font-medium text-gray-900">필요 장비</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="item in selectedJob.equipment"
                    :key="item"
                    class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 작업 진행 상황 섹션 -->
            <div class="md:col-span-2 space-y-4">
              <h3 class="text-lg font-medium text-gray-900">작업 진행 상황</h3>
              <div class="relative pl-8">
                <div
                  class="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div class="relative pb-8">
                  <div
                    class="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-white bg-gray-200 -ml-2"></div>
                  <div class="pl-4">
                    <h4 class="font-medium text-gray-900">작업 시작</h4>
                    <p class="text-sm text-gray-500">
                      {{
                        selectedJob.startTime
                          ? formatTime(selectedJob.startTime)
                          : "아직 시작하지 않음"
                      }}
                    </p>
                  </div>
                </div>

                <div class="relative">
                  <div
                    :class="[
                      'absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-white -ml-2',
                      selectedJob.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gray-200',
                    ]"></div>
                  <div class="pl-4">
                    <h4 class="font-medium text-gray-900">작업 완료</h4>
                    <p class="text-sm text-gray-500">
                      {{
                        selectedJob.completeTime
                          ? formatTime(selectedJob.completeTime)
                          : "아직 완료하지 않음"
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
            닫기
          </button>
          <button
            v-if="selectedJob.status === 'in_progress'"
            @click="completeJob(selectedJob)"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const statusFilter = ref("all");
const selectedJob = ref(null);
const searchQuery = ref("");
const assignedJobs = ref([
  {
    id: 1,
    customer: "김철수",
    phone: "010-1234-5678",
    address: "인천공항 제1터미널 출국장",
    date: "2024-03-20",
    time: "14:00",
    partySize: 2,
    status: "pending",
    notes: "특별 취급이 필요한 가방이 있습니다.",
    serviceType: "출국 가방운반",
    duration: "30분",
    priority: "높음",
    paymentStatus: "결제완료",
    totalAmount: 50000,
    startTime: null,
    completeTime: null,
    assignedWorker: "이지은",
    customerRating: 4.8,
    specialRequests: ["특별 취급 가방", "빠른 운반 요청"],
    equipment: ["수하물 카트", "보호 커버", "안전 스트랩"],
    location: {
      type: "공항",
      floor: "3층",
      area: "출국장",
      parking: "P1 주차장",
      elevator: true,
    },
    contact: {
      primary: "010-1234-5678",
      secondary: "010-8765-4321",
      emergency: "010-1111-2222",
    },
    schedule: {
      arrivalTime: "13:45",
      estimatedDuration: "30분",
      bufferTime: "15분",
    },
    requirements: {
      specialAccess: "출국장 통과 필요",
      parkingInfo: "P1 주차장 A구역",
      entryCode: "1234#",
    },
  },
  {
    id: 2,
    customer: "이영희",
    phone: "010-8765-4321",
    address: "김포공항 제2터미널 입국장",
    date: "2024-03-20",
    time: "16:30",
    partySize: 3,
    status: "in_progress",
    startTime: "2024-03-20T16:30:00",
    notes: "대형 가방 2개, 소형 가방 1개",
    serviceType: "입국 가방운반",
    duration: "45분",
    priority: "보통",
    paymentStatus: "결제완료",
    totalAmount: 75000,
    completeTime: null,
    assignedWorker: "최윤호",
    customerRating: 4.5,
    specialRequests: ["대형 가방 특별 취급"],
    equipment: ["수하물 카트", "보호 커버", "안전 스트랩"],
    location: {
      type: "공항",
      floor: "1층",
      area: "입국장",
      parking: "P2 주차장",
      elevator: true,
    },
    contact: {
      primary: "010-8765-4321",
      secondary: "010-1234-5678",
      emergency: "010-3333-4444",
    },
    schedule: {
      arrivalTime: "16:15",
      estimatedDuration: "45분",
      bufferTime: "15분",
    },
    requirements: {
      specialAccess: "입국장 통과 필요",
      parkingInfo: "P2 주차장 B구역",
      entryCode: "5678#",
    },
  },
  {
    id: 3,
    customer: "박민수",
    phone: "010-1111-2222",
    address: "인천공항 제1터미널 입국장",
    date: "2024-03-21",
    time: "11:00",
    partySize: 4,
    status: "completed",
    startTime: "2024-03-21T11:00:00",
    completeTime: "2024-03-21T11:30:00",
    notes: "특별 취급이 필요한 가방이 있습니다.",
    serviceType: "입국 가방운반",
    duration: "30분",
    priority: "높음",
    paymentStatus: "결제완료",
    totalAmount: 100000,
    assignedWorker: "정지은",
    customerRating: 4.9,
    specialRequests: ["특별 취급 가방", "빠른 운반 요청"],
    equipment: ["수하물 카트", "보호 커버", "안전 스트랩"],
    location: {
      type: "공항",
      floor: "1층",
      area: "입국장",
      parking: "P1 주차장",
      elevator: true,
    },
    contact: {
      primary: "010-1111-2222",
      secondary: "010-5555-6666",
      emergency: "010-7777-8888",
    },
    schedule: {
      arrivalTime: "10:45",
      estimatedDuration: "30분",
      bufferTime: "15분",
    },
    requirements: {
      specialAccess: "입국장 통과 필요",
      parkingInfo: "P1 주차장 C구역",
      entryCode: "9012#",
    },
  },
  {
    id: 4,
    customer: "최지영",
    phone: "010-3333-4444",
    address: "인천공항 제2터미널 출국장",
    date: "2024-03-21",
    time: "13:30",
    partySize: 2,
    status: "pending",
    notes: "대형 가방 1개, 소형 가방 1개",
    serviceType: "출국 가방운반",
    duration: "30분",
    priority: "보통",
    paymentStatus: "결제완료",
    totalAmount: 50000,
    startTime: null,
    completeTime: null,
    assignedWorker: "김동현",
    customerRating: 4.7,
    specialRequests: ["대형 가방 특별 취급"],
    equipment: ["수하물 카트", "보호 커버", "안전 스트랩"],
    location: {
      type: "공항",
      floor: "3층",
      area: "출국장",
      parking: "P2 주차장",
      elevator: true,
    },
    contact: {
      primary: "010-3333-4444",
      secondary: "010-9999-0000",
      emergency: "010-5555-6666",
    },
    schedule: {
      arrivalTime: "13:15",
      estimatedDuration: "30분",
      bufferTime: "15분",
    },
    requirements: {
      specialAccess: "출국장 통과 필요",
      parkingInfo: "P2 주차장 D구역",
      entryCode: "7890#",
    },
  },
  {
    id: 5,
    customer: "정민호",
    phone: "010-5555-6666",
    address: "김포공항 제1터미널 출국장",
    date: "2024-03-22",
    time: "10:00",
    partySize: 3,
    status: "pending",
    notes: "특별 취급이 필요한 가방이 있습니다.",
    serviceType: "출국 가방운반",
    duration: "45분",
    priority: "낮음",
    paymentStatus: "결제완료",
    totalAmount: 75000,
    startTime: null,
    completeTime: null,
    assignedWorker: "강민지",
    customerRating: 4.6,
    specialRequests: ["특별 취급 가방"],
    equipment: ["수하물 카트", "보호 커버", "안전 스트랩"],
    location: {
      type: "공항",
      floor: "3층",
      area: "출국장",
      parking: "P1 주차장",
      elevator: true,
    },
    contact: {
      primary: "010-5555-6666",
      secondary: "010-7777-8888",
      emergency: "010-1111-2222",
    },
    schedule: {
      arrivalTime: "9:45",
      estimatedDuration: "45분",
      bufferTime: "15분",
    },
    requirements: {
      specialAccess: "출국장 통과 필요",
      parkingInfo: "P1 주차장 E구역",
      entryCode: "3456#",
    },
  },
]);

const filteredJobs = computed(() => {
  let result = [...assignedJobs.value];

  // 1. 검색어로 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase(); // 검색어를 소문자로 변환
    result = result.filter((job) => {
      console.log("검색 필터링 중인 job:", job); // <-- 콘솔에 job 출력
      return (
        job.customer.toLowerCase().includes(query) ||
        job.address.toLowerCase().includes(query)
      );
    });
  }

  // 2. 상태(status)로 필터링
  if (statusFilter.value !== "all") {
    result = result.filter((job) => {
      console.log("상태 필터링 중인 job:", job); // <-- 콘솔에 job 출력
      return job.status === statusFilter.value;
    });
  }

  console.log("최종 필터링 결과:", result); // <-- 최종 필터된 결과도 출력
  return result;
});

// // 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusText = (status) => {
  const statusMap = {
    pending: "대기중",
    in_progress: "진행중",
    completed: "완료",
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const getStatusIcon = (status) => {
  const statusIcons = {
    pending: "fas fa-clock text-yellow-500",
    in_progress: "fas fa-spinner fa-spin text-blue-500",
    completed: "fas fa-check-circle text-green-500",
  };
  return statusIcons[status] || "fas fa-circle text-gray-500";
};

const showJobDetails = (job) => {
  console.log(job);

  selectedJob.value = { ...job };
};

const closeModal = () => {
  selectedJob.value = null;
};

const startJob = (job) => {
  const index = assignedJobs.value.findIndex((j) => j.id === job.id);
  if (index !== -1) {
    assignedJobs.value[index] = {
      ...job,
      status: "in_progress",
      startTime: new Date().toISOString(),
    };
  }
};

const completeJob = (job) => {
  const index = assignedJobs.value.findIndex((j) => j.id === job.id);
  if (index !== -1) {
    assignedJobs.value[index] = {
      ...job,
      status: "completed",
      completeTime: new Date().toISOString(),
    };
  }
  if (selectedJob.value && selectedJob.value.id === job.id) {
    closeModal();
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
};

// 페이지네이션 관련 상태 추가
const currentPage = ref(1);
const itemsPerPage = ref(5);

// 페이지네이션 계산
const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage.value);
});

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredJobs.value.slice(start, end);
});

// 페이지 이동 함수
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style>
/* 반응형 스타일 */
@media (max-width: 768px) {
  .fixed {
    position: relative;
    width: 100%;
    height: auto;
  }

  .ml-64 {
    margin-left: 0;
  }

  .w-64 {
    width: 100%;
  }

  .p-8 {
    padding: 1rem;
  }
}
</style>
