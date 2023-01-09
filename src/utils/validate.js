// 正则表单配置学习
// 手机号校验
export function validateTel(rule, value, callback) {
    const reg = /^1[3456789]\d{9}$/;
    if (!value) {
        return callback();
    }
    if (!reg.test(value)) {
        callback(new Error('请输入符合规范的手机号码'))
    } else {
        callback()
    }
}
// 密码校验
export function validatePass(rule, value, callback) {
    const reg = /^(?=.*\d)(?=.*[a-zA-Z0-9])\w{5,17}$/;
    if (!value) {
        return callback();
    }
    if (!reg.test(value)) {
        callback(new Error('密码必须包含数字字母'))
    } else {
        callback()
    }
}