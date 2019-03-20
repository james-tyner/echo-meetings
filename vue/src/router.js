import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './views/dashboard'
import Tasks from './views/tasks'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard,
      name: 'Dashboard',
      meta: {
        title: 'Dashboard - echo'
      }
    }, {
      path: '/tasks',
      component: Tasks,
      name: 'Tasks',
      meta: {
        title: 'Tasks - echo'
      }
    }
  ]
})

// change docuemnt title on routing
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  next()
})

export default router
