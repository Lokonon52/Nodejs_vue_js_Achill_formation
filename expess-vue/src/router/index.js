import  { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersList from "@/components/UsersList.vue";
import UpdateUser from "@/components/UpdateUser.vue";
import CodeInput from "@/components/CodeInput.vue";
 import EmailInput from '@/components/EmailInput.vue';
 import NewPassword from "@/components/NewPassword.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: UsersList
   // meta: { requiresAuth: true }, // Cette route nécessite une authentification
  },
  {
    path: '/updateUser',
    name: 'updateUser',
    component: UpdateUser
   // meta: { requiresAuth: true }, // Cette route nécessite une authentification
  },
  {
    path: "/private",
    name: "PrivatePage",
    component: () => import("@/components/PrivatePage.vue"),
   
  },
  {
    path: '/emailinput',
    name: 'emailinput',
    component: EmailInput
   // meta: { requiresAuth: true }, // Cette route nécessite une authentification
  },
  {
    path: '/codesend',
    name: 'codesend',
    component: CodeInput
   // meta: { requiresAuth: true }, // Cette route nécessite une authentification
  },
  {
    path: '/newpassword',
    name: 'newpassword',
    component: NewPassword
   // meta: { requiresAuth: true }, // Cette route nécessite une authentification
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
