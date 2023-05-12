<template>
  <div class="like-music">
    FM
  </div>
</template>
<script>
import { detail } from '@/api/discover/detail';
export default {
  data() {
    return {
      params: {
        uid: 345288322,

      },
      list: [],
      id: 484077048,
      creator: {}
    };
  },
  mounted() {
    const id = this.id;
    this.getLikeMusicIds(id);
    this.getDetail(id);
  },
  methods: {
    getDetail(id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    },
    // 获取我喜欢的音乐ids
    async getLikeMusicIds(id) {
      const { playlist } = await detail({ id });
      this.creator = playlist;
      this.list = playlist.tracks;
    },
  },
};
</script>
<style lang="less" scoped></style>