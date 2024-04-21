<script>
export default {
  props: {
    book: {
      type: Object,
      require: true
    }
  }
}
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Tên: </strong>
      {{ book.name }}
    </div>
    <div class="p-1">
      <strong>Email: </strong>
      {{ book.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ: </strong>
      {{ book.address }}
    </div>
    <div class="p-1">
      <strong>Điện thoại: </strong>
      {{ book.phone }}
    </div>
    <div class="p-1">
      <strong>Sách yêu thích :&nbsp;</strong>
      <i v-if="book.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>
  </div>
</template>
