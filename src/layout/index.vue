<template>
  <div id="app_index">
    <el-header height="60px">
      <headers />
    </el-header>
    <!-- 顶部 -->
    <el-container>
      <el-aside width="200px">
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
    <el-footer class="flex" height="70px">
      <footers />
    </el-footer>
  </div>
</template>
<script>
import headers from "@/components/header";
import asideNav from "@/components/aside";
import footers from "@/components/footer/footer";

export default {
  name: "index",
  components: { headers, asideNav, footers },
  data() {
    return {

    }
  },
};
</script>
<style lang="less">
#app_index {
  width: 1100px;
  margin: 0 auto;
  background: #fff;
  height: 100vh;
  position: relative;

  .el-header {
    background-color: #b3c0d1;
    color: #333;
  }

  .el-main {
    height: 520px;
    overflow-y: overlay;
    padding: 0px 30px 30px;
  }

  .el-aside {
    border-right: 1px solid #ccc;
    overflow: hidden;
  }

  .el-footer {
    background-color: #ccc;
    position: relative;
  }
}
</style>
