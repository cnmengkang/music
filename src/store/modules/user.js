import { login } from '@/api/user/login';
import { loginStatus } from "@/api/user/user"
import { getToken, setToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        phone: '',
        password: '',
        uid: '', //用户id
        userInfo: ''
    },
    getters: {
        
    },
    mutations: {
        // token
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER_STATUS(state, loginStatus) {
            state.userInfo = loginStatus;
        },
        SET_UID(state, uid) {
            state.uid = uid
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
                })
            })
        },
        // 登录状态
        LoginStatus({ commit, state }) {
            return new Promise((resolve, reject) => {
                loginStatus().then((res) => {
                    const result = res.data;
                    console.log('result', result)
                    if (result.data.code != 200) return;
                    const uid = localStorage.setItem('uid', result.data.account.id);
                    commit('SET_UID', uid)
                    resolve();
                })
            })
        },
    }
}
export default user