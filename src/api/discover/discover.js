import request from "@/utils/request";
// 主页banner
export function banner() {
  return request({
    url: "/banner",
    method: "post",
  });
}
// 获取每日推荐歌单(需要登陆用)
export function recommendResource(data) {
  return request({
    url: "/recommend/resource",
    method: "post",
    params: data,
  });
}
// 没登陆推荐歌单
export function personalized(data) {
  return request({
    url: "/personalized",
    params: data,
  });
}
// 获取每日推荐歌曲
export function daySongs() {
  return request({
    url: "/recommend/songs",
    methods: "post",
  });
}
// 歌单
export function topPlaylist(data) {
  return request({
    url: "/top/playlist",
    methods: "post",
    params: data,
  });
}
