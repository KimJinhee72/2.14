<template>
  <div class="space-y-4 md:space-y-6 p-4 md:p-6">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-800">
          운반 기사 대시보드
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          오늘의 가방 운반 예약 현황을 확인할 수 있습니다.
        </p>
      </div>
      <div
        class="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
        <!--focus:ring-2 box-shadow로 두께 2px의 ring(외곽선) -->
        <select
          class="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          <option value="today">오늘</option>
          <option value="week">이번 주</option>
          <option value="month">이번 달</option>
        </select>
        <!--md:w-auto 768px이상일때 자식 콘텐츠 크기에 따라 너비 자동 조절 -->
        <div
          class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 w-full justify-center md:w-auto md:justify-start">
          <span class="block w-2 h-2 rounded-full bg-green-500"></span>
          <span>온라인</span>
        </div>
      </div>
    </div>

    <!-- 통계 카드 -->
    <!--sm:grid-cols-2 스크린 사이즈가 640px 이상일 때  -->
    <!-- lg:grid-cols-4 총 4개의 열 각 열의 최소 너비는 0, 최대 너비는 1fr 
     minmax(0, 1fr)은 너비가 0보다 작아지지 않으면서 가능한 한 넓게 차지-->
    <!--   4개의 열로 구성된 그리드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-tasks text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">총 예약 수</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">3</p>
            <span class="text-sm flex items-center text-green-600">
              <i class="fas mr-1 fa-arrow-up"></i>
              5%
            </span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-check-circle text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">완료율</h3>
            <!-- md:text-2xl 스크린 사이즈가 768px 이상일 때 적용 -->
            <p class="text-xl md:text-2xl font-semibold text-gray-800">33%</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                class="bg-green-600 h-2 rounded-full transition-all duration-300"
                style="width: 33%"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-clock text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">평균 운반 시간</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">45분</p>
            <span class="text-sm flex items-center text-red-600">
              <i class="fas mr-1 fa-arrow-down"></i>
              10%
            </span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <i class="fas fa-star text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">고객 만족도</h3>
            <p class="text-xl md:text-2xl font-semibold text-gray-800">
              {{ averageRating }}
            </p>
            <!-- n번째 별이 averageRating보다 작으면 꽉 찬 별
