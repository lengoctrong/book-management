<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Quản lý mượn sách</router-link>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'book' }" class="nav-link"
          >Loại sách <i class="fas fa-book"></i
        ></router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'book.borrow' }" class="nav-link"
          >Sách mượn <i class="fas fa-book"></i
        ></router-link>
      </li>
      <li class="nav-item" v-if="isAdmin">
        <router-link :to="{ name: 'book.add' }" class="nav-link"
          >Quản lý <i class="fas fa-book"></i
        ></router-link>
      </li>
    </div>
    <div class="ml-auto navbar-nav">
      <li class="nav-item" v-if="!isAuthenticated">
        <router-link :to="{ name: 'auth' }" class="nav-link">Đăng ký / Đăng nhập</router-link>
      </li>
      <li class="nav-item" v-if="isAuthenticated">
        <base-button class="nav-link text-white bg-primary" @click="logout">Đăng xuất</base-button>
      </li>
    </div>
  </nav>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
export default {
  components: {
    BaseButton
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/auth')
    }
  }
}
</script>
