<template>
  <nav class="navigaion-bar">
    <div class="nav-container">
      <router-link to="/" class="logo">제빙기 청소</router-link>
      <!-- 모바일 -->
      <div class="mobile-wrap">
        <div class="hamburger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="nav-links">
          <router-link to="/reservation">예약하기</router-link>
          <router-link to="/myreservation">나의 예약</router-link>
          <router-link to="/serviceInfo">서비스 안내</router-link>
          <router-link to="/faq">FAQ</router-link>
          <router-link to="/contact">문의하기</router-link>
        </div>
        <div class="user-menu">
          <router-link to="/login" v-if="!isLoggedIn">로그인</router-link>
          <div class="user-dropdown" v-else>
            <span class="user-name">{{ userName }}</span>
            <div class="dropdown-content">
              <router-link to="/profile">마이페이지</router-link>
              <router-link to="/myreservation">예약내역</router-link>
              <a @click="logout"> 로그아웃</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const authStore = useAuthStore();
const { isLoggedIn, userName } = storeToRefs(authStore);
const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<style scoped>
.navigaion-bar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
  text-decoration: none;
}

.hamburger-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}
.mobile-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hamburger-menu span {
  width: 25px;
  height: 2px;
  background-color: #333;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4caf50;
}

.user-menu {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
}

.user-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
}

.dropdown-content a:hover {
  background-color: #f5f5f5;
}
</style>
