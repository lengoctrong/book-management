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
      {{ book.quantity }} (cuốn)
    </div>
    <div class="p-1">
      <strong>Đã có người mượn :&nbsp;</strong>
      <i v-if="book.borrow" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>
  </div>
</template>
