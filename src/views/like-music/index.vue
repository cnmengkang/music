<template>
  <div class="like-music">
    <table-head :tableHead="creator"></table-head>
    <song-list :tableDate="list"></song-list>
  </div>
</template>
<script>
import { detail } from '@/api/discover/detail';
import tableHead from '@/components/body/head.vue'
import songList from '@/components/body/songlist'
export default {
  components: { songList, tableHead },
  data() {
    return {
      params: {
        uid: 345288322,

      },
      list: [],
      id: 484077048,
      creator:{}
    };
  },
  mounted() {
    const id = this.id
    this.getLikeMusicIds(id);
  },
  methods: {
    // 获取我喜欢的音乐ids
    async getLikeMusicIds(id) {
      const { playlist } = await detail({ id });
      console.log(playlist)
      this.creator = playlist
      this.list = playlist.tracks
    },

  },
};
</script>
<style lang="less" scoped></style>