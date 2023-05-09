<template>
  <div class="playlist">
    <div class="playlist-head border-r-5 flex">
      <div class="bgc" :style="{ background: 'url(' + url + ') 100%' }"></div>
      <div class="left mr-20">
        <el-avatar shape="square" :size="150" fit="cover" :src="url"></el-avatar>
      </div>
      <div class="right">
        <el-button plain round class="mb-20">精品歌单</el-button>
        <h3>雨之摇滚·倾听爱与自由乐章</h3>
      </div>
    </div>
    <div class="playlist-list mt-20">
      <play-grid :playlist="playlist"></play-grid>
      <pagination :total="totalPage" :page-size="pageSize" :current-page.sync="currentPage"/>
    </div>
  </div>
</template>

<script>
import { topPlaylist } from '@/api/discover/discover';
import playGrid from '@/components/body/playgrid'
import pagination from '@/components/pagination'
export default {
  components: { playGrid, pagination },
  props: {},
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      playlist: [],
      params: {
        cat: '',
        limit: 30,
        offset: 0,
      },
      totalPage: 0,
      pageSize: 30,
      currentPage: 0
    };
  },
  mounted() {
    this.getTopPlaylist()
  },
  watch: {
    currentPage(val) {
      if (val == 1) this.params.offset = 0;
      this.params.offset = (val * this.pageSize) - this.pageSize;
      this.getTopPlaylist();
    }
  },
  methods: {
    getTopPlaylist() {
      topPlaylist(this.params).then(res => {
        this.totalPage = res.total;
        this.playlist = res.playlists;
      })
    }
  }
};
</script>
<style lang="less" scoped>
@height: 152px;
@width: 30px;

.playlist-head {
  padding: 15px;
  height: @height;
  overflow: hidden;
  width: calc(100% - @width);
  background-size: 100%;
  position: relative;

  .bgc {
    width: 100%;
    height: @height;
    position: absolute;
    top: 0px;
    z-index: 1;
    filter: blur(40px);
    transform: scale(1.5);
    z-index: 1;
  }

  .left {
    top: 15px;
  }

  .right {
    top: 50%;
    left: @height + @width;
    transform: translateY(-50%);
  }

  .left,
  .right {
    position: absolute;
    z-index: 2;
  }
}
</style>