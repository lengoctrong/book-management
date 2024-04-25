<template>
  <div class="page">
    <h4>Hiệu chỉnh sách</h4>
    <BookForm :selectedBook="book" />
  </div>
</template>

<script>
import BookForm from '@/components/BookForm.vue'
import BookService from '@/services/bookService'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    BookForm
  },
  data() {
    return {
      book: null,
      message: ''
    }
  },
  methods: {
    async getBook(id) {
      try {
        this.book = await BookService.get(id)
      } catch (error) {
        console.log(error)
        this.$router.push({
          name: 'notfound',
          params: {
            pathMatch: this.$route.path.split('/').slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash
        })
      }
    },
    async updateBook(data) {
      try {
        await BookService.update(this.book._id, data)
        this.message = 'Cập nhật thành công'
      } catch (error) {
        console.log(error)
      }
    },
    async deleteBook() {
      if (confirm('Bạn muốn xóa sách này?')) {
        try {
          await BookService.delete(this.book._id)
          this.$router.push({ name: 'books' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  created() {
    this.getBook(this.id)
    this.message = ''
  }
}
</script>
