import { login } from '@/api/user/login';
import { userDetail } from "@/api/user/user"
import { getToken, setToken } from '@/utils/auth'



const user = {
    state: {
        token: getToken(),
        phone: '',
        password: '',
        uid: 345288322, //用户id
        avatarUrl: '',  //头像
        playlist: '',
        musicInfo: '', //保存当前播放音乐信息
        musicUrl: '', //音乐url
        musicLevel: '', //音乐音质
        musicMd5: '', //音乐加密
        musicType: '', //音乐类型

    },

    getters: {
        getPlayList(state) {
            return state.playlist
        }
    },
    mutations: {
        // token
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        // 用户名字
        SET_NAME: (state, name) => {
            state.nickname = name
        },
        // 头像avatarUrl
        SET_AVATAR: (state, avatar) => {
            state.avatarUrl = avatar
        },
        // 
        // PLAY_LIST: (state, data) => {
        //     state.playlist = data
        // },
        // 存储播放音乐信息
        MUSIC_INFO: (state, musicInfo) => {
            state.musicUrl = musicInfo.url
            state.musicType = musicInfo.encodeType
            state.musicMd5 = musicInfo.md5
            state.musicLevel = musicInfo.level
        }
    },
    actions: {
        // 登录
        Login({ commit }, accountInfo) {
            const phone = accountInfo.phone;
            const password = accountInfo.password;
            return new Promise((resolve, reject) => {
                login(phone, password).then((res) => {
                    console.log(res)
                    this.id = res.profile.userId;
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        // 获取用户信息
        getUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                userDetail(state.uid).then((res) => {
                    console.log(res)
                    resolve()
                }).catch(err => {
                    reject(err)
                })

            })
        },

    }
}
export default user