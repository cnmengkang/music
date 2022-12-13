<template>
  <div id="app_index">
    <el-header>
      <navBar />
    </el-header>
    <!-- 顶部 -->
    <el-container>
      <el-aside>
        <asideNav />
      </el-aside>
      <!-- 左侧菜单 -->
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <!-- 容器 -->
    </el-container>
    <!-- 底部 -->
    <el-footer>
      <footers />
    </el-footer>
  </div>
</template>
<script>
import navBar from "@/components/header/navbar.vue";
import asideNav from "@/components/aside";
import footers from "@/components/footer/footer.vue";
export default {
  name: "index",
  components: { navBar, asideNav, footers },
};
</script>
<style lang="less">
#app_index {
  width: 1280px;
  margin: 0 auto;
  background: #fff;
  height: 100vh;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    color: rgb(209, 193, 193);
    text-align: center;
    max-height: 520px;
    overflow-y: scroll;

    .el-aside {
      color: #333;
      text-align: left;
    }
  }
  .el-footer {
    height: 75px;
    background-color: #ccc;
  }
}
</style>
