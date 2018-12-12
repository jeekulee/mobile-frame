import http from '@/util/http'
import constant from '@/constant'
import {actionInterceptor as interceptor} from '../interceptor'

const {TOKEN, ROLE} = constant.user
const {LOGIN, LOGOUT, UPDATE_PSW, SUBBORDINATES, BASE_INFO} = constant.user
// 例子
let actions = {
  async login ({commit}, params) {
    let resp = await http.post('/pcLogin', params)
    commit(LOGIN, {...resp.data})
    console.log(resp.data)
    window.localStorage.setItem(TOKEN, resp.data.token)
    window.localStorage.setItem(ROLE, resp.data.user_info.role)
  },
  async logout ({commit}, params) {
    let resp = await http.post('/logout', params)
    commit(LOGOUT, resp.data)
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(ROLE)
  },
  async detailed ({commit}, params) {
    try {
      let resp = await http.get('/profile', params)
      commit(LOGIN, {...resp.data})
    } catch (e) {
      window.localStorage.removeItem(TOKEN)
      window.localStorage.removeItem(ROLE)
      throw e
    }
  },
  async update_password ({commit}, params) {
    let resp = await http.post('/password', params)
    commit(UPDATE_PSW, resp.data)
  },
  async getSubordinates ({commit}) {
    let resp = await http.get('/user/map')
    commit(SUBBORDINATES, resp.result)
  },
  async getProjectBase ({commit}) {
    let resp = await http.get('/projectbase')
    commit(BASE_INFO, { ...resp.data })
  },
  async setProjectBase ({commit}, params) {
    await http.post('/projectbase', params)
    commit(BASE_INFO, params)
  }
}

actions.detailed.prototype.__native = true
actions.login.prototype.async_reg_commit = LOGIN
actions.update_password.prototype.async_reg_commit = UPDATE_PSW
actions.getSubordinates.prototype.async_reg_commit = SUBBORDINATES
actions.getProjectBase.prototype.async_reg_commit = BASE_INFO
actions.setProjectBase.prototype.async_reg_commit = BASE_INFO

export default interceptor(actions)
// export default actions
