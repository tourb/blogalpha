import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./pages/login')
    },
    {
      path: '/index',
      component: () => import('./pages/index')
    },
    {
      path: '/create',
      component: () => import('./pages/create')
    },
    {
      path: '/my',
      component: () => import('./pages/my')
    }
  ]
})
