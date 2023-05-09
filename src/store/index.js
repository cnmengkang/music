import Vue from "vue";
import Vuex from "vuex";
import MusicPlayer from '@/utils/player'
import musicInfo from './modules/musicInfo';
import videos from './modules/video';
import search from './modules/search';
Vue.use(Vuex);
const options = {
  modules: {
    namespaced: true,
    musicInfo,
    videos,
    search
  }
}
let store = new Vuex.Store(options);
let player = new MusicPlayer();
store.state.musicInfo.player = player;
export default store;
