import Vue from "vue";
import Vuex from "vuex";
import videos from './modules/video';
import search from './modules/search';

// 改造之前
import MusicPlayer from '@/utils/player';
import state from './state';
import actions from './actions';
import mutations from './mutations';
Vue.use(Vuex);



const options = {
  state,
  actions,
  mutations,
  modules: {
    namespaced: true,
    videos,
    search,
  }
}



let store = new Vuex.Store(options);
let player = new MusicPlayer();
console.log(store)
store.state.player = player;
export default store;
