import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Contact from "@/views/Contact.vue";
import FAQ from "@/views/FAQ.vue";
import Myreservation from "@/views/Myreservation.vue";
import ReservationForm from "@/views/ReservationForm.vue";
import ServiceInfo from "@/views/ServiceInfo.vue"; 
const routes = [
    {path :"/",name:"Home", component : Home},
    {path :"/login", component : Login },
    {path :"/contact", component : Contact},
    {path :"/faq", component : FAQ},
    {path :"/myreservation", component : Myreservation},
    {path :"/reservation", component : ReservationForm},
    {path :"/serviceInfo", component : ServiceInfo},
]
const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;