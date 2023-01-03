<template>
  <div id="aside-left">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu class="el-menu-vertical-demo" active-text-color="#000" text-color="#303133" router @select="getPath"
          :default-active="$route.path">
          <el-menu-item index="/discover">
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/blog">
            <span slot="title">博客</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="/friend">
            <span slot="title">关注</span>
          </el-menu-item>
          <el-menu-item index="/live-streaming">
            <span slot="title">直播</span>
          </el-menu-item>
          <el-menu-item index="/private">
            <span slot="title">私人FM</span>
          </el-menu-item>
          <el-menu-item index="/like-music">
            <i class="icon iconFont icon-xihuan"></i>
            <span slot="title">我喜欢的音乐</span>
          </el-menu-item>
          <el-menu-item index="9">
            <i class="icon iconFont icon-down"></i>
            <span slot="title">本地与下载</span>
          </el-menu-item>
          <el-menu-item index="10">
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
#aside-left {
  width: 200px;

  .tac {
    margin-top: 15px;

    .el-menu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;

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
