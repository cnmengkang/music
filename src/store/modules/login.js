import { qrKey, qrCreate, qrCheckCode } from '@/api/user/login';
import { getCookie } from "@/utils/auth"

const login = {
    state: {
        token: getCookie(),
    },
    mutations: {

    },
    actions: {

    }
}
export default login;