<template>
    <div>
        <h1>로그인</h1>
        <p>로그인을 할수 있습니다. </p>
        <button @click="gotoHome">로그인하기</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const gotoHome = ()=>{
    alert("로그인완료")
    router.push("/")
}
</script>

<style lang="scss" scoped>

</style>