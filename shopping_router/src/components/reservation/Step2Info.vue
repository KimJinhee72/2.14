<template>
    <div>
        <h3>예약정보 입력</h3>
        <p class="summary">
        출발지: {{ reservationDate.departure }}  →  도착지: {{ reservationDate.destination }}
        </p>
    </div>
</template>

<script setup>
const emit = defineEmits(["next"])//기능은defineEmits들고오고
defineProps({reservationDate:Object})
const nextStep = ()=>{
    emit("next", {})
}
</script>

<style lang="scss" scoped>

</style>