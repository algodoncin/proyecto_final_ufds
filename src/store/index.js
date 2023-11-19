import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      email: '',
      username: '',
      role: '',
      image: ''
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
      state.token = {};
    }
  },
  actions: {
    loginAction(context, data){
      context.commit('addUserToken', data.token)
      context.commit('addLoggedUser', data.user)

      // Guardar datos en el local storage
      localStorage.setItem('userData', JSON.stringify(data))
    },
    logoutAction(context){
      context.commit('logout');

      localStorage.clear();
    }
  },
  modules: {
  }
})
