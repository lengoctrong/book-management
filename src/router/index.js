import { createRouter, createWebHistory } from 'vue-router'
import BookBorrow from '../views/BookBorrow.vue'
import BookView from '../views/BookView.vue'

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
    path: '/book-borrow',
    alias: '/',
    name: 'book.borrow',
    component: BookBorrow
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
