<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <div class="d-flex justify-content-between">
        <h4>
          Sách
          <i class="fas fa-book"></i>
        </h4>
      </div>
      <BookList
        v-if="paginatedBooks.length > 0"
        :books="paginatedBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sách nào.</p>

      <div class="d-flex align-items-center justify-content-around mt-3">
        <button
          class="btn bg-primary rounded-lg text-white"
          @click="currentPage--"
          :disabled="currentPage <= 1"
        >
          Trước
        </button>
        <span>Page {{ currentPage }}/ {{ totalPageCount }}</span>
        <button
          class="btn bg-primary rounded-lg text-white"
          @click="currentPage++"
          :disabled="currentPage >= totalPageCount"
        >
          Sau
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeBook">
        <h4>
          Chi tiết Sách
          <i class="fas fa-address-card"></i>
        </h4>
        <BookCard :book="activeBook" />
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue'
import BookList from '@/components/BookList.vue'
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
      activeIndex: -1,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    searchText() {
      this.activeIndex = -1
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.filteredBooks.length / this.pageSize)
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredBooks.slice(start, end)
    },
    booksStrings() {
      return this.books.map((book) => {
        const { title, author, years, image, quantity, borrow, category } = book
        return [title, author, years, image, quantity, borrow, category].join('')
      })
    },
    filteredBooks() {
      if (!this.searchText) return this.books

      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase())
      )
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
      this.isLoading = true
      try {
        this.books = await BookService.getAll()
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    refreshList() {
      this.retrieveBooks()
      this.activeIndex = -1
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
