<template>
  <div id="navbar-index">
    <el-menu class="el-menu-demo" mode="horizontal" router :default-active="$route.path" @select="handleSelect">
      <el-menu-item index="/discover">个性推荐</el-menu-item>
      <el-menu-item index="/discover/custom-made">专属定制</el-menu-item>
      <el-menu-item index="/discover/playlist">歌单</el-menu-item>
      <el-menu-item index="/discover/toplist">排行榜</el-menu-item>
      <el-menu-item index="/discover/topsong">最新音乐</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    handleSelect(tab, event) {
      // console.log(tab, event);
    },
  }
}
</script>
<style lang="less" scoped>
#navbar-index {
  position: sticky;
  top: 0px;
  z-index: 10;
  padding: 15px 0px;
  background: #fff;

  .el-menu {
    border-bottom: none;
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0px;
    margin-right: 20px;

    span {
      color: #000;
    }
  }

  .is-active {
    font-weight: bold;
    font-size: 16px;
    border-bottom: 2px solid red;
    border-radius: 2px;
  }
}
</style>
