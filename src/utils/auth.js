// cookie.js
import { logout } from '@/api/user/user'
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const USER_AVATAR_KEY = 'useravatar';
const USER_ID_KEY = 'userId';

export function setToken(string) {
    const regex = /MUSIC_U=(\w+)/;
    const token = string.match(regex)[0].split('=')[1];
    Cookies.set(TOKEN_KEY, token);
}

export function getToken() {
    return Cookies.get(TOKEN_KEY);
}

export function setUsername(username) {
    Cookies.set(USERNAME_KEY, username);
}

export function getUsername() {
    return Cookies.get(USERNAME_KEY);
}

export function setUserAvatar(avatar) {
    Cookies.set(USER_AVATAR_KEY, avatar);
}

export function getUserAvatar() {
    return Cookies.get(USER_AVATAR_KEY);
}

export function setUserId(userId) {
    Cookies.set(USER_ID_KEY, userId);
}

export function getUserId() {
    return Cookies.get(USER_ID_KEY);
}
export function removeToken() {
    const cookies = Object.keys(Cookies.get());
    console.log(cookies)
    cookies.forEach(cookieName => {
        Cookies.remove(cookieName);
    });
}
