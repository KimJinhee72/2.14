<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

const links = [
  { name: "대시보드", path: "/admin/dashboard", icon: "fas fa-chart-line" },
  {
    name: "가방 운반 예약",
    path: "/admin/reservations",
    icon: "fas fa-suitcase",
  },
  { name: "운반 기사 관리", path: "/admin/workers", icon: "fas fa-user-tie" },
  { name: "고객 관리", path: "/admin/customers", icon: "fas fa-users" },
  {
    name: "공항 터미널 관리",
    path: "/admin/terminals",
    icon: "fas fa-plane-departure",
  },
  { name: "설정", path: "/admin/settings", icon: "fas fa-cog" },
];

// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 사이드바 -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div class="flex flex-col h-full">
        <!-- 로고 -->
        <div class="p-4 border-b">
          <h1 class="text-xl font-bold text-gray-800">가방 운반 관리자</h1>
        </div>

        <!-- 네비게이션 메뉴 -->
        <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
          <router-link
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'bg-indigo-100 text-indigo-700': isActive(link.path) }">
            <i :class="[link.icon, 'mr-3']"></i>
            {{ link.name }}
          </router-link>
        </nav>

        <!-- 로그아웃 버튼 -->
        <div class="p-4 border-t">
          <button
            @click="logout"
            class="w-full flex items-center justify-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <i class="fas fa-sign-out-alt mr-3"></i>
            로그아웃
          </button>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="ml-64 min-h-screen">
      <div class="p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기본 스타일 */
.min-h-screen {
  min-height: 100vh;
}

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

/* 스크롤 스타일 */

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}

/* 전환 효과 */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* 호버 효과 */
.hover\:bg-gray-100:hover {
  background-color: #e7e7e9;
}

/* 활성화 상태 */
.bg-indigo-100 {
  background-color: #e0e7ff;
}

.text-indigo-700 {
  color: #4338ca;
}
</style>
