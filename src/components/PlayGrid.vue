<template>
  <!-- grid列表 -->
  <div class="item w-20" @click="getDetail(id)">
    <div class="play-img">
      <el-image fit="cover" lazy :src="picUrl" :alt="alg"></el-image>
      <span class="playCount font-12">
        <i class="el-icon-caret-right"></i>{{ $playCount(playcount) }}</span
      >
      <el-button
        @click.stop="getPlayAllList(id)"
        size="small"
        circle
        class="iconFont icon-play-red"
      ></el-button>
    </div>
    <p class="name" style="width: 140px">{{ name }}</p>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
    },
    alg: {
      type: String,
    },
    picUrl: {
      type: String,
    },
    playcount: {
      type: Number,
    },
    trackCount: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      params: {
        ids: 0,
        index: 0,
        play: "all",
      },
    };
  },
  methods: {
    // 点击跳转到详情页面
    getDetail(ids) {
      this.$router.push({ name: "detail", params: { id: ids } });
    },
    getPlayAllList(id) {
      this.params.ids = id;
      this.$store.dispatch("getCurrentMusicIsPlay", this.params);
    },
  },
};
</script>
<style scoped>
p.name {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
