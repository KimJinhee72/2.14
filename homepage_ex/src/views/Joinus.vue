<template>
    <div>
      <h1>회원가입</h1>
      <p>회원가입을 진행해 주세요</p>
      <button @click="gotoLogin">회원가입하기</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
// /useRouter()이동 할때 사용하는 함수
const router = useRouter()
const gotoLogin = ()=>{
   alert("회원가입완료")
   router.push("/login")
}
</script>

<style lang="scss" scoped>

</style>