<template>
    <div id="qr">
        <el-card>
            <div class="app-qr">
                <div class="logo">
                    <img :src="this.qrCodeImg" />
                </div>
                <div id="socialLogin">
                    <el-button icon="el-icon-edit"><router-link to="/login">手机号</router-link></el-button>
                    <el-button icon="el-icon-edit" @click="getCodeOK"></el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { qrKey, qrCreate, qrCheckCode } from "@/api/user/login";
export default {
    name: "qrCode",
    data() {
        return {
            qrCodeImg: '',
            qr: {
                key: '',
                qrimg: true,
                timerstamp: new Date().getTime()
            },
        };
    },
    created() {
        this.getQrKey();
    },
    mounted() {

    },
    methods: {
        // 二维码登陆
        getQrKey() {
            qrKey().then((res) => {
                this.qr.key = res.data.unikey;
                this.getQrCreate(this.qr)
            })
        },
        // 二维码图片
        getQrCreate(key) {
            console.log("key", key)
            qrCreate(key).then((res) => {
                this.qrCodeImg = res.data.qrimg
            })
        },
        // 
        getCodeOK() {
            qrCheckCode(this.qr).then((res) => {
                console.log(res)
            })
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
  