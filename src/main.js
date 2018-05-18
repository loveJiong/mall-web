import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
// import { userInfo } from './api'
import { Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option, MessageBox } from 'element-ui'
import { getStore } from '/utils/storage'
import { getConfig } from '/api/getData'
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面
router.beforeEach(async function (to, from, next) {
  let configRes = await getConfig()
  if (configRes.success) {
    store.commit('SET_COMPANYID', configRes.data.id)
    store.commit('SET_HOST', configRes.data.host)
    store.commit('SET_SHOWZK', configRes.data.showZk)
    store.commit('SET_ADDBYBAG', configRes.data.addByBag)
    store.commit('SET_COMPUTEDZK', configRes.data.computedZk)
  }
  let userInfo = getStore('userInfo')
  if (userInfo || whiteList.indexOf(to.path) !== -1) {
    userInfo && store.commit('RECORD_USERINFO', JSON.parse(userInfo))
    next()
  } else {
    next('/login')
  }
  // userInfo(params).then(res => {
  //   if (res.result.state !== 1) { // 没登录
  //     if (whiteList.indexOf(to.path) !== -1) { // 白名单
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   } else {
  //     store.commit('RECORD_USERINFO', {info: res.result})
  //     if (to.path === '/login') { //  跳转到
  //       next({path: '/'})
  //     }
  //     next()
  //   }
  // })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
