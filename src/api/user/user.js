import request from '@/utils/request'

// 获取用户详情
export function userDetail(uid) {
    return request({
        url: '/user/detail',
        method: 'post',
        data: { uid }
    })
}
// 获取用户信息，歌单，收藏，mv,dj数量
export function userSubCount() {
    return request({
        url: "/user/subcount",
        method: 'post',
    })
}
// 我的喜欢音乐列表
export function likeList(uid) {
    return request({
        url: "/likelist",
        method: 'post',
        params: uid
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