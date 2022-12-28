import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import musicInfo from './modules/musicInfo'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    namespaced: true,
    user,
    musicInfo
  }
})

export default store
