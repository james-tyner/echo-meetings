import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueCookies)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
