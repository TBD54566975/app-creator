import { createRouter, createWebHistory } from 'vue-router'
import TemplateListView from '../views/TemplateListView.vue'
import TemplateView from '../views/TemplateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TemplateListView
    },
    {
      path: '/template/:template',
      name: 'template',
      component: TemplateView
    }
  ]
})

export default router
