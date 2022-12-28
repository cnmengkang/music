import axios from 'axios'
import { Message } from 'element-ui'
// 自定义实例
const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, //关键
    timeout: 3000,
})
// 添加请求拦截器
request.interceptors.request.use(config => {
    // 发送前处理的程序
    // console.log('config', config)
    return config
}, err => {
    // 失败后处理程序
    return Promise.reject('config', err)
})
// 响应拦截器
request.interceptors.response.use(response => {
    // 成功之后执行的操作
    console.log('res', response)
    const res = response.data;
    if (res.code !== 200) {
        Message({ message: res.message, type: 'error' })
    } else if (res.code == 803) {
        Message({ message: res.message, type: 'success' })
    } else if (res.code == 800) {
        Message({ message: res.message, type: 'warning' })
    }
    else {
        return res
    }
}, err => {
    console.log('响应拦截器错误err', err)
    const error = err.response.data;
    // 响应错误处理逻辑
    if (error.code != 200) {
        Message({ message: error.message, type: 'error' })
    }
    return Promise.reject(err)
})
export default request