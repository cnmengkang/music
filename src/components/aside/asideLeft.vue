<template>
  <div class="aside-left">
    <el-row class="tac mt-15">
      <el-col :span="24">
        <el-menu class="el-menu-vertical-demo" active-text-color="#000" text-color="#303133" router @select="getPath"
          :default-active="$route.path">
          <el-menu-item index="/discover">
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/podcast">
            <span slot="title">博客</span>
          </el-menu-item>
          <el-menu-item index="/video/全部视频">
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/private">
            <span slot="title">私人漫游</span>
          </el-menu-item>
          <el-menu-item index="/like-music">
            <i class="icon iconFont icon-xihuan"></i>
            <span slot="title">我喜欢的音乐</span>
          </el-menu-item>
          <el-menu-item index="/recently">
            <i class="el-icon-time"></i>
            <span slot="title">最近播放</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "asideLeft",
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    getPath(index, path) {
      console.log(index)
    },
  },
};
</script>
<style scoped lang="less">
.aside-left {
  .tac {

    .el-menu {
      border-right: none;

      .el-menu-item {
        height: 40px;
        line-height: 40px;
        margin-bottom: 5px;

        span {
          color: #000;
        }
      }

      .is-active {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
