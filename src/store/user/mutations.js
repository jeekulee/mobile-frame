import constant from '@/constant'
import {mutationPacking} from '../interceptor'

const {LOGIN, LOGOUT, UPDATE_PSW, SUBBORDINATES, BASE_INFO} = constant.user

const mutations = {
  [LOGIN]: function (state, payload) {
    state.info.id = payload.user_info.id
    state.info.name = payload.user_info.name
    state.info.authenticated = true
    payload.user_info && (state.info.zone = payload.user_info)
    payload.token && (state.info.token = payload.token)
    // state.info.role = payload.roles && payload.roles[0]
    payload.user_info.role && (state.info.role = payload.user_info.role)
  },
  [LOGOUT]: function (state) {
    state.info.id = 0
    state.info.name = null
    state.info.token = null
    state.info.role = null
    state.info.authenticated = false
  },
  [UPDATE_PSW]: () => { },
  [SUBBORDINATES]: function (state, payload) {
    state.subordinates = {...payload, async_state: state.subordinates.async_state}
  },

  [BASE_INFO]: function (state, payload) {
    state.base.data = {
      name: payload.name || '',
      longitude: payload.longitude,
      latitude: payload.latitude
    }
  }
}

mutations[LOGIN].prototype.bindAttr = 'info.async_state'
mutations[UPDATE_PSW].prototype.bindAttr = 'update_async_state'
mutations[SUBBORDINATES].prototype.bindAttr = 'subordinates.async_state'
mutations[BASE_INFO].prototype.bindAttr = 'base.async_state'

export default mutationPacking(mutations)
