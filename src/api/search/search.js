import request from '@/utils/request'


// 默认搜索关键词
export function searchDefault() {
    return request({
        url: '/search/default'
    })
}
// 搜索列表预览详细
export function searchHot() {
    return request({
        url: '/search/hot/detail'
    })
}
// 多重匹配
export function searchMultiMatch(keywords) {
    return request({
        url: '/search/multimatch',
        method: 'post',
        params: {keywords}
    })
}
// 搜索建议
export function searchSuggest(keywords) {
    return request({
        url: '/search/suggest',
        method: 'post',
        params: {keywords}
    })
}
// 搜索建议
export function searchList(keywords) {
    return request({
        url: '/cloudsearch',
        method: 'post',
        params: {keywords}
    })
}
