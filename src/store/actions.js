import { cloudsearch } from '@/api/search/search';
export default {
    // 获取当前播放的音乐
    getCurrentMusicIsPlay({ state }, data) {
        state.player.createAudio(data);
        console.log('new Audio success',state.player)
    },
    drawerOpen({ state }) {
        return state.player.drawer = !state.player.drawer;
    },
    async getCloudSearch({ commit }, data) {
        commit('SEARCH_TITLE', data.keywords)
        const { result } = await cloudsearch(data);
        commit('SONG_COUNT', result.songCount);
        commit('SEARCH_LIST', result.songs);
    },
}