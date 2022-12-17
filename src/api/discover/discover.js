import request from "@/utils/request"
// banner
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
        method: 'get',
    })
}