import request from "@/utils/request";

//获取mv的详情
export function mvDetail(mvid) {
  return request({
    url: "/mv/detail",
    method: "post",
    params: { mvid },
  });
}
// 获取mv的播放地址
export function mvUrl(id) {
  return request({
    url: "/mv/url",
    method: "post",
    params: id,
  });
}
// video================================
// 获取视频标签列表
export function videoGroupList() {
  return request({
    url: "/video/group/list",
  });
}
// 获取视频分类列表
export function videoCategoryList() {
  return request({
    url: "/video/category/list",
    method: "get",
  });
}
// 获取视频标签/分类下的视频
export function videoGroup(data) {
  return request({
    url: "/video/group",
    method: "post",
    params: data,
  });
}
// 获取视频播放url
export function videoUrl(id) {
  return request({
    url: "/video/url",
    method: "post",
    params: { id },
  });
}
// 获取全部视频列表
export function videoAll(offset) {
  return request({
    url: "/video/timeline/all",
    method: "post",
    params: { offset },
  });
}
// 说明 : 调用此接口 , 可获取视频详情
export function videoDetail(id) {
  return request({
    url: "/video/detail",
    method: "post",
    params: { id },
  });
}
// 说明 : 调用此接口 , 可获取相关视频
export function relatedAllVideo(id) {
  return request({
    url: "/related/allvideo",
    method: "post",
    params: { id },
  });
}
