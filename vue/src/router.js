import Vue from 'vue'
import VueRouter from 'vue-router'

// Views
import Dashboard from './views/dashboard'
import Tasks from './views/tasks'
import Meetings from './views/meetings'
import Teams from "./views/teams/teams"
import AddTeam from "./views/teams/add"
import Login from "./views/login"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard,
      name: 'Dashboard',
      group: "dashboard",
      meta: {
        title: 'Dashboard - echo'
      }
    }, {
      path: '/login',
      component: Login,
      name: 'Login',
      group: "login",
      meta: {
        title: 'Login - echo'
      }
    }, {
      path: '/tasks',
      component: Tasks,
      name: 'Tasks',
      group: "tasks",
      meta: {
        title: 'Tasks - echo'
      }
    }, {
      path: '/meetings',
      component: Meetings,
      name: 'Meetings',
      group: "meetings",
      meta: {
        title: 'Meetings - echo'
      }
    }, {
      path: "/teams",
      component: Teams,
      name: "Teams",
      group: "teams",
      meta: {
        title: "Teams - echo"
      }
    }, {
      path: "/teams/add",
      component: AddTeam,
      name: "Create a Team",
      group: "teams",
      meta: {
        title: "Create a Team - echo"
      }
    }
  ]
})

// change document title on routing
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  next()
})

export default router
