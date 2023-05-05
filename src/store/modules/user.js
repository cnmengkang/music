import { login } from '@/api/user/login';
import { loginStatus } from "@/api/user/user"
import { getToken, setToken, setUserInfo } from '@/utils/auth'

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
                    const result = res.data.data;
                    if (result.code != 200) return;
                    commit('SETS_USER_INFO', result.profile)
                    console.log(setUserInfo('setUserInfo'))
                    console.log('Login success')
                    resolve();
                })
            })
        },
    }
}
export default user