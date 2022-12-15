<template>
  <div id="navTabs-index">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="recommend">个性推荐</el-tab-pane>
      <el-tab-pane label="专属定制" name="custom-made">专属定制</el-tab-pane>
      <el-tab-pane label="歌单" name="playlist">歌单</el-tab-pane>
      <el-tab-pane label="排行榜" name="top-list">排行榜</el-tab-pane>
      <el-tab-pane label="最新音乐" name="new-music">最新音乐</el-tab-pane>
    </el-tabs> -->

    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      :default-active="$route.path"
      @select="handleSelect"
    >
      <el-menu-item index="/discover">个性推荐</el-menu-item>
      <el-menu-item index="/discover/custom-made">专属定制</el-menu-item>
      <el-menu-item index="3">歌单</el-menu-item>
      <el-menu-item index="4">排行榜</el-menu-item>
      <el-menu-item index="5">最新音乐</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navTabs",
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    handleSelect(tab, event) {
      console.log(tab, event);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
#navTabs-index {
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    span {
      color: #000;
    }
  }

  .el-menu--horizontal > .el-menu-item.is-active,
  .el-menu--horizontal > .el-menu-item {
    border: none;
  }
  .is-active {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
