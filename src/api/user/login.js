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
// 扫码登陆(获取key)
export function qrKey() {
    return request({
        url: '/login/qr/key',
    })
}
// 创建二维码
export function qrCreate(key) {
    return request({
        url: '/login/qr/create',
        method: 'post',
        params: key
    })
}
// 检测是否扫码成功
export function qrCheckCode(key) {
    return request({
        url: "/login/qr/check",
        method: 'post',
        params: key

    })
}



