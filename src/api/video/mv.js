import request from '@/utils/request'
//获取mv的详情
export function mvDetail(mvid) {
    return request({
        url: '/mv/detail',
        method: 'post',
        params: { mvid }
    })
}
// 获取mv的播放地址
export function mvUrl(id) {
    return request({
        url: '/mv/url',
        method: 'post',
        params: { id }
    })
}