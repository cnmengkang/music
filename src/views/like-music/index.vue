<template>
  <div class="like-music">
    <song-list :tableDate="list"></song-list>
  </div>
</template>
<script>
import { likest, songDetail } from '@/api/music/music';
import songList from '@/components/body/songlist'
export default {
  components: { songList },
  data() {
    return {
      params: {
        uid: 345288322,
      },
      list: []
    };
  },
  mounted() {
    this.getLikeMusicIds();
  },
  methods: {
    // 获取我喜欢的音乐ids
    getLikeMusicIds() {
      likest(this.params).then(res => {
        const ids = res.ids
        this.getMusicSongDetail(ids.join(','))
      })
    },
    // 根据ids获取喜欢音乐详细信息
    getMusicSongDetail(ids) {
      songDetail(ids).then(res => {
        this.list = res.songs
      })
    }
  },
};
</script>
<style lang="less" scoped></style>