<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  components: {
    AppHeader
  },
  created() {
    this.$store.dispatch('tryLogin')
  }
}
</script>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
