import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import musicInfo from './modules/musicInfo'
import videos from './modules/video'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    musicInfo,
    videos
  }
})

export default store
