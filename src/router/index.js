import { createRouter, createWebHistory } from 'vue-router'
import BookView from '../views/BookView.vue'
import UserAuth from '../views/UserAuth.vue'

const routes = [
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    alias: '/',
    name: 'book',
    component: BookView
  },
  {
    path: '/auth',
    name: 'auth',
    component: UserAuth
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
