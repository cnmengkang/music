<template>
  <div id="register">
    <el-card>
      <div class="app-register">
        <router-link class="back" to="/login">&#x3c;&nbsp;返回登录</router-link>
        <div class="register">
          <!-- <h4>注册网易云音乐账号</h4> -->
          <el-form :model="registerForm" status-icon v-loading="loading" ref="ruleForm" :rules="registerRules"
            class="demo-ruleForm">
            <!-- 注册手机号密码 -->
            <div class="register-phone" v-if="flag">
              <el-form-item label="手机号" prop="phone" class="mb-15">
                <el-input type="phone" v-model.trim="registerForm.phone" prefix-icon="el-icon-mobile-phone"
                  autocomplete="off" placeholder="请输入手机号" maxlength="11" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" class="mb-15">
                <el-input type="password" show-password v-model="registerForm.password" autocomplete="off"
                  prefix-icon="el-icon-lock" maxlength="18" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="mt-0" type="primary" @click="registerCaptcha">注册</el-button>
              </el-form-item>
            </div>
            <!-- 验证码校验+判断手机号是否已经注册 -->
            <div class="register-captcha" v-else>
              <h4 class="captcha-title">
                为了安全，我们会向你的手机号发送短信校验码
              </h4>
              <el-form-item prop="captcha">
                <el-input type="captcha" v-model.trim="registerForm.captcha" autocomplete="off" placeholder="请输入验证码"
                  prefix-icon="el-icon-key">
                  <el-button slot="append" @click="registerCaptcha">重新发送</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="mt-15" type="primary" @click="registerVerify">下一步</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <!-- 其它方式登录 -->
        <div class="login-oth">
          <p>其他方式登录</p>
        </div>
        <div id="socialLogin">
          <router-link to="/qrCode">
            <el-button icon="el-icon-edit">扫码登陆</el-button>
          </router-link>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getCaptcha, CheckVerify, CheckPhone } from "@/api/user/login";
import { validateTel, validatePass } from "@/utils/validate";
export default {
  name: "register",
  data() {
    return {
      // 登录账号密码
      registerForm: {
        phone: "",
        password: "",
        captcha: "",
        nickname: "",
      },
      flag: true,
      disabled: true,
      // 手机号，密码
      registerRules: {
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
            message: "密码6-18位，必须由数字字母组成",
            trigger: "change",
          },
          {
            validator: validatePass,
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
    };
  },
  methods: {
    /*注册逻辑
      1.输入手机号设置密码校验?正确2:错误 1
      2.获取手机号验证码，校验验证码?正确3:错误 2
      3.判断验证码是否正确 正确?4:错误
      4.检测手机号码是否存在 存在就去登录，不存在继续注册
    */
    // 1
    registerCaptcha() {
      this.$refs.ruleForm.validateField("phone", (valid) => {
        if (valid) return;
        getCaptcha(this.registerForm).then((res) => {
          console.log(res);
          if (res.code != 200) return;
          this.flag = false;
          // this.$refs.ruleForm.clearValidate("captcha");
        });
      });
    },
    // 判断验证码是否正确
    registerVerify() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        CheckVerify(this.registerForm).then((res) => {
          console.log(res);
          if (res.code != 200) return;
          this.chVerifyPhone();
        });
      });
    },
    // 检测手机号码是否注册
    chVerifyPhone() {
      CheckPhone(this.registerForm).then((res) => {
        console.log(res);
        if (res.code != 200) {
          console.log("没有登录去注册");
        } else {
          console.log("已经存在,去登陆");
          this.router.push("/");
        }
      });
    },
    // test
    aa() {
      console.log("qq");
    },
  },
};
</script>
<style scope lang="less">
#register {
  width: 100%;
  height: 100vh;
  /* background: url(../../static/images/wallhaven-lol.png) no-repeat 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;

  .app-register {
    h2 {
      text-align: center;
    }

    .back {
      font-size: 12px;
      text-decoration: none;
      color: #606060;
    }

    .register-captcha {
      .register_img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 0 auto;
        background: #ffc0cb42;
      }

      .mt-15 {
        margin-top: 15px;
      }

      img {
        width: 100%;
      }

      .captcha-title {
        font-size: 12px;
        color: #606060;
        padding: 15px 0px;
      }
    }

    .register-phone {
      .el-button {
        margin-top: 15px;
      }
    }

    .register {
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
  }
}
</style>
