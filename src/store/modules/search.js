
import { searchList } from '@/api/search/search'
// api
const state = () => ({
    SearchResult: '',
    total: '',
    title: ''
})

// getters 可以理解是store的计算属性
const getters = {
}
// mutations 
const mutations = {
    SEARCH_RESULT: (state, result) => {
        console.log(result)
        state.total = result.songCount
        state.SearchResult = result.songs
    },
    SEARCH_TITLE: (state, result) => {
        state.title = result.keywords
    }
}
// actions 可以处理异步函数
const actions = {
    // 获取搜索结果
    getResult({ commit }, result) {
        commit('SEARCH_TITLE',result)
        return new Promise((resolve, reject) => {
            searchList(result).then(res => {
                if (res.code != 200) return;
                commit('SEARCH_RESULT', res.result)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}