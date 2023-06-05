<template>
  <div class="lyric-scroll" ref="lyrics">
    <p
      :class="{ lyric_active: index == activeLine }"
      ref="lyrics_p"
      v-for="(item, index) in formattedLyrics"
      :key="index"
      :data-time="item.time"
    >
      {{ item.text }}
    </p>
  </div>
</template>
<script>
import { formatLyrics } from "@/utils/formLyrics";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeLine: -1,
    };
  },
  watch: {
    // 监听当前播放歌曲时间,兵给index赋值
    currentTime(newTime) {
      const lyric = this.$refs.lyrics_p;
      for (let i = 0; i < lyric.length; i++) {
        const line = lyric[i];
        if (line.dataset.time > newTime) {
          this.activeLine = i > 0 ? i - 1 : 0;
          break;
        }
      }
    },
    activeLine(newIndex, oldIndex) {
      if (newIndex != oldIndex) {
        this.$nextTick(() => {
          this.scrollToActiveLine();
        });
      }
    },
  },
  methods: {
    // 滚动到当前播放歌词
    scrollToActiveLine() {
      const container = this.$refs.lyrics;
      const activeLine = container.querySelector(".lyric_active");
      if (activeLine) {
        container.scrollTop = activeLine.offsetTop - container.offsetTop;
      }
    },
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
      lyrics: (state) => state.player.lyric,
      currentTime: (state) => state.player.currentTime,
    }),
    formattedLyrics() {
      return formatLyrics(this.lyrics, this.space);
    },
  },
};
</script>
<style scoped lang="less">
@height: 35px;
// 底部歌词样式
.lyrics {
  .lyric-scroll {
    overflow: hidden;
    height: @height;

    p {
      text-align: center;
      font-size: 12px;
      line-height: @height;
      height: auto;
      letter-spacing: 2px;
      -webkit-transition: color 0.7s linear;
      -moz-transition: color 0.7s linear;
      -o-transition: color 0.7s linear;
      transition: color 0.7s linear;
    }
  }
}

// 弹出层歌词样式
.right-body {
  .lyric-scroll {
    margin: 30px auto;
    height: 100%;
    width: 100%;
    overflow: auto;

    p {
      color: #000;
      word-wrap: break-word;
      text-align: center;
      line-height: @height;
      height: auto !important;
      height: @height;
      min-height: @height;
      -webkit-transition: color 0.7s linear;
      -moz-transition: color 0.7s linear;
      -o-transition: color 0.7s linear;
      transition: color 0.7s linear;
    }

    .lyric_active {
      color: #fff;
      font-size: 16px;
      -webkit-transition: color 0.7s linear;
      -moz-transition: color 0.7s linear;
      -o-transition: color 0.7s linear;
      transition: color 0.7s linear;
    }
  }
}
</style>
