<template>
  <div class="sound">
    <el-popover placement="top-start" trigger="hover" class="popover">
      <el-slider :show-tooltip="false" :format-tooltip="formatTooltip" @change="changeVolume" v-model="volume" vertical height="80px">
      </el-slider>
      <span title="静音" slot="reference" v-if="isSound" class="font-30 iconFont icon-sound-start"
        @click="setSound(false)"></span>
      <span title="恢复音量" slot="reference" v-else class="font-30 iconFont icon-sound-close" @click="setSound(true)"></span>
    </el-popover>
  </div>
  <!-- 音量组件 -->
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isSound: true,
      volume: 40,  //默认音量
      soundAudio: ''
    };
  },
  created() {
    // this.$bus.$on('audio', el => {
    //   this.soundAudio = el;
    // })
  },
  mounted() {
    // 首次加载默认音量控制
    // this.soundAudio.volume = this.volume / 100;
    // console.log(`当前音量${this.volume} max=100`)
  },
  methods: {
    // 点击控制音量大小
    setSound(e) {
      if (e != true) {
        console.log('124')
        localStorage.setItem('volume', this.volume);
        this.soundAudio.volume = 0;
        this.volume = 0;
        this.isSound = false;
      }
      else {
        const val = Number(localStorage.getItem('volume'));
        this.isSound = true;
        this.volume = val;
        this.soundAudio.volume = val / 100;
      }
    },
    // 音量条toolTip
    formatTooltip(val) {
      return val / 100;
    },
    // 滑动控制音量大小
    changeVolume(val = 0) {
      if (val == 0) {
        this.soundAudio.volume = 0;
        this.volume = 0;
        this.isSound = false;
      } else {
        console.log(val)
        this.soundAudio.volume = val / 100;
        this.volume = val;
        this.isSound = true;
      }
    },
  },
};
</script>
<style lang="less" scoped></style>