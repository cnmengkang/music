<template>
  <el-card class="day-song">
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
  </el-card>
</template>
<script>
import SongList from "@/components/SongList";
import { daySongs } from "@/api/discover/discover";
export default {
  components: { SongList },
  data() {
    return {
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      list: [],
      songId: 0,
    };
  },
  mounted() {
    this.getDaySong();
  },
  methods: {
    async getDaySong() {
      const { data } = await daySongs();
      this.list = data.dailySongs;
      this.songId = data.recommendReasons[0].songId;
    },
  },
};
</script>
<style lang="less" scoped>
.day-song {
  .day-song-head {
    .calendar {
      .left {
        width: 200px;
      }
    }
  }
}
</style>
