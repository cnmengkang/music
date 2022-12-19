import request from '@/utils/request'

export function topList() {
    return request({
        url: "toplist",
        method: 'get'
    })
}