import request from '@/utils/request'

export function topList() {
    return request({
        url: "/toplist",
        method: 'get'
    })
}
// 所有榜单内容摘要
export function topListDetail() {
    return request({
        url: "/toplist/detail",
        method: 'get'
    })
}
