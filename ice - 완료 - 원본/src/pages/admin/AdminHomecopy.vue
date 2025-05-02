<template>
<WorkerHomecopy/>
</template>
<script setup>
import WorkerHomecopy from "../worker/WorkerHomecopy.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";
const authStore = useAuthStore();
const { isLoggedIn, userName } = storeToRefs(authStore);
const route = useRoute();
const router = useRouter();
const links = [
  { name: "대시보드", path: "/admin/dashboard", icon: "fas fa-chart-line" },
  {
    name: "예약관리",
    path: "/admin/reservations",
    icon: "fas fa-calendar-check",
  },
  { name: "기사관리", path: "/admin/workers", icon: "fas fa-user-tie" },
  { name: "고객관리", path: "/admin/customers", icon: "fas fa-users" },
  { name: "설정", path: "/admin/settings", icon: "fas fa-cog" },
]
// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;
// logout기능
const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<style scoped>
/* 반응형 스타일 */
@media (max-width: 768px) {
   .fixed{
    position: relative;
    width: 100%;
    height: auto;
   .ml-64{
    margin-left: 0;
   } 
   .p-8{
    padding: 1rem;
   } 
   } 
}
</style>
