<template>
  <div class="sound flex">
    <el-popover placement="top"  trigger="hover">
      <div class="SoundQuality">
        <ul class="pl-15">
          <li
            :class="[item.level,'cursor', level==item.level?'active':'']"
            v-for="(item, index) in params"
            :key="index"
            @click="handSoundQuality(item)"
          >{{ item.text }}</li>
        </ul>
      </div>
      <span class="soundText mr-10"  slot="reference" type="text">{{SoundQuality.text}}</span>
    </el-popover>
    <el-popover placement="top-start" trigger="hover" class="popover">
      <el-slider
        :show-tooltip="true"
        :format-tooltip="formatTooltip"
        @change="changeVolume"
        v-model="volume"
        vertical
        height="80px"
      >
      </el-slider>
      <span
        :title="isSound ? '静音' : '恢复音量'"
        slot="reference"
        :class="['font-30 iconFont', isSound ? 'icon-sound-start' : 'icon-sound-close']"
        @click="handSound(isSound)"
      ></span>
    </el-popover>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSound: true,
      volume: 10, //默认音量
      params: [
        {
          level: "standard",
          text: "标准音质",
        },
        {
          level: "exhigh",
          text: "极高音质",
        },
        {
          level: "lossless",
          text: "无损音质",
        },
        {
          level: "hires",
          text: "Hi-Res",
        },
        {
          level: "jyeffect",
          text: "高清环绕声",
        },
        {
          level: "sky",
          text: "沉浸环绕声",
        },
        {
          level: "jymaster",
          text: "超清母带",
        },
      ],
    };
  },
  mounted() {
    this.player.setVolume(this.volume / 100);
  },
  methods: {
    // 点击控制音量大小
    handSound(sound) {
      if (sound) {
        localStorage.setItem("volume", this.volume);
        this.player.setVolume(0);
        this.volume = 0;
      } else {
        const val = Number(localStorage.getItem("volume"));
        this.player.setVolume(val / 100);
        this.volume = val;
      }
      this.isSound = !this.isSound;
    },
    // 音量条toolTip
    formatTooltip(val) {
      return val;
    },
    // 滑动控制音量大小
    changeVolume(val = 0) {
      if (val == 0) {
        this.player.setVolume(0);
        this.volume = 0;
        this.isSound = false;
      } else {
        this.player.setVolume(val / 100);
        this.volume = val;
        this.isSound = true;
      }
    },
    // 音质
    handSoundQuality(item) {
      this.player.SetSoundQuality(item.level);
    },
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
      level: (state) => state.player.params.level,
    }),
    SoundQuality() {
      return this.params.find((item) => item.level == this.level);
    },
  },
};
</script>
<style lang="less" scoped>
.sound {
  padding: 10px;
  .soundText{
    border: 1px solid red;
    font-size: 12px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 2px;
    color: red;
  }
}
</style>
