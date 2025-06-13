<script setup>

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 사이드바 -->
     <!--inset-y-0 요소를 부모 요소의 위, 아래에 딱 붙게(top: 0, bottom: 0) 만드는 클래스 -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div class="flex flex-col h-full">
        <!-- 로고 -->
        <div class="p-4 border-b">
          <h1 class="text-xl font-bold text-gray-800">작업자 대시보드</h1>
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
        <p v-if="isLoggedIn">{{ userName }}기사님!</p>

        <!-- <Home /> -->
        <div class="driver-container">
          <main class="driver-content">
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/*@use "@/assets/styles/variables" as *;
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
.driver-container {
  display: flex;
  height: 100vh;

  .driver-content {
    flex-grow: 1;
    padding: 20px;
    background: #f9f9f9;
  }
}
</style>
