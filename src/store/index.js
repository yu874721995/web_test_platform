import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuData:  JSON.parse(window.sessionStorage.getItem('auth') )|| [],
    buttonData: JSON.parse(window.sessionStorage.getItem('button') )|| []
  },
  mutations: {
    setmenuData(state,data){
        state.menuData = data.data
    },
    setbuttonData(state,data){
        state.buttonData = data.data
    }
  },
  getters:{
    menuData(state){
        return state.menuData
    },
    buttonData(state){
        return state.buttonData
    }
  },
  actions: {
  },
  modules: {
  }
})
