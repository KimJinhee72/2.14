// router를 사용하기위한 js

import { createRouter, createWebHistory } from "vue-router";

// 헤더에 파일 연결하기
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Menu from "@/views/Menu.vue";
import Login from "@/views/Login.vue";
import Joinus from "@/views/Joinus.vue";
import Review from "@/views/Review.vue";
import Submenu1 from "@/views/submenu/Submenu1.vue";
import Submenu2 from "@/views/submenu/Submenu2.vue";
import Submenu3 from "@/views/submenu/Submenu3.vue";

// 패스 연결
const routes = [
    { path : "/" , component : Home},
    { path : "/about" , component : About},
    { path : "/menu" , component : Menu},
    { path : "/login" , component : Login},
    { path : "/joinus" , component : Joinus},
    { path : "/review" , component : Review},
    { path : "/submenu1" , component : Submenu1},
    { path : "/submenu2" , component : Submenu2},
    { path : "/submenu3" , component : Submenu3}
]
const router = createRouter({
    history :createWebHistory(),
    routes,
})
export default router;


