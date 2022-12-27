import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    namespaced: true,
    user

  }
})

export default store
