import request from '@/utils/request';
export function songUrl(id) {
    return request({
        url: '/song/url',
        method: "post",
        params: {id}
    })
}