import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store/index.js'
import FastClick from 'fastclick'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

Vue.use(VueLazyload)

FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

