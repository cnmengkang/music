import request from '@/utils/request'

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
