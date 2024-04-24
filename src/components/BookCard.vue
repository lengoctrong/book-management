<script>
import BookService from '@/services/bookService'
export default {
  props: {
    book: {
      type: Object,
      require: true
    }
  },
  methods: {
    async borrowBook() {
      const data = await BookService.create({ test: '123' })
      console.log(data)
    }
  }
}
</script>

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
      {{ book.years }}
    </div>
    <div class="p-1">
      <strong>Thể loại: </strong>
      {{ book.category }}
    </div>
    <div class="p-1">
      <strong>Số lượng: </strong>
      {{ book.quantity > 0 ? book.quantity : 'Đã hết' }} (cuốn)
    </div>
    <button class="mt-2 badge badge-warning border" @click="borrowBook">
      <i class="fas fa-edit"></i> Đăng ký mượn
    </button>
  </div>
</template>
