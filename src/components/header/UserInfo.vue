<template>
  <div class="user_info cursor">
    <div v-if="!isLogin" class="flex" @click="getLogin">
      <el-avatar icon="el-icon-user-solid" :size="size"></el-avatar>
      <div class="el-dropdown-link ml-5 font-14">
        {{ "默认游客模式，点击扫码登录"
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </div>
    <div v-else>
      <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
        <div class="el-dropdown-avatar flex">
          <el-avatar
            icon="el-icon-user-solid"
            :size="size"
            :src="avatar"
          ></el-avatar>
          <div class="el-dropdown-link ml-5 font-14">
            {{ nickName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" ref="dropdown">
          <el-dropdown-item command="account" divided icon="el-icon-edit"
            >我的账户</el-dropdown-item
          >
          <el-dropdown-item command="revise" divided icon="el-icon-edit"
            >个人信息修改</el-dropdown-item
          >
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="qrLogin" class="login_qr_code">
      <span class="close" @click="close">X</span>
      <qr-code :close="login"></qr-code>
    </div>
  </div>
</template>
<script>
import qrCode from "@/views/login/qrCode";
import { mapState, mapMutations } from "vuex";
import { removeToken, getToken } from "@/utils/auth";
export default {
  components: { qrCode },
  data() {
    return {
      size: 35,
      login: false,
    };
  },
  mounted() {
    if (!getToken()) this.$store.dispatch("getRegisterAnonimous");
    this.$store.dispatch("getLoginStatus");
  },
  methods: {
    ...mapMutations(["CLEAR_USER_INFO", "SET_QR_LOGIN"]),
    handleCommand(command) {
      if (command == "account") {
        this.$router.push({ name: "user", params: { uid: this.uid } });
      } else if (command == "revise") {
        this.$router.push({ name: "edit", params: { uid: this.uid } });
      } else {
        removeToken();
        this.CLEAR_USER_INFO();
        this.$store.dispatch("getRegisterAnonimous");
      }
    },
    getLogin() {
      if (this.isLogin) return;
      this.SET_QR_LOGIN(true);
    },
    close() {
      this.SET_QR_LOGIN(false);
    },
  },
  computed: {
    ...mapState({
      nickName: (state) => state.nickName,
      avatar: (state) => state.avatar,
      uid: (state) => state.uid,
      isLogin: (state) => state.isLogin,
      qrLogin: (state) => state.qrLogin,
    }),
  },
};
</script>
<style lang="less">
.login_qr_code {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
