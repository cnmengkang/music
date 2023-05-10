<template>
  <div class="playlist">
    <div class="playlist-head border-r-5 flex" v-if="quality">
      <div class="bgc" :style="{ background: 'url(' + quality.coverImgUrl + ') 100%' }"></div>
      <div class="left mr-20">
        <el-avatar shape="square" :size="150" fit="cover" :src="quality.coverImgUrl"></el-avatar>
      </div>
      <div class="right">
        <el-button plain round class="mb-20">精品歌单</el-button>
        <p class="white font-16">{{ quality.name }}</p>
      </div>
    </div>
    <div class="playlist-list mt-20">
      <tabs @tab-click="handleTabClickType">
        <el-tab-pane v-for="(item, index) in tags" :value="item.type" :label="item.name" :key="index" />
      </tabs>
      <play-grid :playlist="playlist"></play-grid>
      <pagination :total="totalPage" :page-size="pageSize" :current-page.sync="currentPage" />
    </div>
  </div>
</template>
<script>
import { topPlaylist } from '@/api/discover/discover';
import { playlistHot, topPlaylistHighQuality } from '@/api/music/music';
import Tabs from '@/components/Tabs';
import playGrid from '@/components/body/playgrid';
import pagination from '@/components/pagination';
export default {
  components: { playGrid, pagination, Tabs },
  props: {},
  data() {
    return {
      playlist: [],
      params: {
        cat: '',
        limit: 30,
        offset: 0,
      },
      HighQuality: {
        cat: '',
        limit: 1,
        before: ''
      },
      totalPage: 0,
      pageSize: 30,
      currentPage: 0,
      quality: [],
      tags: []
    };
  },
  mounted() {
    this.getTopPlaylist();
    this.getPlaylistHot();
    this.getTopPlaylistHighQuality();
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
    },
    // 获取热搜歌单
    async getPlaylistHot() {
      const { tags } = await playlistHot();
      // console.log(tags)
      this.tags = tags;
    },
    handleTabClickType(tab) {
      if (this.params.cat == tab.label) return;
      this.params.cat = tab.label;
      this.HighQuality.cat = tab.label;
      this.getTopPlaylistHighQuality();
      this.getTopPlaylist();
    },
    // 获取精品歌单数据
    async getTopPlaylistHighQuality() {
      const { playlists } = await topPlaylistHighQuality(this.HighQuality);
      this.quality = playlists[0];
    }
  },
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
    filter: blur(50px);
    box-shadow: 0px 20px 20px 20px;
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