import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'
import EquationsView from '../pages/Equations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/equations',
      component: EquationsView,
    },
  ],
})

export default router
