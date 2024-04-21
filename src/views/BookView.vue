<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Sách
        <i class="fas fa-book"></i>
      </h4>
      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sách nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-sm btn-danger" @click="removeAllbooks()">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activebook">
        <h4>
          Chi tiết Sách
          <i class="fas fa-address-card"></i>
        </h4>
        <BookCard :book="activebook" />
        <router-link :to="{ name: 'book.edit', params: { id: activebook._id } }">
          <span class="mt-2 badge badge-warning"> <i class="fas fa-edit"></i> Hiệu chỉnh </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from '@/components/BookList.vue'
import BookCard from '@/components/BookCard.vue'
import InputSearch from '@/components/InputSearch.vue'
import BookService from '@/services/bookService'
export default {
  components: {
    BookCard,
    InputSearch,
    BookList
  },
  data() {
    return {
      books: [],
      searchText: '',
      activeIndex: -1
    }
  },
  watch: {
    searchText() {
      this.activeIndex = -1
    }
  },
  computed: {
    bookStrings() {
      return this.books.map((book) => {
        const { name, email, address, phone } = book
        return [name, email, address, phone].join('')
      })
    },
    filteredBooks() {
      if (!this.searchText) return this.books
      return this.books.filter((_book, index) => {
        return this.booksStrings[index].includes(this.searchText)
      })
    },
    activeBook() {
      if (this.activeIndex < 0) return null
      return this.filteredBooks[this.activeIndex]
    },
    filteredBooksCount() {
      return this.filteredBooks.length
    }
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveBooks()
      this.activeIndex = -1
    },
    async removeAllBooks() {
      if (confirm('Bạn muốn xóa tất cả Sách?')) {
        try {
          await BookService.removeAll()
          this.books = []
          this.activeIndex = -1
        } catch (error) {
          console.log(error)
        }
      }
    },

    gotoAddBook() {
      this.$router.push({ name: 'book.add' })
    }
  },
  mounted() {
    this.refreshList()
  }
}
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
