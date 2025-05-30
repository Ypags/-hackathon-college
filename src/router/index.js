import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'
import LimitsView from '../pages/Limits.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/limits',
      component: LimitsView,
    },
  ],
})

export default router
