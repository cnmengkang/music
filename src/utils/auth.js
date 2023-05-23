import Cookies from "js-cookie";
import { doLogout } from '@/api/user/login'

const TokenKey = 'cookie';
// 获取token
export function getCookie() {
    return Cookies.get(TokenKey);
}
// 设置token
export function setCookie(string) {
    const regex = /MUSIC_U=(\w+)/;
    const token = string.match(regex)[0].split('=')[1];
    Cookies.set(TokenKey, token)
}
// 删除token
export function removeCookie(key) {
    Cookies.remove(key);
}
// 判断是否登录
export function isLogin() {
    return getCookie(TokenKey);
}
export function TdoLogout() {
    doLogout().then(res => {
        console.log(res)
    })
}