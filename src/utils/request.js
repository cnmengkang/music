import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'
// 自定义实例
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
})

// 添加请求拦截器
request.interceptors.request.use(config => {
    // 发送前处理的程序
    console.log('config', config);
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    // config.headers['Authorization'] = getToken();
    // const isToken = (config.headers || {}).isToken === false;
    // if (getToken() & !isToken) {
    //     config.headers['Authorization'] = getToken();
    // }
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
    if (res.code != 200) {
        Message({ message: res.message, type: 'error' })
        return Promise.reject(new Error(res.message))
    } else if (res.code == 302) {
        Message({ message: '请登录后再试', type: 'error' })
    }
    else {
        return res
    }
}, err => {
    console.log('err', err)
    console.log(err)
    // 响应错误处理逻辑
    if (err.code != 200) {
        Message({ message: error.message, type: 'error' })
        return Promise.reject(new Error(error.message))
    }
    return Promise.reject(err)
})
export default request