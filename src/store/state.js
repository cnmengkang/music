import { getToken, getUsername, getUserAvatar, getUserId } from '@/utils/auth'
export default {
    token: getToken(),
    player: null,
    isLogin: false,
    nickName: getUsername(),
    avatar: getUserAvatar(),
    uid: getUserId(),
}