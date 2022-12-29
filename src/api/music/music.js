import request from '@/utils/request';
/*
    获取音乐url
*/ 
export function songUrl(id) {
    return request({
        url: '/song/url',
        method: "post",
        params: {id}
    })
}