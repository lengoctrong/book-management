import UserService from '@/services/userService'

export default {
  async login(context, payload) {
    try {
      const data = await UserService.create(payload)
      context.commit('setUser', { userId: data.id })
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async signup(context, payload) {
    try {
      const data = await UserService.create(payload)
      context.commit('setUser', { userId: data.id })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
