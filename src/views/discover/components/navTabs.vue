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
      <el-menu-item index="/discover/toplist">排行榜</el-menu-item>
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
  position: sticky;
  top: 0px;
  z-index:99;
  padding: 15px 0px;
  background: #fff;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding-left:0px;
    span {
      color: #000;
    }
  }

  .is-active {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
