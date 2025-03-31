import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue';
import Reservation  from '../views/Reservation.vue';
const routes = [
    { path: "/" , name: "Home" , component: Home  },
    { path: "/reser" , name: "Reservation" , component: Reservation  },
]
const router = createRouter({
    history : createWebHistory(),
    routes,
})
export default router;