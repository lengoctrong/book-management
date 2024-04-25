<template>
  <div>
    <div class="p-1" style="height: 350px">
      <img :src="book.image" alt="book info" class="img-fluid" style="width: 100%; height: 100%" />
    </div>
    <div class="p-1">
      <strong>Tên: </strong>
      {{ book.title }}
    </div>
    <div class="p-1">
      <strong>Tác giả: </strong>
      {{ book.author }}
    </div>
    <div class="p-1">
      <strong>NSX: </strong>
      {{ book.date }}
    </div>
    <div class="p-1">
      <strong>Thể loại: </strong>
      {{ book.category }}
    </div>
    <div class="p-1">
      <strong>Số lượng: </strong>
      {{ book.quantity > 0 ? book.quantity : 'Đã hết' }} (cuốn)
    </div>
    <router-link :to="{ name: 'book.edit', params: { id: book._id } }">
      <button v-if="isAdmin" class="mt-2 badge badge-warning border">
        <i class="fas fa-edit"></i> Hiệu chỉnh
      </button>
    </router-link>
    <button v-if="isAdmin" class="mt-2 badge badge-danger border" @click="handleDelete(book._id)">
      <i class="fas fa-trash"></i> Xóa
    </button>
  </div>
</template>

<script>
import BookService from '@/services/bookService'
import VsToast from '@vuesimple/vs-toast'
export default {
  props: {
    book: {
      type: Object,
      require: true
    }
  },
  methods: {
    openToast(position, variant) {
      VsToast.show({
        title: variant.title,
        message: variant.message,
        variant,
        position
      })
    },
    async handleDelete(id) {
      console.log('delete book has id: ', id)
      try {
        await BookService.delete(id)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  }
}
</script>
