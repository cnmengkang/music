import request from '@/utils/request'


/* 获取mv接口
 
*/
export function videoMv(obj) {
    const area = obj.area
    const order = obj.order
    const limit = obj.limit
    const offset = obj.offset
    return request({
        url: "/mv/all",
        method: 'post',
        params: {
            area,
            order,
            limit,
            offset
        }
    })
}
