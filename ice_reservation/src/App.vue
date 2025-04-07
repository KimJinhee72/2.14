<template>
 <div class="app">
    <NavigationBar/>
    <div class="content">
        <header>
            <h1>제빙기 청소 예약시스템</h1>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
 </div>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>


<style scoped>
.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 2rem;
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
</style>
