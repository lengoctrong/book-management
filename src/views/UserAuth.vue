<template>
  <form @submit.prevent="submitForm">
    <base-card>
      <div class="form-control-custom">
        <label for="email">E-Mail</label>
        <input autocomplete="username" type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control-custom">
        <label for="password">Mật khẩu</label>
        <input
          autocomplete="current-password"
          type="password"
          id="password"
          v-model.trim="password"
        />
      </div>
      <div class="d-flex">
        <p v-if="!formIsValid"></p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode"
          >{{ switchModeButtonCaption }}
        </base-button>
      </div>
    </base-card>
  </form>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login'
    }
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Đăng nhập'
      } else {
        return 'Đăng ký'
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Đăng ký'
      } else {
        return 'Đăng nhập'
      }
    }
  },
  methods: {
    submitForm() {
      this.formIsValid = true
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false
        return
      }
      // send http request
      try {
        if (this.mode === 'login') {
          // ...
        } else {
          this.$store.dispatch('signup', {
            email: this.email,
            password: this.password
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login'
    }
  },
  components: {
    BaseButton,
    BaseCard
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control-custom {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
