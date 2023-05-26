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
          <transition name="slide-left">
            <router-view />
          </transition>
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
@backColor: #fff;
@width:1280px;

#app_index {
  position: relative;
  background: @backColor;
  border-right: @border;
  border-left: @border;
  overflow: hidden;

  .el-header {
    width: 100%;
    margin: 0px auto;
    background-color: #ccc;
    color: #333;
    border-bottom: @border;
  }

  .el-container {
    max-width: @width;
    margin: 0 auto;
  }

  .el-main {
    height: 90vh;
    min-height: 520px;
    padding: 0px 30px 30px;
  }

  .el-aside {
    border-right: @border;
    overflow: hidden;
  }

  .el-footer {
    background-color: @backColor;
    position: fixed;
    bottom: 0px;
    border-top: @border;
    z-index: 10;
  }
}
</style>
