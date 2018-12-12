// import vehicle from './vehicle'
// import worker from './worker'
// import task from './task'
// import setting from './setting'
// import simulation from './simulation'

const config = [
  {
    path: '/',
    component: require('@/pages/layout/main').default
  },
  {
    path: '/login',
    name: 'login',
    component: require('@/pages/login').default,
    meta: {noNeedAuth: true}
  }
]

function createRouter (Router) {
  const router = new Router({
    mode: 'history',
    routes: config
  })

  // 登录路由拦截器
  router.beforeEach(function loginAuth (to, from, next) {
    next()
    // const store = router.app.$options.store
    // if (to.meta.noNeedAuth || store.state.user.info.authenticated) {
    //   next()
    // } else if (store.state.user.info.token) {
    //   let nextRun = () => loginAuth(to, from, next)
    //   store.dispatch('detailed').then(nextRun, nextRun)
    // } else {
    //   next({
    //     name: 'login',
    //     query: {
    //       redirect: to.query.redirect || to.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //     }
    //   })
    // }
  })

  // 路由跳转页面标题设置拦截器
  router.afterEach(route => {
    window.document.title = (route.meta.title ? route.meta.title + ' - ' : '') + 'Admin System'
  })

  return router
}

export default createRouter
