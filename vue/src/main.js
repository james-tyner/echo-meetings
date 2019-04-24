import Vue from 'vue';
import VueCookies from 'vue-cookies';
import Autocomplete from 'v-autocomplete';
import 'v-autocomplete/dist/v-autocomplete.css';
import VTooltip from 'v-tooltip';
import router from './router';
import App from './App.vue';

import { ApiService } from './data';

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(VTooltip);

ApiService.init();

Vue.use(Autocomplete);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
