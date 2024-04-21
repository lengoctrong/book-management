<script>
export default {
  props: {
    books: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    activeIndex: {
      type: Number,
      default: -1
    }
  },
  emits: ['update:activeIndex'],
  methods: {
    updateActiveIndex(index) {
      this.$emit('update:activeIndex', index)
    }
  }
}
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      style="cursor: pointer"
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ book.title }}
    </li>
  </ul>
</template>
