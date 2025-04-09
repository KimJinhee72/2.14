import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Contact from "@/views/Contact.vue";
import FAQ from "@/views/FAQ.vue";
import Myreservation from "@/views/Myreservation.vue";
import ReservationForm from "@/views/ReservationForm.vue";
import ServiceInfo from "@/views/ServiceInfo.vue"; 
import ReservationStatus from "@/views/ReservationStatus.vue";
const routes = [
    {path :"/",name:"Home", component : Home},
    {path :"/login", name:"Login", component : Login },
    {path :"/contact", name:"Contact",component : Contact},
    {path :"/faq", name:"FAQ",component : FAQ},
    {path :"/myreservation", name:"Myreservation",component : Myreservation},
    {path :"/reservation", name:"ReservationForm",component : ReservationForm},
    {path :"/serviceInfo", name:"ServiceInfo",component : ServiceInfo},
    {path :"/reservation-status" , name:"ReservationStatus",component : ReservationStatus}
]
const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;