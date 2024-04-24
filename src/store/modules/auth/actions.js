import UserService from '@/services/userService'

export default {
  login() {},
  async signup(context, payload) {
    try {
      const data = await UserService.create(payload)
      context.commit('setUser', { userId: data.id })
    } catch (error) {
      throw new Error(`API ${error}`)
    }
  }
}
