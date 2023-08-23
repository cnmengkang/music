<template>
  <div class="lyric-scroll" ref="lyrics">
    <div :class="addLineClass(item, index)" ref="lyrics_p" v-for="(item, index) in lyricList" :key="index"
      :data-time="item.timeInSeconds">
      <div class="original-line" v-if="item.originalContent">{{ item.originalContent }}</div>
      <div class="translate-line" v-if="item.translateContent">{{ item.translateContent }}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeLine: -1,
    };
  },
  watch: {
    // 监听当前播放歌曲时间,并给index赋值
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
    addLineClass(item, index) {
      return {
        'lyrics-line': true,
        lyric_active: (item.originalContent || item.translateContent) && this.activeLine == index
      }
    }
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
      lyricList: (state) => state.player.lyricList,
      currentTime: (state) => state.player.currentTime,
    }),
  },
};
</script>
<style scoped lang="less">
@height: 35px;

// 底部歌词样式
.lyrics {
  .lyric-scroll {
    height: @height;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;


    .lyrics-line {
      color: #000;
      display: flex;
      align-items: center;
      font-size: 12px;
      height: auto;
      min-height: 35px;
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
      align-content: center;
      letter-spacing: 1px;

      .original-line,
      .translate-line {
        width: 100%;
        line-height: 1.2;
      }
    }

  }
}

// 弹出层歌词样式
.right-body {
  .lyric-scroll {
    height: 100%;
    width: 100%;
    overflow: auto;

    .lyrics-line {
      color: #989898;
      word-wrap: break-word;
      text-align: center;
      font-size: 14px;
      line-height: @height;
      height: auto !important;
      height: @height;
      min-height: @height;
      -webkit-transition: scale 0.7s linear;
      -moz-transition: scale 0.7s linear;
      -o-transition: scale 0.7s linear;
      transition: scale 0.7s linear;
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
