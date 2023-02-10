<template>
  <div class="header flex">
    <div class="header-logo">
      <h1>
        <a href="#"></a>
      </h1>
    </div>
    <back />
    <!-- 返回按钮 -->
    <search />
    <!-- 搜索 -->
    <user-info></user-info>
    <!-- 账户信息 -->
  </div>
</template>

<script>
import search from './search.vue'
import back from './back.vue'
import userInfo from './userinfo.vue'
export default {
  components: { search, back, userInfo },
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  .header-logo {
    width: 180px;
    height: 60px;
    background: url(../../static/images/topbar.png) no-repeat 0 9999px;
    background-position: 0px -6px;
  }
}
</style>