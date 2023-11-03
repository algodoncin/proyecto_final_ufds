import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      email: '',
      username: ''
    },
    token: ''
  },
  getters: {
    getUser(state){
      return state.user
    },
    getToken(state){
      return state.token
    }
  },
  mutations: {
    addLoggedUser(state, user){
      state.user = user;
    },
    addUserToken(state, token){
      state.token = token
    },
    logout(state){
      state.user = {};
      state.token = {}
    }
  },
  actions: {
    addLoggedUserAction(context, user){
      context.commit('addLoggedUser', user)
    },
    addUserTokenAction(context, token){
      context.commit('addUserToken', token)
    },
    logoutAction(context){
      context.commit('logout')
    }
  },
  modules: {
  }
})
