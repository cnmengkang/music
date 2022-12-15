<template>
  <div id="navTabs-index">
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
