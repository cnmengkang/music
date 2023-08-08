<template>
  <div class="detail">
    <div class="detail-header">
      <song-head :tableHead="playlist"></song-head>
      <!-- 详情页顶部 -->
    </div>
    <el-card class="detail-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="song">
          <song-list :tableDate="list" />
        </el-tab-pane>
        <el-tab-pane name="reviews">
          <span slot="label"
            >评论 <small style="font-size: 12px">({{ totalReview }})</small>
          </span>
          <div class="comment" v-for="(item, index) in comment" :key="index">
            <div class="user-avatarUrl cursor" @click="getUserInfo(item.user)">
              <el-avatar :size="40" :src="item.user.avatarUrl+'?param=40y40'"></el-avatar>
            </div>
            <div class="user-info">
              <span
                class="blue mb-5 inline-b cursor"
                @click="getUserInfo(item.user)"
                >{{ item.user.nickname
                }}<span class="vip ml-5" v-if="item.user.vipType != 0"
                  >VIP{{ item.user.vipRights.redVipLevel }}</span
                >：</span
              >
              <span>{{ item.content }}</span>
              <div
                class="reviews-2"
                v-for="(items, index) in item.beReplied"
                :key="index"
              >
                <a class="blue font-12" @click="getUserInfo(item.user)"
                  >@{{ items.user.nickname }}:</a
                >
                <span class="ml-5">{{ items.content }}</span>
              </div>
              <div class="font-12 mt-5">{{ item.timeStr }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { playlistDetail, commentPlayList } from "@/api/discover/detail";
import { playTrackAll } from "@/api/music/music";
import SongHead from "@/components/SongHead";
import SongList from "@/components/SongList";
export default {
  components: { SongHead, SongList },
  name: "detail",
  data() {
    return {
      playlist: {},
      params: {
        id: this.$route.params.id,
        limit: "",
        offset: 0,
      },
      activeName: "song", //默认选中
      list: [],
      comment: "",
      totalReview: "", //总评论数
    };
  },
  // 监听id变化更改list & head 数据
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(newId, oldId) {
        this.params.id = newId;
        this.getPlayTrack();
        this.getComment();
      },
    },
  },
  methods: {
    // // 获取歌单所有歌曲
    getPlayTrack() {
      // 歌单顶部数据
      playlistDetail(this.params).then((res) => {
        this.playlist = res.playlist;
      });
      // 歌单list数据
      playTrackAll(this.params).then((res) => {
        this.list = res.songs;
      });
    },
    // tab切换
    handleClick(tab) {
      console.log(tab);
    },
    // 获取歌单评论
    getComment() {
      commentPlayList(this.params).then((res) => {
        this.totalReview = res.total;
        this.comment = res.comments;
      });
    },
    // 获取用户详情
    getUserInfo(item) {
      this.$router.push({ name: "user", params: { uid: item.userId } });
    },
  },
};
</script>
<style scoped lang="less">
.detail {
  // 内容区域
  margin-bottom:50px;
  .detail-body {
    .comment {
      display: flex;
      border-bottom: 1px solid #eee;
      padding: 15px 0px;

      .user-info {
        text-align: left;
        margin-left: 10px;
        width: calc(100% - 40px);

        span {
          font-size: 12px;
        }

        .reviews-2 {
          background: #f2f2f2;
          padding: 8px 10px;
          border-radius: 5px;
          margin: 5px 0px;
          line-height: 20px;
        }

        .vip {
          color: red;
        }
      }

      .user-avatarUrl {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
