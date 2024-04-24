export default {
  userId(state) {
    return state.userId
  },
  isAuthenticated(state) {
    return !!state.userId
  },
  isAdmin(state) {
    return state.email === 'admin@gmail.com'
  }
}
