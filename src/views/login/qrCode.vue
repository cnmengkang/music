<template>
  <div class="qr-code">
    <div class="app-qr">
      <h3 class="pb-15" style="text-align: center">{{ title }}</h3>
      <div class="logo">
        <img :src="qrCodeImg" />
      </div>
      <div id="socialLogin">
        <el-button @click="getLogin">点击获取二维码</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken } from "@/utils/auth";
import { qrKey, qrCreate, qrCheckCode } from "@/api/user/login";
import { mapMutations } from "vuex";
export default {
  name: "qrCode",
  data() {
    return {
      qrCodeImg: "",
      title: "打开网易云音乐App扫码登录！",
      timer: 0,
    };
  },
  mounted() {
    // this.getLogin();
  },
  methods: {
    ...mapMutations(["SET_QR_LOGIN"]),
    // 检测二维码状态
    async getQrCheckCodeStatus(key) {
      const timestamp = new Date().getTime();
      const result = await qrCheckCode({ key, timestamp });
      return result;
    },
    // login
    async getLogin() {
      const timestamp = new Date().getTime();
      const res = await qrKey(timestamp);
      const key = res.data.unikey;
      const create = await qrCreate({ key, timestamp, qrimg: true });
      this.qrCodeImg = create.data.qrimg;
      this.timer = setInterval(async () => {
        const statusRes = await this.getQrCheckCodeStatus(key);
        console.log(statusRes);
        if (statusRes.code == 801) {
          this.title = statusRes.message;
        }
        if (statusRes.code == 800) {
          this.title = statusRes.message;
          clearInterval(this.timer);
        }
        if (statusRes.code == 803) {
          this.title = statusRes.message;
          clearInterval(this.timer);
          this.$store.dispatch("getLoginStatus");
          setToken(statusRes.cookie);
          this.SET_QR_LOGIN(false);
        }
      }, 1000);
    },
  },
};
</script>
<style scope lang="less">
.qr-code {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .app-qr {
    width: 250px;
    height: 300px;

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
