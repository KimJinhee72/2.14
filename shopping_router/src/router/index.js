import { createRouter, createWebHistory } from "vue-router";
// header의 하위페이지 연결
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Reservation from "@/views/Reservation.vue";
import Event from "@/views/Event.vue";
import FnQ from "@/views/FnQ.vue";
import Review from "@/views/Review.vue";
import ProductDetail from "@/views/ProductDetail.vue";
const routes = [
    {path:"/" , component : Home },
    {path:"/about" , component : About },
    {path:"/event" , component : Event },
    {path:"/review" , component : Review },
    {path:"/fnq" , component : FnQ },
    {path:"/reservation" , component : Reservation },
    {path:"/product/:id" , component : ProductDetail },//Home router.push(`/product/${id}`)에서 path부분 

]
const router = createRouter({
    history : createWebHistory(),
    routes,
})
export default router;
