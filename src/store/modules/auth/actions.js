import UserService from '@/services/userService'

export default {
  async login(context, payload) {
    try {
      const data = await UserService.create({ ...payload, type: 'login' })
      localStorage.setItem('userId', data._id)
      context.commit('setUser', { userId: data._id })
    } catch (err) {
      throw new Error(err.message)
    }
  },
  tryLogin(context) {
    const userId = localStorage.getItem('userId')
    if (userId) {
      context.commit('setUser', { userId })
    }
  },
  logout(context) {
    localStorage.removeItem('userId')
    context.commit('setUser', { userId: null })
  },
  async signup(context, payload) {
    try {
      const data = await UserService.create({ ...payload, type: 'signup' })
      context.commit('setUser', { userId: data._id })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
