<template>
  <div class="like-music">
    喜欢的音乐
    <song-list :tableDate="list"></song-list>
  </div>
</template>

<script>
import { likest, songDetail, userPlayList } from '@/api/music/music';
import songList from '@/components/body/songlist'
export default {
  components: { songList },
  props: {},
  data() {
    return {
      params:{
        uid: 345288322,
      },
      list: []
    };
  },
  created() { },
  mounted() {
    this.getLikeMusic();
    this.getUserPlayList()
  },
  methods: {
    // 获取我喜欢的音乐ids
    getLikeMusic() {
      likest(this.params).then(res => {
        const ids = res.ids
        this.getMusicSongDetail(ids.join(','))
      })
    },
    // 根据ids获取喜欢音乐详细信息
    getMusicSongDetail(ids) {
      songDetail(ids).then(res => {
        this.list = res.songs
        console.log(res)
      })
    },
    // 登陆后获取用户信息，歌单，mv，dj，数量
    getUserPlayList() {
      userPlayList(this.params).then(res => {
        console.log(res)
      })
    }
  },
  computed: {},
};
</script>
<style lang="less" scoped></style>