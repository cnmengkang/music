<template>
  <div class="playlist">
    <div class="playlist-head border-r-5 flex">
      <div class="left mr-20">
        <el-avatar shape="square" :size="150" fit="cover" :src="url"></el-avatar>
      </div>
      <div class="right">
        <el-button plain round class="mb-20">精品歌单</el-button>
        <h3>雨之摇滚·倾听爱与自由乐章</h3>
      </div>
    </div>
    <div class="playlist-">
      <play-grid :playlist="playlist"></play-grid>
    </div>
  </div>
</template>

<script>
import { topPlaylist } from '@/api/discover/discover';
import playGrid from '@/components/body/playgrid'
export default {
  components: { playGrid },
  props: {},
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      topList: {
        cat: '',
        limit: 50,
      },
      playlist: []
    };
  },
  created() { },
  mounted() {
    this.getTopPlaylist()
  },
  methods: {
    getTopPlaylist() {
      topPlaylist(this.topList).then(res => {
        this.playlist = res.playlists
      })
    }
  }
};
</script>
<style lang="less" scoped>
.playlist-head {
  background: #E4E7ED;
  padding: 15px;
}
</style>