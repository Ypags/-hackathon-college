import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'
import LimitsView from '../pages/math/Limits.vue'
import GraphicsView from '../pages/math/Graphics.vue'
import ProbabilityView from '../pages/math/Probability.vue'

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
    {
      path: '/graphics',
      component: GraphicsView,
    },
    {
      path: '/probability',
      component: ProbabilityView,
    },
  ],
})

export default router
