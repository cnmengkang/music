import {
  getToken,
  getUsername,
  getUserAvatar,
  getUserId,
  isLogin,
} from "@/utils/auth";
export default {
  token: getToken(),
  player: null,
  isLogin: isLogin(),
  drawer: false,
  nickName: getUsername(),
  avatar: getUserAvatar(),
  uid: getUserId(),
  playList: [],
  cloudsearch: {
    title: "",
    songCount: 0,
    searchList: [],
  },
  qrLogin: false,
};
