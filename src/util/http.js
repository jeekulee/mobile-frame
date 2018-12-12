import constant from '@/constant'
import axios from 'axios'

const {protocol, domain, service} = process.env.API

// 配置请求域名
axios.defaults.baseURL = protocol + domain + service
// axios.defaults.timeout = config.timeout

const configure = (store, router, { Message }) => {
  // 配置request拦截器，添加请求中用户的token
  axios.interceptors.request.use(
    config => {
      // config.headers['X-Requested-With'] = 'XMLHttpRequest'
      if (store.state.user.info.token) {
        config.headers.Authorization = `Bearer ${store.state.user.info.token}`
      }

      config.errorNoTreatment = !!config.errorNoTreatment
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  // 配置response拦截器
  axios.interceptors.response.use(
    response => response.data,
    error => {
      console.log(error.config.errorNoTreatment)
      if (!error.config.errorNoTreatment) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              store.commit(constant.user.LOGOUT)
              Message({
                customClass: 'system-err',
                type: 'error',
                message: error.response.data.message
              })
              router.replace({
                name: 'login',
                query: {
                  redirect: router.currentRoute.query.redirect || router.currentRoute.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
                }
              })
              break

            case 402:
            case 403:
            case 422:
              Message({
                customClass: 'system-err',
                type: 'error',
                message: error.response.data.message
              })
              break

            case 500:
              Message({
                customClass: 'system-err',
                type: 'error',
                message: '服务器错误!'
              })
              break
          }
        }
      }
      return Promise.reject(error.response.data)
    }
  )

  return axios
}

export default axios
export {configure}
