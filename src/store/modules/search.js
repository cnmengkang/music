import { cloudsearch } from '@/api/search/search';
const search = {

    mutations: {
        SEARCH_LIST: (state, data) => {
            state.searchList = data;
        },
        SONG_COUNT: (state, count) => {
            state.songCount = count;
        },
        SEARCH_TITLE: (state, title) => {
            state.title = title
        }
    },
    actions: {
        async getCloudSearch({ commit }, data) {
            commit('SEARCH_TITLE', data.keywords)
            const { result } = await cloudsearch(data);
            commit('SONG_COUNT', result.songCount);
            commit('SEARCH_LIST', result.songs);
        }
    }
}
export default search;