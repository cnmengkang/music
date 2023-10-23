<template>
  <el-drawer
    :title="songName"
    :modal="false"
    size="100%"
    :direction="direction"
    :with-header="false"
    :before-close="drawerOpen"
    :visible.sync="drawer"
    :destroy-on-close="drawer"
    :append-to-body="true"
  >
    <div
      class="drawer-background"
      :style="{
        backgroundImage: 'url(' + authorAvatar + ')',
      }"
    ></div>
    <div class="footer_drawer flex" v-if="drawer">
      <div class="left flex justify-content-center">
        <div class="rotate">
          <el-avatar circle :size="200" :src="authorAvatar" />
        </div>
      </div>
      <div class="right">
        <div class="right-head">
          <h1 class="songName text-center mb-10">{{ songName }}</h1>
          <p class="font-14">歌手：{{ authorName }}</p>
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
.drawer-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: -1;
  right: 0px;
  left: 0px;
  bottom: 62px;
  background-size: 6000px;
  background-position: center center;
  transform: scale(1.5);
  filter: brightness(0.7) blur(40px);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(50px);
}

.rotate {
  transition: all 1s linear;
  border-radius: 50%;
}
.el-drawer__wrapper {
  bottom: 75px;
  .footer_drawer {
    padding: 4%;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
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
        .songName,
        p {
          color: #fff;
        }
      }

      .right-body {
        width: 100%;
        height: 600px;
        margin-top: 50px;
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
