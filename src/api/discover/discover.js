import request from "@/utils/request"
// 主页banner
export function banner() {
    return request({
        url: '/banner',
        method: 'post',
    })
}
// 获取每日推荐歌单(需要登陆用)
export function recommend() {
    return request({
        url: '/recommend/resource',
        method: 'get'
    })
}
// 获取每日推荐歌曲
export function daySongs() {
    return request({
        url: "/recommend/songs",
        methods: 'post',
    })
}
// 推荐歌单
export function personalized(limit) {
    return request({
        url: "/personalized",
        methods: 'post',
        params: limit
    })
}
// 歌单
export function topPlaylist(data) {
    return request({
        url: "/top/playlist",
        methods: 'post',
        params: data
    })
}
