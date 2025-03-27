<template>
    <header>
    <nav >
        <router-link to="/">Home</router-link> |
        <router-link to="/about">소개</router-link>|
        <router-link to="/menu" class="dropdown">메뉴
          <ul class="submenu">
            <li>
                <router-link to="/submenu1">Submenu1</router-link>
                <router-link to="/submenu2">Submenu2</router-link>
                <router-link to="/submenu3">Submenu3</router-link>
            </li>
        </ul>
        </router-link> |       
        <router-link to="/login">로그인</router-link> |
        <router-link to="/joinus">회원가입</router-link> |
        <router-link to="/review">리뷰</router-link>
    </nav>
    </header>
</template>

<script setup>

</script>

<style  scoped>
header{
    text-align: center;
    nav {
  display: flex;
  gap: 15px;
  background: #333;
  padding: 10px;
  color: white;
}
nav a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}
nav a:hover {
  background: #555;
  border-radius: 5px;
}
}
.dropdown{
  position: relative;
}
.dropdown:hover .submenu{
  display: block;
}
.submenu{
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0;
  li{
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
  }
  border-right: 5px;
  min-width: 100px;
  display: none;
}
.submenu li {
  padding: 10px;
  white-space: nowrap;
}
.submenu li a {
  color: black;
}
.submenu li a:hover {
  background: #f0f0f0;
}
</style>