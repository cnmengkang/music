import request from "@/utils/request"
// 主页banner
export function banner() {
    return request({
        url: 'banner',
        method: 'post',
    })
}
// 获取每日推荐歌单
export function recommend() {
    return request({
        url: '/recommend/resource',
        method: 'get'
    })
}
// 获取每日推荐歌曲
export function recSongs() {
    return request({
        url: "/recommend/songs",
        methods: 'get'
    })
}