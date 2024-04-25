<template>
  <VeeForm @submit="submitBook" :validation-schema="bookFormSchema">
    <div class="form-group">
      <label for="title">Tiêu đề</label>
      <Field name="title" type="text" class="form-control" v-model="book.title" />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="author">Tác giả</label>
      <Field name="author" type="text" class="form-control" v-model="book.author" />
      <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="date">NSX</label>

      <VueDatePicker name="date" v-model="book.date"></VueDatePicker>

      <ErrorMessage name="date" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="image">Hình ảnh (slug)</label>
      <Field
        placeholder="VD: example.com/image.jpg"
        name="image"
        type="text"
        aria-placeholder="slug"
        class="form-control"
        v-model="book.image"
      />
      <ErrorMessage name="image" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="quantity">Số lượng</label>
      <Field name="quantity" type="text" class="form-control" v-model="book.quantity" />
      <ErrorMessage name="quantity" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="category">Thể loại</label>
      <Field name="category" type="text" class="form-control" v-model="book.category" />
      <ErrorMessage name="category" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary mr-1">Lưu</button>
      <button class="btn btn-warning" type="reset">Reset</button>
    </div>
  </VeeForm>
</template>

<script>
import { ErrorMessage, Field } from 'vee-validate'
import { Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import BookService from '@/services/bookService'

export default {
  props: {
    selectedBook: {
      type: Object,
      require: false,
      default: () => ({
        title: '',
        author: '',
        date: null,
        image: '',
        quantity: null,
        borrow: false,
        category: ''
      })
    }
  },
  components: {
    VeeForm,
    Field,
    ErrorMessage,
    VueDatePicker
  },
  data() {
    const bookFormSchema = yup.object().shape({
      title: yup
        .string()
        .required('Tiêu đề phải không được để trống.')
        .min(2, 'Tiêu đề phải có ít nhất 2 ký tự.'),
      author: yup.string().required('Tác giả phải không được để trống.'),
      quantity: yup.number().required('Số lượng phải không được để trống.'),
      date: yup.date(),
      image: yup.string().required('Hình ảnh không được để trống.'),
      category: yup.string().required('Thể loại không được để trống.')
    })
    return {
      book: {
        title: '',
        author: '',
        date: null,
        image: '',
        quantity: null,
        borrow: false,
        category: '',
        error: null
      },
      bookFormSchema,
      name: '',
      date: null
    }
  },

  methods: {
    async submitBook(_, { resetForm }) {
      try {
        await BookService.create(this.book)
      } catch (err) {
        this.error = err
      }
      resetForm({
        title: '',
        author: '',
        date: null,
        image: '',
        quantity: null,
        borrow: false,
        category: ''
      })
    }
  }
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
