<template>
  <div id="login">
    <el-card>
      <div class="app-login">
        <div class="logo">
          <img :src="this.qrCodeImg" />

        </div>
        <div class="login login-phone" v-if="flag">
          <el-form :model="loginForm" status-icon v-loading="loading" ref="ruleForm" :rules="loginRules"
            class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
              <el-input type="phone" v-model.trim="loginForm.phone" prefix-icon="el-icon-mobile-phone"
                autocomplete="off" placeholder="请输入手机号" maxlength="11" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" show-password v-model="loginForm.password" autocomplete="off"
                prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <!-- 切换登陆方式 -->
            <span @click="flag = false" class="sw captcha">验证码登录</span>
            <el-form-item>
              <el-button type="primary" @click="loginPhone('ruleForm')">登录</el-button>
              <el-button class="register link-type" type="text"><router-link to="/register">注册</router-link></el-button>
            </el-form-item>
            <!-- 手机号+密码登录 -->
          </el-form>
        </div>
        <div class="login login-captcha" v-else>
          <el-form :model="loginForm" status-icon v-loading="loading" ref="ruleForm" :rules="loginRules"
            class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
              <el-input type="phone" v-model="loginForm.phone" autocomplete="off" prefix-icon="el-icon-mobile-phone"
                placeholder="请输入手机号" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-input type="captcha" v-model="loginForm.captcha" autocomplete="off" placeholder="请输入验证码"
                prefix-icon="el-icon-key" maxlength="4">
                <el-button slot="append" @click="getCode">验证码</el-button>
              </el-input>
            </el-form-item>
            <!-- 切换登陆方式 -->
            <span @click="flag = true" class="sw phone">密码登录</span>
            <el-form-item>
              <el-button type="primary" @click="getVerification">登录</el-button>
              <el-button class="register link-type" type="text"><router-link to="/register">注册</router-link></el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 手机号验证码登录 -->
        <!-- 其它方式登录 -->
        <div class="login-oth">
          <p>其他方式登录</p>
        </div>
        <div id="socialLogin">
          <el-button icon="el-icon-edit" @click="getQrKey">扫码登陆</el-button>
          <el-button icon="el-icon-edit" @click="getCodeOK">QQ</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { validateTel } from "@/utils/validate";
import { getCaptcha, CheckVerify, qrKey, qrCreate, qrCheckCode } from "@/api/user/login";
export default {
  name: "login",
  data() {
    return {
      // 登录账号密码
      loginForm: {
        phone: "19826599519",
        password: "mengkang21",
        captcha: "",
      },
      flag: true,
      // 手机号，密码
      loginRules: {
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change",
          },
          {
            validator: validateTel,
          },
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 18,
            message: "密码8-20位，至少包含/数字/字符2种组合",
            trigger: "change",
          },
        ],
        captcha: [
          {
            required: true,
            message: "验证码为空或错误",
            trigger: "change",
          },
        ],
      },
      loading: false,
      qrCodeImg: '',
      qr: {
        key: '',
        qrimg: true,
        timerstamp: new Date().getTime()
      },
    };
  },
  methods: {
    // 账号密码登录
    loginPhone() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        this.$store.dispatch("Login", this.loginForm).then(() => {
          this.$router.push('/')
        });
      });
    },
    // 获取验证码
    getCode() {
      this.$refs.ruleForm.validateField("phone", (errorValid) => {
        if (errorValid) return;
        getCaptcha(this.loginForm).then((res) => {
          if (res.code != 200) return;
          console.log("执行倒计时操作");
        });
      });
    },
    // 判断验证码是否正确
    getVerification() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        CheckVerify(this.loginForm).then((res) => {
          console.log("res", res);
          if (res.code != 200) return;
          this.$router.push({ path: "/" });
        });
      });
    },
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
      console.log(this.qr)
      qrCheckCode(this.qr).then((res) => {
        console.log(res)
      })
    }
  },
};
</script>
<style scope lang="less">
#login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;

  .app-login {
    h2 {
      text-align: center;
    }

    .login {
      h4 {
        text-align: center;
      }

      .el-button {
        width: 100%;
      }
    }

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

    .sw {
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
      padding: 10px 0px;
    }

    .register {
      margin-left: 0px;

      span a {
        color: #000 !important;
        border-bottom: 2px solid #000;
      }
    }
  }
}

#login {
  .app-login {
    background: #fff;
    width: 300px;
    height: 410px;
    border-radius: 4px;

    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
