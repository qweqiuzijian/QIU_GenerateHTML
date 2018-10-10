import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
const Element = require('element-ui').default
Vue.use(Element, { size: 'small', zIndex: 3000 })
const router = require('@/router').default
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
