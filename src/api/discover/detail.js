import request from '@/utils/request'

// 获取所有歌单
export function detail(id) {
    return request({
        url: '/playlist/detail',
        method: 'post',
        params: id
    })
}
// 获取歌单所有歌曲
export function playTrack(id) {
    return request({
        url: '/playlist/track/all',
        method: 'post',
        params: id
    })
}
// 获取歌曲评论
export function comment(data) {
    return request({
        url: '/comment/music',
        method: 'post',
        params: data
    })
}
// 获取歌单评论
export function commentPlayList(data) {
    return request({
        url: '/comment/playlist',
        method: 'post',
        params: data
    })
}
// 歌单收藏者
export function subscribers(data) {
    return request({
        url: '/playlist/subscribers',
        method: 'post',
        params: data
    })
}