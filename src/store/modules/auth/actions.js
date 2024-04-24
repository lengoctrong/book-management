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
<<<<<<< HEAD
    } catch (err) {
      throw new Error(err.message)
=======
    } catch (error) {
      throw new Error(`API ${error}`)
>>>>>>> 6bf2b92554ef264a6626dbfcbba1d32c10e6f6cf
    }
  }
}
