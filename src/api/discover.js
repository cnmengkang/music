import request from '@/utils/request'

// banner
export function banner(type) {
    return request({
        url: "banner",
        method: "post",
        params: type
    })
}
// 每日推荐歌单
export function recommend() {
    return request({
        url: "recommend/resource",
        method: "get",
    })
}