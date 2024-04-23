import UserService from '@/services/userService'

export default {
  login() {},
  async signup(context, payload) {
    const data = await UserService.create(payload)

    console.log(data)
    context.commit('setUser', { userId: data.id })
  }
}
