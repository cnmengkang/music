import { videoUrl, mvDetail, mvUrl } from '@/api/video/video'
// api
const video = {
    state: {
        name: '',
        avatar: '',
        url: '',
        duration: ''
    },
    // mutations 
    mutations: {
        setSignerMv(state, userinfo) {
            state.name = userinfo.artists[0].name
            state.avatar = userinfo.artists[0].img1v1Url
            state.duration = userinfo.duration
        },
        setSignerVideo(state, video) {
            state.name = video.creator.nickname
            state.avatar = video.creator.avatarUrl
            state.duration = video.durationms
        },
        setUrl(state, url) {
            state.url = url
        },
    },
    // actions 可以处理异步函数
    actions: {
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
}
export default video