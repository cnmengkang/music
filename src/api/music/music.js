import request from '@/utils/request';
/*
    获取音乐url
    必选参数：id,level:level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
*/
export function songUrl(data) {
    return request({
        url: '/song/url/v1',
        method: "post",
        params: data
    })
}
/*
    获取单曲详细信息
    必选参数：ids
*/
export function songDetail(ids) {
    return request({
        url: '/song/detail',
        method: "post",
        params: { ids }
    })
}
/*
    获取音乐MV URl
*/
export function musicMv(id) {
    return request({
        url: '/mv/url',
        method: "post",
        params: { id }
    })
}
/*
    获取音乐歌词
*/
export function lyric(id) {
    return request({
        url: '/lyric',
        method: "post",
        params: { id }
    })
}
// 我喜欢的音乐列表(获取喜欢列表ids)
export function likest(data) {
    return request({
        url: 'likelist',
        method: 'post',
        params: data
    })
}
// 喜欢音乐
export function like(id) {
    return request({
        url: '/like',
        method: 'post',
        params: { id }
    })
}
// 最新音乐
// 新歌速递
export function topSong(data) {
    return request({
        url: '/top/song',
        method: 'post',
        params: data
    })
}
// 获取用户歌单
export function userPlayList(data) {
    return request({
        url: '/user/playlist',
        method: 'post',
        params: data
    })
}
// 检测音乐是否可用
export function checkMusic(id) {
    return request({
        url: '/check/music',
        method: 'post',
        params: { id }
    })
}
// 说明 : 调用此接口,可获取歌单分类,包含 category 信息
export function playlistHot() {
    return request({
        url: '/playlist/hot',
        method: 'post',
    })
}
// 说明 : 调用此接口 , 可获取精品歌单
export function topPlaylistHighQuality(data) {
    return request({
        url: '/top/playlist/highquality',
        method: 'post',
        params:data
    })
}