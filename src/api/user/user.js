import request from '@/utils/request'

// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
export function userDetail(uid) {
    return request({
        url: '/user/detail',
        method: 'post',
        params: uid
    })
}
// 获取用户信息，歌单，收藏，mv,dj数量
export function userSubCount() {
    return request({
        url: "/user/subcount",
        method: 'post',
    })
}
// 登录状态
export function loginStatus() {
    return request({
        url: '/login/status',
        method: 'post',
    })
}
// 退出登录
export function logout() {
    return request({
        url: "/logout",
        method: 'post'
    })
}
// vip信息
export function vipInfo() {
    return request({
        url: "/vip/info",
        method: 'post'
    })
}
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
export function userPlaylist(uid) {
    return request({
        url: "/user/playlist",
        method: 'post',
        params: uid
    })
}
// 最近播放
export function RecordRecentSong(data) {
    return request({
        url: '/record/recent/song',
        method: 'post',
        params: data
    })
}