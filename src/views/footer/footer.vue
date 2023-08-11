<template>
  <div class="footer_info">
    <div class="footer">
      <!-- 左侧歌曲信息展示 -->
      <div class="footer-singer">
        <singer></singer>
      </div>
      <!-- 左侧歌曲信息展示 -->
      <!-- 中间控制器 -->
      <div class="footer-audio">
        <div class="audio">
          <div class="audio-play flex">
            <div class="audio-top plays mb-5">
              <span
                title="上一首"
                class="icon-prev"
                @click="getPrevNext('prev')"
              ></span>
              <span
                :title="isPlaying ? '暂停' : '播放'"
                :class="isPlaying ? 'icon-play' : 'icon-pause'"
                @click="getIsPlaying"
              ></span>
              <span
                title="下一首"
                class="icon-next"
                @click="getPrevNext('next')"
              ></span>
            </div>
            <div
              class="audio-slider flex justify-content-center flex-wrap-nowrap"
            >
              <span class="start font-14">{{ currentTime || "00:00" }}</span>
              <el-slider
                style="width: 100%"
                :min="0"
                :max="player.duration"
                @change="seek"
                v-model="slidValue"
                :show-tooltip="false"
              />
              <span class="end font-14">{{ duration || "00:00" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 中间控制器 -->
      <!-- 音量 -->
      <div class="flex" style="width: 25%">
        <sound></sound>
        <div class="btn_lyrics">
          <span
            :class="['font-16 ml-10 cursor', { lyric: show }]"
            @click="show = !show"
            >词</span
          >
        </div>
      </div>
      <!-- 音量 -->
      <!-- 底部歌词 -->
      <transition name="el-zoom-in-bottom">
        <div class="lyrics" v-show="show" v-if="!drawer">
          <lyric></lyric>
        </div>
      </transition>
      <!-- 底部歌词 -->
      <!-- 弹出层包含歌词作者信息 -->
      <drawer></drawer>
      <!-- 弹出层包含歌词作者信息 -->
    </div>
  </div>
</template>
<script>
import { formatTIme } from "@/utils/formLyrics";
import { mapState } from "vuex";
import singer from "./components/singer";
import sound from "./components/sound";
import Lyric from "@/components/Lyric";
import drawer from "./components/drawer";
export default {
  name: "footers",
  components: { singer, sound, Lyric, drawer },
  data() {
    return {
      slidValue: 0,
      show: true,
    };
  },
  watch: {
    "player.currentTime"(time) {
      this.slidValue = time;
    },
  },
  // 计算属性
  computed: {
    ...mapState({
      player: (state) => state.player,
      isFooterShow: (state) => state.player.isFooterShow,
      singers: (state) => state.player.singer,
      isPlaying: (state) => state.player.isPlaying,
      drawer: (state) => state.drawer,
    }),
    currentTime() {
      return formatTIme(this.player.currentTime);
    },
    duration() {
      return formatTIme(this.player.duration);
    },
  },
  methods: {
    getPrevNext(player) {
      this.player.getPrevNext(player);
    },
    seek() {
      this.player.setCurrentTime(this.slidValue);
    },
    getIsPlaying() {
      this.player.isPlaying ? this.player.pause() : this.player.play();
    },
  },
};
</script>
<style scoped>
.drawer {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 60px;
  z-index: 999;
  overflow: hidden;
}
.lyric {
  color: red;
}
</style>
