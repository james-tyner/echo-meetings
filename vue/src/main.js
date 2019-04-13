import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueCookies from 'vue-cookies'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'

import {ApiService} from "./data";

Vue.config.productionTip = false
Vue.use(VueCookies)

ApiService.init();

Vue.use(Autocomplete)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
