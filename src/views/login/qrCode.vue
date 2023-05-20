<template>
    <div id="qr">
        <el-card>
            <div class="app-qr">
                <h3 style="text-align:center">{{ title || '打开网易云音乐App扫码登录！' }}</h3>
                <div class="logo">
                    <img :src="qrCodeImg" />
                </div>
                <div id="socialLogin">
                    <el-button @click="SetToken">SetCookie</el-button>
                    <el-button @click="GetToken">GetCookie</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { qrKey, qrCreate, qrCheckCode } from '@/api/user/login';
import { setCookie, getCookie } from '@/utils/auth'
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
            title: '',
            token: "MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_U=001FC82AB30792C45F70BBF8DA875F9722194967B2FF1451873C05904ACB60A59D35D95A4B89ADA074CFB9A9EF170A292A359556AD882D0CC5189D822A67E845D3D84A7C21AEA1E4A8782B1E29413D1274F9521CABB43995914427118C07AB563F95FD134E1A295D186C2A0768894710457E178D8EB33E2163050492A05EC4D348DAB823039E72A4AF2048055832BDEE9B7B0B10B8F2AD00C427E6FDE36A4186BF112CAFB4779DF951170E9D25DDE37B52013B1CF4C73D95F3F6E8DBFA58E04B2A5CE71409BD839C92EE898421770982F8504EB5BB538B19E0910C4F5A8F35A1FEE931EB650FB34D95287AA4E79F19C0C92CCEE91A1B7FBE85F9763AE822E2A720D01FF56E8E18EE1901487D5A47231BFB655D9DC2786AE35963AD654EE9CB66EACF841E68D59D8466B45236560637E84F5336766F8B84D26339299B5702F0E1B9783D41EA069B9DA50630D05C78636401C58A4DAC29AFC5D969D17C54A750BB5D000DCC979DEB1B6BC1B07D3D5C78703B9DF97754403D7996EF101FD8F04C738B6939FC73E91D1796BD7D06E2752DD723FCFE600F764FCF2707F95BD2758EBBA3926A47D55E829BEB33ADABA3BECE04F6C23D89D82A49FF37905ADA6A3D009330EE7A60F53186CC5E708191BC09858C9EB273A1D017F0EF995D700751F32308EEA2AA765B2903EC599C238A6BAFE0BFFCBE0E80E370574CEAB19F8963D3FDFBFACE824CDF0AB5C423D48064357FBD1B90; Max-Age=15552000; Expires=Thu, 16 Nov 2023 06:53:29 GMT; Path=/; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/api/clientlog; HTTPOnly;__csrf=9b7b41f7435ba2ca2dcea5a48e322ab8; Max-Age=1296010; Expires=Sun, 04 Jun 2023 06:53:39 GMT; Path=/;;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Sat, 20 May 2023 06:53:29 GMT; Path=/;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1476198914741; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1476198842848; Max-Age=2147483647; Expires=Thu, 07 Jun 2091 10:07:36 GMT; Path=/weapi/feedback; HTTPOnly"
        };
    },

    mounted() {
        this.getQrKey();
    },
    methods: {
        // 二维码登陆
        async getQrKey() {
            var res = await qrKey();
            this.qr.key = res.data.unikey;
            const res2 = await qrCreate(this.qr);
            this.qrCodeImg = res2.data.qrimg;
            // this.getCheckCode();
        },
        // 检测二维码状态
        getCheckCode() {
            const timer = setInterval(() => {
                this.qr.timerStamp = new Date().getTime();
                qrCheckCode(this.qr).then((res) => {
                    const result = res.data;
                    console.log(result)
                    if (result.code == 800) {
                        this.title = result.message
                    } else if (result.code == 801) {
                        this.title = result.message
                    } else if (result.code = 803) {
                        this.title = result.message;
                        setCookie(result.cookie);
                        clearInterval(timer)
                    }
                })
            }, 3000)
        },
        GetToken() {
            getCookie();
        },
        SetToken() {
            setCookie(this.token)
        }
    }
}
</script>
<style scope lang="less">
#qr {
    display: flex;
    align-items: center;
    justify-content: center;

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
