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
/*
    获取音乐MV URl
*/ 
export function musicMv(id) {
    return request({
        url: '/mv/url',
        method: "post",
        params: {id}
    })
}