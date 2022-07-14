import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/helper/request.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '12',
    isLogin: false
  },
  getters: {
    user: state => state.user,
    isLogin: state => state.isLogin
  },
  mutations: {
    // 用来操作state
    setUser (state, paylod) {
      state.user = paylod.user
    },
    setLogin (state, paylod) {
      state.isLogin = paylod.isLogin
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      let res = await request.login({ username, password })
      commit('setUser', { user: res.data })
      commit('setLogin', { isLogin: true })
    },
    async checkLogin ({ commit, state }) {
      if (state.isLogin) return true
      let res = await request.getInfo()
      console.log(res.data)
      commit('setLogin', { isLogin: res.isLogin })
      if (!state.isLogin) return false
      commit('setUser', { user: res.data })
      return true
    },
    async logout ({ commit, state }) {
      await request.logout()
      commit('setLogin', { isLogin: false })
      commit('setUser', { user: '' })
      localStorage.token = ''
    }
  }
})
