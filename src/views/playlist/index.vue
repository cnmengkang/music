<template>
  <div class="playlist">
    <div class="playlist-head border-r-5 flex mb-15" v-if="quality">
      <div class="bgc" :style="{
        backgroundImage: 'url(' + quality.coverImgUrl + '?imageView&blur=40x20)',
      }"></div>
      <div class="left ml-15">
        <el-avatar shape="square" :size="150" fit="cover" :src="quality.coverImgUrl"></el-avatar>
      </div>
      <div class="right">
        <el-button plain round class="mb-20">精品歌单</el-button>
        <p class="white font-16">{{ quality.name }}</p>
      </div>
    </div>
    <el-card class="playlist-list">
      <div class="playlist-tabs flex" style="justify-content: space-between">
        <category :tabsName="tabsName" :all="all" :categories="categories" :sub="sub" @myEvent="handleTabClickType">
        </category>
        <tabs :tabsName="tabsName" @tab-click="handleTabClickType">
          <el-tab-pane v-for="(item, index) in tags" :name="item.name" :label="item.name" :key="index" />
        </tabs>
      </div>
      <div class="playlist-body mt-5 grid">
        <play-grid v-for="(item, index) in playlist" :key="index" :name="item.name"
          :picUrl="item.picUrl || item.coverImgUrl" :playcount="item.playcount || item.playCount"
          :trackCount="item.trackCount" :id="item.id" :alg="item.alg" />
        <pagination :total="totalPage" :page-size="pageSize" :current-page.sync="currentPage" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { topPlaylist } from "@/api/discover/discover";
import {
  playlistHot,
  topPlaylistHighQuality,
  playlistCatList,
} from "@/api/music/music";
import Tabs from "@/components/Tabs";
import playGrid from "@/components/PlayGrid";
import Pagination from "@/components/Pagination";
import Category from "@/components/Category";
export default {
  components: { playGrid, Pagination, Tabs, Category },
  data() {
    return {
      playlist: [],
      params: {
        cat: "",
        limit: 30,
        offset: 0,
      },
      HighQuality: {
        cat: "",
        limit: 1,
        before: "",
      },
      totalPage: 0,
      pageSize: 30,
      currentPage: 0,
      quality: [],
      tags: [],
      all: "",
      categories: {},
      sub: [],
      tabsName: "",
      loading: true
    };
  },
  mounted() {
    this.getPlaylistCatList();
    this.getTopPlaylist();
    this.getPlaylistHot();
    this.getTopPlaylistHighQuality();
  },
  watch: {
    currentPage(val) {
      if (val == 1) this.params.offset = 0;
      this.params.offset = val * this.pageSize - this.pageSize;
      this.getTopPlaylist();
    },
  },
  methods: {
    getTopPlaylist() {
      topPlaylist(this.params).then((res) => {
        this.totalPage = res.total;
        this.playlist = res.playlists;
        this.loading = false
      });
    },
    // 获取热搜歌单
    async getPlaylistHot() {
      const { tags } = await playlistHot();
      this.tags = tags;
    },
    // 点击tabs切换歌单
    handleTabClickType(tab) {
      this.tabsName = tab.name;
      this.params.cat = tab.name;
      this.HighQuality.cat = tab.name;
      this.getTopPlaylistHighQuality();
      this.getTopPlaylist();
    },
    // 获取精品歌单数据
    async getTopPlaylistHighQuality() {
      const { playlists } = await topPlaylistHighQuality(this.HighQuality);
      this.quality = playlists[0];
    },
    async getPlaylistCatList() {
      const result = await playlistCatList();
      this.all = result.all.name;
      this.categories = result.categories;
      this.sub = result.sub;
    },
  },
};
</script>
