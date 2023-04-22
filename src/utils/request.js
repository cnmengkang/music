import axios from 'axios'
import { Message } from 'element-ui'
// 自定义实例
const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, //关键
    timeout: 5000,
})
// 添加请求拦截器
request.interceptors.request.use(config => {
    // 发送前处理的程序
    return config
}, err => {
    // 失败后处理程序
    Message.error({ type: 'error', message: '请求超时！' })
    return Promise.reject('config', err)
})
// 响应拦截器
request.interceptors.response.use(response => {
    // 成功之后执行的操作
    // console.log('res', response)
    const res = response.data;
    if (res.code == 200) return res;
    if (res.code != 200) {
        if (res.code == 302) {
            Message({ type: 'error', message: '未登录！' })
        }
        return response;
    }
}, err => {
    const error = err.response.data;
    console.log('响应拦截器错误err', error)
    // 响应错误处理逻辑
    if (error.code != 200) {
        Message({ message: error.message, type: 'error' })
    } else if (error.code == '-462') {
        console.log('462')
        Message({ message: '需要验证！', type: 'error' })
    }else{
        console.log('error错误')
    }
})
export default request