export default {
  setUser(state, payload) {
    state.userId = payload.userId
    state.email = payload.email
  }
}
