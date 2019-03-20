import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Dashboard from './views/dashboard'
import Tasks from './views/tasks'

Vue.config.productionTip = false

Vue.use(VueRouter)

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: [
    { path: '/', component: Dashboard },
    { path: '/tasks', component: Tasks }
  ] // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
