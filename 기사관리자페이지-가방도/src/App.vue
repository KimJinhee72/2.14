<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import { useAuthStore } from "./stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "vue";

const authStore = useAuthStore();
const { isLoggedIn, userName } = storeToRefs(authStore);
const route = useRoute();

const isSpecialPage = computed(() => {
  return route.path.startsWith("/admin") || route.path.startsWith("/worker");
});

// onMounted(() => {
//   authStore.initialize();
// });
</script>

<template>
  <div class="app">
    <NavigationBar v-if="!isSpecialPage" />
    <div class="content" :class="{ 'special-content': isSpecialPage }">
      <!-- <header v-if="!isSpecialPage">
        <h1 v-if="!isLoggedIn">제빙기 청소 예약 시스템</h1>
        <h1 v-else>{{ userName }} 제빙기 청소 예약 시스템</h1>
      </header> -->
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  margin: 0 auto;
  /* padding: 6rem 2rem 2rem; */
}

.special-content {
  padding: 0;
  margin: 0;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  color: #333;
  font-size: 2.5rem;
  margin: 0;
}

main {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.special-content main {
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}
</style>
