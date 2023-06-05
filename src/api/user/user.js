import request from "@/utils/request";

// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
export function userDetail(uid) {
  return request({
    url: "/user/detail",
    method: "post",
    params: uid,
  });
}
// 说明 : 直接调用此接口, 可获取游客cookie,如果遇到其他接口未登录状态报400状态码需要验证的错误,可使用此接口获取游客cookie避免报错
export function registerAnonimous() {
  return request({
    url: "/register/anonimous",
    method: "post",
    params: { timestamp: new Date().getTime() },
  });
}
// 获取用户信息，歌单，收藏，mv,dj数量
export function userSubCount() {
  return request({
    url: "/user/subcount",
    method: "post",
  });
}
// 登录状态
export function loginStatus() {
  return request({
    url: "/login/status",
    method: "post",
    params: { timestamp: new Date().getTime() },
  });
}
// vip信息
export function vipInfo() {
  return request({
    url: "/vip/info",
    method: "post",
  });
}
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
export function userPlaylist(uid) {
  return request({
    url: "/user/playlist",
    method: "post",
    params: { uid },
  });
}
// 最近播放
export function RecordRecentSong(data) {
  return request({
    url: "/record/recent/song",
    method: "post",
    params: data,
  });
}
