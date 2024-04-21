import { createRouter, createWebHistory } from 'vue-router'
import BookView from '../views/BookView.vue'

const routes = [
  {
    path: '/',
    name: 'book',
    component: BookView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/books/:id',
    name: 'book.edit',
    component: () => import('@/views/BookEdit.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
