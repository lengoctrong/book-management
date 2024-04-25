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
        <div>
          <span>Phân loại: </span>
          <div class="categories" :class="{ 'line-clamp': !showAllCategories }">
            <button
              v-for="category in categories"
              :key="category"
              class="badge badge-muted border mx-1 my-1"
              @click="filterByCategory(category)"
            >
              {{ category }}
            </button>
            <button class="badge badge-muted border" @click="toggleShowAllCategories">
              {{ showAllCategories ? 'Thu gọn' : '...' }}
            </button>
          </div>
        </div>
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
      pageSize: 10,
      selectedCategory: null,
      showAllCategories: false
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
        const { title, author, date, image, quantity, borrow, category } = book
        return [title, author, date, image, quantity, borrow, category].join('')
      })
    },
    categories() {
      const categories = this.books.map((book) => book.category)
      return [...new Set(categories)]
    },
    filteredBooks() {
      if (!this.searchText && !this.selectedCategory) return this.books

      let filteredBooks = this.books
      if (this.searchText) {
        filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(this.searchText.toLowerCase())
        )
      }
      if (this.selectedCategory) {
        filteredBooks = filteredBooks.filter((book) => book.category === this.selectedCategory)
      }
      return filteredBooks
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
    toggleShowAllCategories() {
      this.showAllCategories = !this.showAllCategories
    },
    filterByCategory(category) {
      this.selectedCategory = category
    },
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
.categories {
  display: flex;
  flex-wrap: wrap;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
