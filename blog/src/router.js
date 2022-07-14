import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

const router = new Router({
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
      component: () => import('./pages/create'),
      meta: { requiresAuth: true }
    },
    {
      path: '/my',
      component: () => import('./pages/my'),
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:blogId',
      component: () => import('./pages/edit'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('./pages/register')
    },
    {
      path: '/detail/:blogId',
      component: () => import('./pages/detail')
    },
    {
      path: '/user/:userId',
      component: () => import('./pages/user')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/index',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router
