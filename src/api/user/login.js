import request from "@/utils/request";
// 登录方法
export function login(phone, password) {
    // 手机登录
    const data = { phone, password }
    return request({
        url: '/login/cellphone',
        method: 'post',
        data: data
    })
}
// 验证码登录
// 发送手机号获取验证码
export function getCaptcha(data) {
    console.log(data)
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
    request({
        url: "/cellphone/existence/check",
        method: "post",
        data: data,
        headers:{isToken}
    })
}
// 推出登录
export function logout() {
    request({
        url: '/logout',
        method: "post"
    })
}

