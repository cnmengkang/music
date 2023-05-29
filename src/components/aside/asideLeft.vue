<template>
  <div class="aside-left">
    <el-row class="tac mt-15">
      <el-col :span="24">
        <el-menu class="el-menu-vertical-demo" active-text-color="#000" text-color="#303133" router @select="getPath"
          :default-active="$route.path">
          <el-menu-item :index="item.index" v-for="item in data" :key="item.index">
            <span slot="title">{{ item.name }}</span>
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
      data: [
        { name: '发现音乐', index: '/discover' },
        { name: '博客', index: '/podcast' },
        { name: '视频', index: '//video/全部视频' },
        { name: '私人漫游', index: '/private' },
        { name: '我喜欢的音乐', index: '/my' },
        { name: '最近播放', index: '/recently' },
      ]
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
