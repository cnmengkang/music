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
@border: 1px solid #ccc;
@backColor: #fff;

#app_index {
  width: 1100px;
  margin: 50px auto;
  position: relative;
  background: @backColor;
  border-right: @border;
  border-left: @border;
  overflow: hidden;

  .el-header {
    background-color: #ccc;
    color: #333;
    border-bottom: @border;
  }

  .el-main {
    height: 520px;
    overflow-y: overlay;
    padding: 0px 30px 30px;
  }

  .el-aside {
    border-right: @border;
    overflow: hidden;
  }

  .el-footer {
    background-color: @backColor;
    position: relative;
    border-top: @border;
  }
}
</style>
