<template>
  <div id="app_index">
    <el-header height="60px">
      <headers />
    </el-header>
    <!-- 顶部 -->
    <el-container class="mt-30">
      <el-aside width="280px" class="mr-15">
        <asideNav />
      </el-aside>
      <!-- 左侧菜单 -->
      <el-container>
        <el-main class="backTop">
          <router-view />
          <el-backtop target=".backTop" :bottom="120"></el-backtop>
        </el-main>
      </el-container>
      <!-- 容器 -->
    </el-container>
    <!-- 底部 -->
    <transition name="el-zoom-in-bottom">
      <el-footer class="flex" height="70px" v-if="isFooterShow">
        <footers />
      </el-footer>
    </transition>
  </div>
</template>
<script>
import headers from "@/components/header";
import asideNav from "@/components/aside";
import footers from "@/views/footer/footer";
import { mapState } from 'vuex';
export default {
  name: "index",
  components: { headers, asideNav, footers },
  computed: {
    ...mapState({
      isFooterShow: state => state.player.isFooterShow,
    }),
  }
};
</script>
<style lang="less">
@border: 1px solid #d78383;
@backColor: #ffffffe0;
@width: 1280px;

#app_index {
  position: relative;
  background: @backColor;
  overflow: hidden;

  .el-header {
    width: 100%;
    min-width: 960px;
    margin: 0px auto;
    background-color: pink;
    color: #333;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    position: sticky;
    top: 0px;
  }

  .el-container {
    max-width: @width;
    margin: 0 auto;
  }

  .el-main {
    height: 90vh;
    min-height: 520px;
    padding: 0px;
  }

  .el-aside {
    overflow: hidden;
  }

  .el-footer {
    background-color: @backColor;
    position: fixed;
    bottom: 0px;
    border-top: @border;
    z-index: 10;
    backdrop-filter: blur(10px);
  }
}
</style>
