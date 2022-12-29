import request from '@/utils/request'

// 获取视频分类列表
export function videoList() {
    return request({
        url: '/video/group/list'
    })
}