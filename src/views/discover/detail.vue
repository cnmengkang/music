<template>
  <div class="detail">
    <div class="detail-header">
      <comp-song-head :tableHead="playlist" />
      <!-- 详情页顶部 -->
    </div>
    <el-card class="detail-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="song">
          <!-- 歌曲列表 -->
          <comp-song-list :tableDate="list" />
        </el-tab-pane>
        <el-tab-pane name="reviews">
          <!-- 歌曲评论 -->
          <span slot="label">评论 <small style="font-size: 12px">({{ reviewsTotal }})</small>
          </span>
          <comp-reviews :commentType="commentType" @upDateReviews="getAllComments" :hotReviewsList="hotReviewsList"
            :newReviewsList="newReviewsList" :reviewsTotal="reviewsTotal" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { playlistDetail } from "@/api/discover/detail";
import { commentPlayList } from '@/api/discover/reviews'
import { playTrackAll } from "@/api/music/music";
import compSongHead from "@/components/SongHead";
import compSongList from "@/components/SongList";
import compReviews from "@/components/Reviews";

export default {
  components: { compSongHead, compSongList, compReviews },
  name: "detail",
  data() {
    return {
      playlist: {},
      activeName: "song", //默认选中
      list: [],
      params: {
        id: this.$route.params.id,
        limit: '',
        offset: ''
      },
      newReviewsList: [],
      hotReviewsList: [],
      reviewsTotal: 0,
      commentData: {
        id: this.$route.params.id,
        offset: '',
        limit: ''
        // 获取评论
      },
      commentType: 2
    };
  },
  // 监听id变化更改list & head 数据
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(newId, oldId) {
        this.params.id = newId
        this.commentData.id = newId
        this.getPlayTrack();
        this.getAllComments()
      },
    },
  },
  methods: {
    // // 获取歌单所有歌曲
    async getPlayTrack() {
      // 歌单顶部数据
      let playlist = await playlistDetail(this.params);
      this.playlist = playlist.playlist;
      // 歌单list数据
      let songs = await playTrackAll(this.params)
      this.list = songs.songs;
    },
    // 获取歌单评论
    async getAllComments() {
      let result = await commentPlayList(this.commentData)
      this.newReviewsList = result.comments;
      this.hotReviewsList = result.hotComments;
      this.reviewsTotal = result.total;
      console.log(result)
    },
    // tab切换
    handleClick(tab) {
      console.log(tab);
    },
  },
};
</script>
