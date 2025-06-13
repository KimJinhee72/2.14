import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import FAQ from "@/views/FAQ.vue";
import Login from "@/views/Login.vue";
import MyReservation from "@/views/MyReservation.vue";
import ReservationForm from "@/views/ReservationForm.vue";
import SeviceInfo from "@/views/SeviceInfo.vue";
import ReservationStatus from "@/views/ReservationStatus.vue";
import ModifyReservation from "@/views/ModifyReservation.vue";
import Signup from "@/views/Signup.vue";
import UserProfile from "@/views/UserProfile.vue";
import FindPassword from "@/views/FindPassword.vue";
// 기사페이지
import DDashboard from "@/pages/worker/DDashboard.vue";
import WorkerHome from "@/pages/worker/WorkerHome.vue";
import JobHistory from "@/pages/worker/JobHistory.vue";
import Profile from "@/pages/worker/Profile.vue";
import AssignedJobs from "@/pages/worker/AssignedJobs.vue";
import Assing from "@/pages/worker/Assing.vue";
import Terminals from "@/pages/admin/Terminals.vue";
// 관리자페이지
import LoginAdmin from "@/views/LoginAdmin.vue";
import AdminHome from "@/pages/admin/AdminHome.vue";
import Dashboard from "@/pages/admin/Dashboard.vue";
import Customers from "@/pages/admin/Customers.vue";
import Reservations from "@/pages/admin/Reservations.vue";
import Settings from "@/pages/admin/Settings.vue";
import Workers from "@/pages/admin/Workers.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/seviceInfo", name: "SeviceInfo", component: SeviceInfo },
  { path: "/faq", name: "FAQ", component: FAQ },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/my-reservations", name: "MyReservation", component: MyReservation },
  {
    path: "/reservation",
    name: "ReservationForm",
    component: ReservationForm,
  },
  {
    path: "/find-password",
    name: "FindPassword",
    component: FindPassword,
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/reservation-status/:id",
    name: "ReservationStatus",
    component: ReservationStatus,
  },
  {
    path: "/modify-reservation/:id",
    name: "ModifyReservation",
    component: ModifyReservation,
  },
  // 기사페이지
  {
    path: "/worker",
    component: WorkerHome,
    meta: { requiresAuth: true, role: "worker" },
    redirect: "/worker/ddashboard", // 경로 접근 시 자동 리다이렉트
    children: [
      { path: "ddashboard", component: DDashboard },
      { path: "workerHome", component: WorkerHome },
      { path: "job-history", component: JobHistory },
      { path: "profile", component: Profile },
      { path: "assigned-jobs", component: AssignedJobs },
      { path: "assing", component: Assing },
    ],
  },
  // 관리자페이지
  {
    path: "/admin",
    name: "LoginAdmin",
    component: LoginAdmin,
  },
  // 관리자 로그인후
  {
    path: "/admin",
    component: AdminHome,
    redirect: "/admin/dashboard",
    children: [
      {
        path: "dashboard",
        // name: "AdminDashboard",
        component: Dashboard,
      },
      {
        path: "reservations",
        // name: "AdminReservations",
        component: Reservations,
      },
      { path: "workers", name: "AdminWorkers", component: Workers },
      { path: "customers", name: "AdminCustomers", component: Customers },
      { path: "settings", name: "AdminSettings", component: Settings },
      { path: "terminals", component: Terminals },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
