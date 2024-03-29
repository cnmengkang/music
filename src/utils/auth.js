// cookie.js
import { logout } from "@/api/user/login";
import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USERNAME_KEY = "nickName";
const USER_AVATAR_KEY = "userAvatar";
const USER_ID_KEY = "uid";

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(key) {
  Cookies.set(TOKEN_KEY, key);
}
export function setUsername(username) {
  Cookies.set(USERNAME_KEY, username);
}

export function getUsername() {
  return Cookies.get(USERNAME_KEY);
}

export function setUserAvatar(userAvatar) {
  Cookies.set(USER_AVATAR_KEY, userAvatar);
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

export function isLogin() {
  return Cookies.get(TOKEN_KEY) ? true : false;
}

export function removeToken() {
  const cookies = Object.keys(Cookies.get());
  cookies.forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
  logout().then((res) => {
    if (res.code == 200) {
      console.log("退出成功");
    }
  });
}
