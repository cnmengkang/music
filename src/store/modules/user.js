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

    },

    getters: {

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