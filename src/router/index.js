import BookAdd from '@/views/BookAdd.vue'
import BookBorrow from '@/views/BookBorrow.vue'
import BookEdit from '@/views/BookEdit.vue'
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
    path: '/book-add',
    name: 'book.add',
    component: BookAdd
  },
  {
    path: '/book-borrow',
    name: 'book.borrow',
    component: BookBorrow
  },
  {
    path: '/book-edit/:id',
    name: 'book.edit',
    component: BookEdit,
    props: true
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
