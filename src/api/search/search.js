import request from '@/utils/request';

// 说明 : 调用此接口 , 可获取默认搜索关键词
export function search_default() {
    return request({
        url: '/search/default'
    })
}
// 说明 : 调用此接口,可获取热门搜索列表
export function search_hot_detail() {
    return request({
        url: '/search/hot/detail'
    })
}
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
export function search_multiple_match(keywords) {
    return request({
        url: '/search/multimatch',
        method: 'post',
        params: { keywords }
    })
}
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
export function search_suggest(keywords) {
    return request({
        url: '/search/suggest',
        method: 'post',
        params: { keywords }
    })
}
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 ,
//  关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
export function cloudsearch(data) {
    return request({
        url: 'cloudsearch',
        method: 'post',
        params: data
    })
}
