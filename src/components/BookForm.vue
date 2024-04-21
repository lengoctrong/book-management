<template>
  <VeeForm @submit="submitBook" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field name="name" type="text" class="form-control" v-model="bookLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <Field name="email" type="email" class="form-control" v-model="bookLocal.email" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field name="address" type="text" class="form-control" v-model="bookLocal.address" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field name="phone" type="text" class="form-control" v-model="bookLocal.phone" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="bookLocal.favorite"
      />
      <label class="form-check-label" for="favorite"><strong>Sách yêu thích</strong></label>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button class="ml-2 btn btn-danger" type="button" v-if="bookLocal._id" @click="deleteBook">
        Xóa
      </button>
    </div>
  </VeeForm>
</template>

<script>
import { ErrorMessage, Field } from 'vee-validate'
import { Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  emits: ['submit:book', 'delete:book'],
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    const bookFormSchema = yup.object().shape({
      name: yup.string().required('Tên sách là bắt buộc.'),
      author: yup.string().required('Tác giả là bắt buộc.'),
      year: yup.number().integer().min(1000).max(9999).required('Năm xuất bản không hợp lệ.')
    })
    return {
      bookLocal: this.book,
      bookFormSchema
    }
  },
  methods: {
    submitBook() {
      this.$emit('submit:book', this.bookLocal)
    },
    deleteBook() {
      this.$emit('delete:book', this.bookLocal.id)
    }
  }
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
