<template>
  <el-container id="app_index">
    <el-header :class="{ transparent: drawer }">
      <headers />
    </el-header>
    <!-- 顶部 -->
    <el-container style="margin: 20px auto;">
      <el-aside class="mr-15">
        <asideNav />
      </el-aside>
      <!-- 左侧菜单 -->
      <el-main class="backTop">
        <router-view />
        <el-backtop target=".backTop" :bottom="120"></el-backtop>
      </el-main>
      <!-- 容器 -->
    </el-container>
    <!-- 底部 -->
    <transition name="el-zoom-in-bottom">
      <el-footer class="flex" v-if="isFooterShow">
        <footers />
      </el-footer>
    </transition>
  </el-container>
</template>
<script>
import headers from "@/components/header";
import asideNav from "@/components/aside";
import footers from "@/views/footer/footer";
import { mapState } from "vuex";
export default {
  name: "index",
  components: { headers, asideNav, footers },
  computed: {
    ...mapState({
      isFooterShow: (state) => state.player.isFooterShow,
      drawer: (state) => state.drawer,
    }),
  },
};
</script>
<style lang="less">
@border: 1px solid #ccc;
@backColor: #ffffffe0;
@max-width: 1140px;
@left-width: 210px;

#app_index {
  position: relative;

  .el-header {
    width: 100%;
    min-width: 960px;
    margin: 0px auto;
    background-color: #fff;
    color: #333;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0px;
    z-index: 100;

    .header {
      width: @max-width;
      .header-logo{
        width: @left-width;
      }
    }
  }

  .el-aside {
    overflow: unset;
    position: sticky;
    top: 0px;
    width: @left-width !important;
  }

  .transparent {
    background-color: transparent;
    z-index: 999;
    box-shadow: none;
  }

  .el-container {
    max-width: @max-width;
    margin: 0 auto;
    overflow: auto;
    height: 90vh;
    width: 100%;
  }

  .el-main {
    padding: 0px;
  }

  .el-footer {
    padding: 0px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background-color: #fff;
    z-index: 98;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
  }
}
</style>
