import UserService from '@/services/userService'

export default {
  async login(context, payload) {
    try {
      const data = await UserService.create({ ...payload, type: 'login' })

      localStorage.setItem('email', data.email)
      localStorage.setItem('userId', data._id)
      context.commit('setUser', { userId: data._id, email: data.email })
    } catch (err) {
      throw new Error(err.message)
    }
  },
  tryLogin(context) {
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('email')
    if (userId && email) {
      context.commit('setUser', { userId, email })
    }
  },
  logout(context) {
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    context.commit('setUser', { userId: null, email: null })
  },
  async signup(context, payload) {
    try {
      const data = await UserService.create({ ...payload, type: 'signup' })
      context.commit('setUser', { userId: data._id, email: data.email })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
