import request from '@/utils/request'

// 获取歌单详情
export function detail(id) {
    return request({
        url: '/playlist/detail',
        method: 'post',
        params: id
    })
}
// 获取歌单所有歌曲
export function playTrack(data) {
    return request({
        url: '/playlist/track/all',
        method: 'post',
        params: data
    })
}