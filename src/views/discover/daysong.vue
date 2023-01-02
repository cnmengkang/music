<template>
  <div class="day-song mt-20">
    <div class="day-song-head">
      <div class="calendar flex">
        <div class="left mr-20">
          <el-image :src="src"></el-image>
        </div>
        <div class="right">
          <h1 class="mb-10">每日歌曲推荐</h1>
          <p class="font-12">根据你的音乐口味，每天6：00生成</p>
        </div>
      </div>

    </div>
    <!-- 顶部 -->
    <div class="day-song-body">
      <song-list :tableDate="list"></song-list>
    </div>
    <!-- 内容区域 -->
  </div>
</template>

<script>
import songList from '@/components/body/songlist'
import { daySongs } from '@/api/discover/discover'
export default {
  components: { songList },
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      list: [],
    };
  },
  created() {
    this.getDaySong()
  },
  mounted() { },
  methods: {
    getDaySong() {
      daySongs().then(res => {
        this.list = res.data.dailySongs
      })
    }
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.day-song {
  .day-song-head {
    .calendar {
      .left {
        width: 100px;
      }
    }
  }
}
</style>