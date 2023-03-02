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

// video================================
// 获取视频标签列表
export function videoList() {
    return request({
        url: '/video/group/list'
    })
}
// 获取视频分类列表
export function videoCategory() {
    return request({
        url: '/video/category/list',
        method: 'get'
    })
}
// 获取视频标签/分类下的视频
export function videoGroup(id) {
    return request({
        url: '/video/group',
        method: 'post',
        params: { id }
    })
}
// 获取视频播放url
export function videoUrl(id) {
    return request({
        url: '/video/url',
        method: 'post',
        params: { id }
    })
}
// 获取全部视频列表
export function videoAll(offset) {
    return request({
        url: "/video/timeline/all",
        method: 'post',
        params: { offset }
    })
}

