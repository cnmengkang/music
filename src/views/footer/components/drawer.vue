<template>
  <el-drawer
    :style="{
      backgroundImage: 'url(' + bgcImage + ')',
    }"
    :title="songName"
    :modal="false"
    size="100%"
    :direction="direction"
    :before-close="drawerOpen"
    :visible.sync="drawer"
    :destroy-on-close="drawer"
  >
    <div class="footer_drawer flex">
      <div class="left flex justify-content-center">
        <div class="rotate">
          <el-avatar
            circle
            :size="200"
            :src="authorAvatar + '?param=200y200'"
          />
        </div>
      </div>
      <div class="right">
        <div class="right-head">
          <span class="font-14 ml-15 mr-15">歌手：{{ authorName }}</span>
        </div>
        <div class="right-body">
          <lyric></lyric>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Lyric from "@/components/Lyric";
export default {
  components: { Lyric },
  data() {
    return {
      direction: "btt",
      rotateAngle: 0, //图片旋转角度
      rotateInterval: null, //旋转计时器
    };
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
      isPlaying: (state) => state.player.isPlaying,
      songName: (state) => state.player.singer.songName,
      authorAvatar: (state) => state.player.singer.authorAvatar,
      bgcImage: (state) =>
        state.player.singer.bgcImage + "?param=50y50",
      author: (state) => state.player.singer.authorName,
      drawer: (state) => state.drawer,
    }),
    authorName() {
      return [...this.author.map((obj) => obj.name)].join(" / ");
    },
  },
  methods: {
    ...mapActions(["drawerOpen"]),
  },
};
</script>
<style lang="less" scoped>
@height: 600px;
@head: 80px;

.drawer-index {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 60px;
  z-index: 999;
  overflow: hidden;
  .drawer-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    z-index: 15;
    right: 0px;
    left: 0px;
    bottom: 0px;
    background-size: 100%;
    background-position: center center;
    transform: scale(1.5);
    filter: brightness(0.7) blur(40px);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(50px);
  }
}

.rotate {
  transition: all 1s linear;
  border-radius: 50%;
}
.el-drawer__wrapper {
  bottom: 60px;
  background-size: 6000px;
  background-position: center center;
  .footer_drawer {
    padding: 0px 5%;
    position: absolute;
    top: 60px;
    right: 0px;
    bottom: 30px;
    left: 0px;
    width: 100%;
    height: auto;

    .bgc-radius {
      border: 20px solid #ccc9;
      border-radius: 50%;
    }

    .left,
    .right {
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;

      .right-head {
        text-align: center;

        span {
          color: #fff;
        }
      }

      .right-body {
        width: 100%;
        height: 100%;

        ul {
          li {
            text-align: center;
            color: #fff;
            font-size: 14px;
            line-height: 35px;
          }
        }
      }
    }
  }
}
</style>
