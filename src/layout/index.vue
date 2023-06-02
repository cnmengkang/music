<template>
  <div id="app_index">
    <el-header>
      <headers />
    </el-header>
    <!-- 顶部 -->
    <el-container class="mt-30">
      <el-aside width="270px">
        <asideNav />
      </el-aside>

      <!-- 左侧菜单 -->
      <el-container>
        <el-main class="backTop ml-15">
          <router-view />
          <el-backtop target=".backTop" :bottom="120"></el-backtop>
        </el-main>
      </el-container>
      <!-- 容器 -->
    </el-container>
    <!-- 底部 -->
    <transition name="el-zoom-in-bottom">
      <el-footer class="flex" v-if="isFooterShow">
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
@border: 1px solid #ccc;
@backColor: #ffffffe0;
@width: 1140px;

#app_index {
  position: relative;
  background: @backColor;
  overflow: hidden;

  .el-header {
    width: 100%;
    min-width: 960px;
    margin: 0px auto;
    background-color: #fff;
    color: #333;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    position: sticky;
    top: 0px;
    z-index: 99;
  }

  .el-container {
    max-width: @width;
    margin: 0px auto 25px;
    overflow: auto;
    height: 100vh;
  }

  .el-main {
    padding: 0px;
  }

  .el-footer {
    padding: 0px;
  }
}
</style>
