<template>
  <div class="video-grid mt-20">
    <div class="wrapper" v-if="videoGroups.length != 0">
      <div class="cover border-r-5 mb-20" v-for="(item, index) in videoGroups" :key="index" @click="getVideoDetail(item)">
        <template v-if="item.data">
          <div class="relative">
            <el-image class="border-r-5 wh cursor" :src="item.data.coverUrl" lazy />
            <span class="playCount">{{ $playCount(item.data.playTime)
            }}</span>
            <span class="playTime">{{
              $formatTime(item.data.durationms, "{i}:{s}")
            }}</span>
          </div>
          <p class="creator-title ellipsis">{{ item.data.title }}</p>
          <p class="creator-nickname" v-if="item.data.creator" @click="getDetailAuthor(item)">
            by {{ item.data.creator.nickname }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    videoGroups: {
      type: Array,
    },
  },
  methods: {
    // 点击视频列表跳转
    getVideoDetail(res) {
      this.$router.push({ name: "videoDetail", params: { id: res.data.vid } });
    },
    getDetailAuthor(res) {
      console.log(res.data.creator);
    },
  },
}
</script>
<style lang="less" scoped>
.video-grid {
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2%;

    .creator-nickname {
      font-size: 12px;
      color: #ccc;
    }
  }

  .cover {
    position: relative;
    width: 32%;
  }
}
</style>
