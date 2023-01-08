

import { mvDetail } from '@/api/video/mv'
import { mvUrl } from '@/api/video/mv'
// api
const state = () => ({
    id: '1233456',
    name: '',
    avatar: '',
    url: '',
    hide:true
})

// getters 可以理解是store的计算属性
const getters = {

}
// mutations 
const mutations = {
    setSigner(state, userinfo) {
        state.name = userinfo.name
        state.avatar = userinfo.img1v1Url
    },
    setUrl(state, url) {
        console.log(url)
        state.url = url
    },
}
// actions 可以处理异步函数
const actions = {
    // 根据id获取mv信息
    getDetailMv({ commit }, mvInfo) {
        // console.log(mvInfo.ar[0].id)
        const mvId = mvInfo.mv;  //mvId
        mvDetail(mvId).then(res => {
            console.log(res.data.artists[0])
            commit('setSigner', res.data.artists[0])
        })
        mvUrl(mvId).then(res => {
            console.log(res.data.url)
            commit('setUrl', res.data.url)
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