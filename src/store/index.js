import user from './user'

export default (Vuex) => {
  return new Vuex.Store({
    modules: {
      user
    },
    strict: process.env.NODE_ENV !== 'production'
  })
}
