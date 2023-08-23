import request from "@/utils/request";

// 获取所有评论
export function commentPlayList(data) {
  let id = data.id;
  let limit = data.limit;
  let offset = data.offset;
  let timestamp = new Date().getTime();
  return request({
    url: "/comment/playlist",
    method: "post",
    params: {
      timestamp,
      id,
      limit,
      offset,
    },
  });
}

// 说明 : 调用此接口,可发送评论或者删除评论
// 必选参数

// t:1 发送, 2 回复

// type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型

// 0: 歌曲

// 1: mv

// 2: 歌单

// 3: 专辑

// 4: 电台

// 5: 视频

// 6: 动态
// id:对应资源 id

// content :要发送的内容

export function comment(obj) {
  let t = obj.t;
  let type = obj.type;
  let content = obj.content;
  let commentId = obj.commentId;
  let id = obj.id;
  let timestamp = new Date().getTime();
  return request({
    url: "/comment",
    method: "post",
    params: {
      t,
      type,
      id,
      content,
      commentId,
      timestamp,
    },
  });
}
// 发布/删除评论
// cid : 评论 id

// t : 是否点赞 , 1 为点赞 ,0 为取消点赞

// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型

// 0: 歌曲

// 1: mv

// 2: 歌单

// 3: 专辑

// 4: 电台节目

// 5: 视频

// 6: 动态

// 7: 电台
export function commentLike(obj) {
  console.log(obj)
  let id = obj.id;
  let t = obj.t;
  let type = obj.type;
  let cid = obj.cid;
  let timestamp = new Date().getTime();
  return request({
    url: "/comment/like",
    method: "post",
    params: {
      id,
      cid,
      t,
      type,
      timestamp,
    },
  });
}

// 获取视频评论 /comment/video
export function commentVideo(data) {
  let id = data.id;
  let limit = data.limit;
  let offset = data.offset;
  let timestamp = new Date().getTime();
  return request({
    url: "/comment/video",
    method: "post",
    params: {
      timestamp,
      id,
      limit,
      offset,
    },
  });
}
