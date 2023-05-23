import { cloudsearch } from '@/api/search/search';

export default {
    getCurrentMusicIsPlay({ state }, data) {
        state.player.createAudio(data);
        console.log('点击加载的数据', state.player)
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
    // 根据id获取mv信息
    getDetailMv({ commit }, mvInfo) {
        mvDetail(mvInfo).then(res => {
            commit('setSignerMv', res.data)
        })
        mvUrl(mvInfo).then(res => {
            commit('setUrl', res.data.url)
        })
    },

    // 获取视频url
    getVideoPlay({ commit }, urls) {
        commit('setSignerVideo', urls)
        videoUrl(urls.vid).then(res => {
            console.log('videoUrl', res)
            commit('setUrl', res.urls[0].url)
        })
    }
}