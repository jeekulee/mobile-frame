import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import App from '@/pages/App'
import createRouter from '@/router'
import createStore from '@/store'
import {configure} from '@/util/http'
import 'lib-flexible'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(ElementUI)

const store = createStore(Vuex)
const router = createRouter(Router)
configure(store, router, ElementUI)

Vue.config.productionTip = false

// VueAMap.initAMapApiLoader({
//   key: process.env.AMAP.key,
//   plugin: process.env.AMAP.plugins,
//   uiVersion: '1.0'
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