n-0.5보다 averageRating이 크고 n보다 작으면 반쪽 별
그 외는 빈 별 -->
            <div class="flex mt-2">
              <template v-for="n in 5" :key="n">
                <i
                  v-if="n <= Math.floor(averageRating)"
                  class="fas fa-star text-sm md:text-base text-yellow-400"></i>
                <i
                  v-else-if="n - 0.5 <= averageRating"
                  class="fas fa-star-half-alt text-sm md:text-base text-yellow-400"></i>
                <i
                  v-else
                  class="fas fa-star text-sm md:text-base text-gray-300"></i>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 작업 목록 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 class="text-lg font-semibold text-gray-800">오늘의 예약</h2>
          <div
            class="flex gap-2 w-full md:w-auto overflow-x-auto md:overflow-visible">
            <button
              v-for="view in viewOptions"
              :key="view.value"
              :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200',
                currentView === view.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
              ]"
              @click="currentView = view.value">
              {{ view.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div
          v-if="filteredJobs.length === 0"
          class="text-center py-8 text-gray-500">
          오늘 예정된 예약이 없습니다.
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="job in filteredJobs"
            :key="job.id"
            :class="[
              'p-4 border rounded-lg transition-all duration-200',
              job.priority === 'high'
                ? 'border-red-200 bg-red-50 hover:bg-red-100'
                : 'border-gray-200 hover:bg-gray-50',
            ]">
            <div
              class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div
                class="flex flex-col md:flex-row items-start md:items-center gap-4">
                <!--whitespace-nowrap 텍스트 줄바꿈을 하지 않고 한 줄로 유지 -->
                <div class="text-gray-500 whitespace-nowrap">
                  <i class="fas fa-clock mr-2"></i>
                  {{ job.time }}
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ job.customer }}</h3>
                  <p class="text-sm text-gray-500">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    {{ job.address }}
                  </p>
                </div>
              </div>
              <div
                class="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                <div class="flex items-center gap-2">
                  <span
                    :class="getStatusClass(job.status)"
                    class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ getStatusText(job.status) }}
                  </span>
                  <span class="text-sm text-gray-500">
                    <i class="fas fa-users mr-1"></i>
                    {{ job.partySize }}명
                  </span>
                </div>
                <div class="flex gap-2 w-full md:w-auto">
                  <button
                    v-if="job.status === 'pending'"
                    @click="startJob(job)"
                    class="flex-1 md:flex-none px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
                    <i class="fas fa-play mr-1"></i>시작
                  </button>
                  <button
                    v-if="job.status === 'in_progress'"
                    @click="completeJob(job)"
                    class="flex-1 md:flex-none px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
                    <i class="fas fa-check mr-1"></i>완료
                  </button>
                  <button
                    @click="showJobDetails(job)"
                    class="flex-1 md:flex-none px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200">
                    <i class="fas fa-info-circle mr-1"></i>상세
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 알림 섹션 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">알림</h2>
      </div>
      <div class="p-4">
        <div
          v-if="notifications.length === 0"
          class="text-center py-8 text-gray-500">
          새로운 알림이 없습니다.
        </div>
        <div class="space-y-4">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="flex items-center gap-4 p-4 border rounded-lg transition-all duration-200"
            :class="
              notification.read
                ? 'border-gray-200 hover:bg-gray-50'
                : 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100'
            ">
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-white',
                getNotificationIconClass(notification.type),
              ]">
              <i :class="getNotificationIcon(notification.type)"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-900">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ formatTime(notification.time) }}
              </p>
            </div>
            <button
              v-if="!notification.read"
              @click="markAsRead(notification)"
              class="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 작업 상세 정보 모달 -->
    <div
      v-if="showJobModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">작업 상세 정보</h3>
            <button
              @click="closeJobModal"
              class="text-gray-400 hover:text-gray-500 transition-colors duration-200">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">고객명</span>
            <!-- JavaScript의 optional chaining(옵셔널 체이닝) 문법 -->
            <!-- selectedJob이 null 또는 undefined가 아니면,
                 → selectedJob.customer 값을 반환 -->
            <span class="text-sm font-medium text-gray-900">{{
              selectedJob?.customer
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">주소</span>
            <span class="text-sm font-medium text-gray-900">{{
              selectedJob?.address
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">시간</span>
            <span class="text-sm font-medium text-gray-900">{{
              selectedJob?.time
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">인원</span>
            <span class="text-sm font-medium text-gray-900"
              >{{ selectedJob?.partySize }}명</span
            >
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">상태</span>
            <span
              :class="[
                'text-sm font-medium px-2 py-1 rounded-full',
                getStatusClass(selectedJob?.status),
              ]">
              {{ getStatusText(selectedJob?.status) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span
              :class="[
                'text-sm font-medium',
                selectedJob?.priority === 'high'
                  ? 'text-red-600'
                  : 'text-gray-900',
              ]"
              >우선순위</span
            >
            <span :class="['text-sm font-medium']">
              {{ selectedJob?.priority === "high" ? "긴급" : "일반" }}
            </span>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            v-if="selectedJob?.status === 'pending'"
            @click="startJob(selectedJob)"
            class="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
            <i class="fas fa-play mr-1"></i>시작
          </button>
          <button
            v-if="selectedJob?.status === 'in_progress'"
            @click="completeJob(selectedJob)"
            class="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
            <i class="fas fa-check mr-1"></i>완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const showJobModal = ref(false);
// const totalJobs = computed(() => jobs.value.length);
const averageRating = ref(4.5);
// const completionRate = computed(() => {
//   const completed = jobs.value.filter(
//     (job) => job.status === "completed"
//   ).length;
//   return Math.round((completed / totalJobs.value) * 100);
// });

const jobs = ref([
  {
    id: 1,
    customer: "김철수",
    address: "인천공항 제1터미널 출국장",
    time: "14:00",
    partySize: 2,
    status: "pending",
    priority: "normal",
  },
  {
    id: 2,
    customer: "이영희",
    address: "김포공항 제2터미널 입국장",
    time: "16:30",
    partySize: 3,
    status: "in_progress",
    priority: "high",
  },
  {
    id: 3,
    customer: "박민수",
    address: "인천공항 제1터미널 입국장",
    time: "11:00",
    partySize: 4,
    status: "completed",
    priority: "normal",
  },
]);
const viewOptions = [
  { label: "전체", value: "all" },
  { label: "대기중", value: "pending" },
  { label: "진행중", value: "in_progress" },
  { label: "완료", value: "completed" },
];
const currentView = ref("all");
// 매번 수동으로 새로 필터링하지 않아도 됩
// computed는 관련 데이터가 변경될 때만 다시 계산합니다.
// 변화가 없으면 이전 결과를 재사용합니다.
// methods는 호출할 때마다 다시 계산하지만, computed는 불필요한 계산을 줄입니다.
// filteredJobs라는 "계산된 값(computed value)"을 만듭니다.
const filteredJobs = computed(() => {
  // 만약 currentView가 "all"이면
  if (currentView.value === "all")
    // 모든 잡(jobs)을 그대로 반환합니다. (필터 없이 전체 보여줌)
    return jobs.value;

  // 그렇지 않으면 (currentView가 "all"이 아닐 경우)
  return jobs.value.filter((job) => {
    console.log(job);

    // 각 job의 status가 현재 currentView 값과 같은 것만 남깁니다.
    return job.status === currentView.value;
  });
});

const getStatusText = (status) => {
  const statusMap = {
    pending: "대기중",
    in_progress: "진행중",
    completed: "완료",
  };
  return statusMap[status] || status;
};
// 대기중 진행중 css적용
const getStatusClass = (status) => {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};
// 시작
const startJob = (job) => {
  const index = jobs.value.findIndex((j) => j.id === job.id);
  if (index !== -1) {
    jobs.value[index].status = "in_progress";
  }
};
// 완료
const completeJob = (job) => {
  const index = jobs.value.findIndex((j) => j.id === job.id);
  if (index !== -1) {
    jobs.value[index].status = "completed";
  }
};
// 상세보기
const selectedJob = ref(null);
const showJobDetails = (job) => {
  console.log(job);

  selectedJob.value = job;
  showJobModal.value = true;
};
// 모달닫기
const closeJobModal = () => {
  showJobModal.value = false;
};
// 알림
const notifications = ref([
  {
    id: 1,
    // 긴급한" 이라는 의미의 영어 단어
    type: "urgent",
    message: "새로운 긴급 예약이 배정되었습니다.",
    time: "2024-03-20T10:30:00",
    read: false,
  },
  {
    id: 2,
    type: "info",
    message: "오늘의 예약 일정이 업데이트되었습니다.",
    time: "2024-03-20T09:00:00",
    read: true,
  },
  {
    id: 3,
    type: "warning",
    message: "다음 예약까지 30분 남았습니다.",
    time: "2024-03-20T09:30:00",
    read: false,
  },
]);
const getNotificationIconClass = (type) => {
  const classes = {
    urgent: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };
  return classes[type] || "bg-gray-500";
};

const getNotificationIcon = (type) => {
  const iconMap = {
    urgent: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };
  return iconMap[type] || "fas fa-bell";
};
const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// const markAsRead = (notification) => {
//   notification.read = true;
// };
</script>
