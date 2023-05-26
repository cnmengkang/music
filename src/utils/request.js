import axios from 'axios'
// 自定义实例
const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, //关键
    timeout: 10000,
})
// 添加请求拦截器
request.interceptors.request.use(
    (config) => {
        // 请求之前处理的逻辑
        return config;
    },
    (error) => {
        // 失败后处理程序
        console.log('error', error)
        return Promise.reject('error', error)
    })
// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // 成功之后执行的操作
        // console.log('config', response);
        return response.data;
    },
    (error) => {
        console.log('error', error)
        // 响应错误处理逻辑
    })
export default request;