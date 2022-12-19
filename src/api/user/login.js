import request from "@/utils/request";
// 登录方法
export function login(phone, password) {
    // 手机号+密码登录
    const data = { phone, password }
    return request({
        url: '/login/cellphone',
        method: 'post',
        data: data
    })
}
// 发送手机号获取验证码
export function getCaptcha(data) {
    return request({
        url: '/captcha/sent',
        method: 'post',
        data: data
    })
}
// 校验验证码
export function CheckVerify(data) {
    return request({
        url: "/captcha/verify",
        method: "post",
        data: data

    })
}
// 检测手机号是否注册
export function CheckPhone(data) {
    return request({
        url: "/cellphone/existence/check",
        method: "post",
        data: data,
    })
}



