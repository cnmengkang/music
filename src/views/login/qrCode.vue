<template>
    <div id="qr">
        <el-card>
            <div class="app-qr">
                <h3 style="text-align:center">{{ title || '请使用网易手机版扫码登录！' }}</h3>
                <div class="logo">
                    <img :src="qrCodeImg" />
                </div>
                <div id="socialLogin">
                    <el-button icon="el-icon-edit"><router-link to="/login">手机号</router-link></el-button>
                    <el-button icon="el-icon-edit" @click="getLogin">11</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { qrKey, qrCreate, qrCheckCode } from "@/api/user/login";
import { setCookies } from '@/utils/auth'

export default {
    name: "qrCode",
    data() {
        return {
            qrCodeImg: '',
            qr: {
                key: '',
                qrimg: true,
                timerStamp: null,
            },
            timer: 10,
            title: ''
        };
    },
    created() {
        this.getQrKey();
    },
    methods: {
        // 二维码登陆
        async getQrKey() {
            var res = await qrKey();
            this.qr.key = res.data.unikey
            const res2 = await qrCreate(this.qr);
            this.qrCodeImg = res2.data.qrimg
            this.getCheckCode()
        },
        // 检测二维码状态
        getCheckCode() {
            const timer = setInterval(() => {
                this.qr.timerStamp = new Date().getTime();
                qrCheckCode(this.qr).then((res) => {
                    const result = res.data;
                    console.log(result)
                    if (result.code == 803) {
                        clearInterval(timer)
                        setCookies(result.cookie)
                        this.getLogin()
                        this.$router.push('/')
                    } else if (result.code == 800) {
                        // 二维码过期
                        this.title = result.message
                        clearInterval(timer)
                    } else if (result.code = 801) {
                        this.title = result.message
                    }
                })
            }, 3000)
        },
        getLogin() {
            this.$store.dispatch('LoginStatus');
            console.log('调用状态成功')
        }
    },
}
</script>
<style scope lang="less">
#qr {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;

    .app-qr {
        .login-oth {
            margin-bottom: 15px;
        }

        .login-oth,
        #socialLogin {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
        }

        #socialLogin a {
            text-decoration: none;
        }

        .login-oth p {
            text-align: center;
            font-size: 12px;
            margin: 0px 15px;
            width: 100%;
        }

        .login-oth::after,
        .login-oth::before {
            content: " ";
            height: 1px;
            width: 100%;
            display: inline-block;
            background: #ebebeb;
        }
    }
}
</style>
