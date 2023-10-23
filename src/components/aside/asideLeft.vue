<template>
  <div class="aside-left">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" router>
      <el-menu-item v-for="(item, index) in data" :index="item.index" :to="item.index" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group title="创建的歌单">
        <el-menu-item v-for="item in createPlaylist" :index="'/detail/' + item.id" :key="item.id">
          <i class="el-icon-grape"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="收藏的歌单">
        <el-menu-item v-for="item in favoritePlaylist" :index="'/detail/' + item.id" :key="item.id">
          <i class="el-icon-grape"></i>
          <span slot="title" :title="item.name">{{ item.name }}</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "asideLeft",
  data() {
    return {
      data: [
        { name: "发现音乐", index: "/discover", icon: "el-icon-menu" },
        { name: "视频", index: "/video/all", icon: "el-icon-menu" },
        { name: "私人漫游", index: "/private", icon: "el-icon-menu" },
      ],
      defaultActive: "/discover",
    };
  },
  created() {
    let path = this.$route.path;
    if (path.includes('/discover')) {
      this.defaultActive = '/' + path.split('/')[1];
    }else{
      this.defaultActive = path;
    }
  },
  methods: {
    // async getUserPlaylist() {
    //   let result = await userPlaylist(this.uid);
    //   if (result.code != 200) return;
    //   result.playlist[0].name = '我喜欢的音乐';
    //   this.playlist = result.playlist;
    // },
  },
  computed: {
    ...mapState({
      playList: (state) => state.playList,
    }),
    createPlaylist() {
      return this.playList.filter(item => !item.subscribed);
    },
    favoritePlaylist() {
      return this.playList.filter(item => item.subscribed);
    },
  },
};
</script>
<style scoped lang="less">
.aside-left {
  width: 100%;
  height: 100%;
  overflow: auto;
  .menu_list {
    span {
      padding: 10px;
      display: block;
      color: #ccc;
    }
    li {
      height: 35px;
      line-height: 35px;
      transition: hover 0.3s linear;
      border-radius: 4px;
      padding-left: 10px;
      &:hover {
        background: rgb(236, 94, 118);
        color: #fff;
      }
    }
    .active {
      background: rgb(236, 94, 118);
      color: #fff;
    }
  }
}
.el-menu {
  border: none;
}
</style>
