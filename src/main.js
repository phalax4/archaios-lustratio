import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  ...App,
  store
}).$mount('#app')

export { router, store }
