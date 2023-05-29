import Vue from "vue";
import Vuex from "vuex";

import MusicPlayer from '@/utils/player';
import state from './state';
import actions from './actions';
import mutations from './mutations';
Vue.use(Vuex);
const options = {
  state,
  actions,
  mutations,
}



let store = new Vuex.Store(options);
let player = new MusicPlayer();
store.state.player = player;
export default store;
