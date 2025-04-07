<template>
  <nav class="navigation-bar">
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
                <router-link to="/myreservation">나의예약</router-link>
                <router-link to="/serviceInfo">서비스안내</router-link>
                <router-link to="/faq">FAQ</router-link>
            </div>
            <div class="user-menu">
                <router-link to="/contact">문의하기</router-link>
                <router-link to="login">로그인</router-link>
            </div>
        </div>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.navigation-bar {
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
  gap: 10px;
}

.mobile-wrap{
    display: flex;
    justify-content: center;
    gap: 20px;
}
// .mobile-wrap div{
//     flex: 1;
// }
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
  text-decoration: none;
}

.hamburger-menu {
//   display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}
.nav-links{
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
