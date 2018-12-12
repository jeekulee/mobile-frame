import actions from './actions'
import mutations from './mutations'
import constant from '@/constant'

const {TOKEN, ROLE} = constant.user
const {UNREQUEST} = constant

const user = {
  state: {
    info: {
      token: window.localStorage.getItem(TOKEN) || false,
      id: 0,
      name: null,
      role: window.localStorage.getItem(ROLE) || null,
      zone: null,
      async_state: UNREQUEST
    },
    update_async_state: UNREQUEST,
    subordinates: {
      async_state: UNREQUEST
    },
    base: {
      data: null,
      async_state: UNREQUEST
    }
  },
  actions,
  mutations
}

export default user
