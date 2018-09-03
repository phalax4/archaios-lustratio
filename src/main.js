import Vue from 'vue'
import App from './App.vue'
import store from './vuex/index.js'

Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({
  ...App,
  store
}).$mount('#app')

export { store }
