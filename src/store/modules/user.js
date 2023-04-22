import { login } from '@/api/user/login';
import { loginStatus } from "@/api/user/user"
import { getToken, setToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        phone: '',
        password: '',
        userName: '',
        userAvatar: '',
        userId: ''
    },
    getters: {

    },
    mutations: {
        SETS_USER_INFO: (state, userInfo) => {
            console.log(userInfo)
            state.userId = userInfo.userId
            state.userName = userInfo.nickname
            state.userAvatar = userInfo.avatarUrl
        },
        SET_ACCOUNT: (state, account) => {
            state.phone = account.phone
            state.password = account.password
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
                    resolve()
                })
            })
        },
        // 登录状态
        LoginStatus({ commit, state }) {
            return new Promise((resolve, reject) => {
                loginStatus().then((res) => {
                    console.log(res)
                    const result = res.data.data;
                    console.log('result', result)
                    commit('SETS_USER_INFO', result.profile)
                    if (result.code != 200) return;
                    console.log('Login success')
                    resolve();
                })
            })
        },
    }
}
export default user