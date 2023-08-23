import request from "@/utils/request";
// 获取所有歌单
export function playlistDetail(id) {
  return request({
    url: "/playlist/detail",
    method: "post",
    params: id,
  });
}
// 歌单收藏者
export function subscribers(data) {
  return request({
    url: "/playlist/subscribers",
    method: "post",
    params: data,
  });
}
