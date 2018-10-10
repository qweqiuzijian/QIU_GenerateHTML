import Router from 'vue-router'
import Vue from 'vue'
import home from '@/components/home.vue'
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: home
  }
]
const router =  new Router({
  routes
})
let loading = ''
router.beforeEach((to, from, next) => {
  loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  next()
})
router.afterEach(() => {
  setTimeout(() => {
    loading && loading.close()
  }, 500)
})
export default router
