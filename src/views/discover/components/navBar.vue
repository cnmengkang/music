<template>
  <div class="navbar-index">
    <tabs :tabsName="tabsName" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="item in data"
        :key="item.id"
        :name="item.path"
        :label="item.name"
        :path="item.path"
      ></el-tab-pane>
    </tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
export default {
  name: "navBar",
  components: { Tabs },
  data() {
    return {
      tabsName: "/discover",
      data: [
        { path: "/discover", name: "个性推荐", id: 0 },
        { path: "/discover/playlist", name: "歌单", id: 2 },
        { path: "/discover/toplist", name: "排行榜", id: 3 },
        { path: "/discover/topsong", name: "最新音乐", id: 4 },
      ],
    };
  },
  methods: {
    handleTabClick(tab) {
      this.tabsName = tab.name;
      this.$router.push(tab.$attrs.path);
    },
  },
  mounted(){
    this.tabsName = this.$route.path;
  }
};
</script>
<style lang="less" scoped>
.navbar-index {
  position: sticky;
  top: 0px;
  z-index: 10;
  padding: 0px;
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
