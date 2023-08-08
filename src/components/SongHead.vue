<template>
  <!-- 详情页面顶部组件 -->
  <el-card class="mb-15">
    <div class="head" v-if="tableHead">
      <div class="detail-left">
        <el-avatar
          :size="size"
          shape="square"
          icon="el-icon-user-solid"
          :src="coverImgUrl"
        ></el-avatar>
      </div>
      <div class="detail-right">
        <div class="right-title flex">
          <span class="song mr-10">歌单</span>
          <h2>{{ name }}</h2>
        </div>
        <div class="right-creator" v-if="tableHead.creator">
          <a class="userInfo font-12" @click="getUserInfo(tableHead)">
            <el-avatar :src="avatarUrl" class="mr-5" :size="30"></el-avatar>
            <span class="mr-5 blue">{{ nickname }}</span>
          </a>
          <div class="createTime">
            {{ parseTime(tableHead.createTime, "{y}-{m}-{d}") }}创建
          </div>
        </div>
        <div class="flex">
          <el-button-group>
            <el-button
              round
              size="mini"
              type="danger"
              icon="el-icon-video-play"
              @click="playTrack(tableHead)"
              >播放全部</el-button
            >
          </el-button-group>
        </div>
        <div class="algTags font-14" v-if="algTags">
          标签：<a
            class="mr-10"
            v-for="(item, index) in algTags"
            :key="index"
            >{{ item }}</a
          >
        </div>
        <div class="font-14" style="width: 100%">
          <span class="mr-20">歌曲：{{ tableHead.trackCount }}</span>
          <span>播放：{{ $playTime(tableHead.playCount) }}</span>
        </div>
        <el-collapse-transition>
          <div
            @click="toggle"
            style="overflow: hidden"
            v-if="tableHead.description"
          >
            <div class="transition-box cursor">
              <p :class="{ ellipsis: isActive }">
                简介：{{ tableHead.description }}
              </p>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </el-card>
  <!-- 详情页面顶部组件 -->
</template>
<script>
export default {
  props: {
    tableHead: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isActive: true,
      params: {
        ids: 0,
        index: 0,
        play: "all",
      },
      size: 180,
    };
  },
  computed: {
    name() {
      return this.tableHead.name;
    },
    // 封面图
    coverImgUrl() {
      return this.tableHead.coverImgUrl;
    },
    avatarUrl() {
      return this.tableHead.creator.avatarUrl + "?param=30y30";
    },
    nickname() {
      return this.tableHead.creator.nickname;
    },
    algTags() {
      return this.tableHead.algTags;
    },
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    getUserInfo(item) {
      this.$router.push({ name: "user", params: { uid: item.userId } });
    },
    playTrack(track) {
      this.params.ids = track.id;
      this.$store.dispatch("getCurrentMusicIsPlay", this.params);
    },
  },
};
</script>
<style lang="less" scoped>
.head {
  display: flex;
  text-align: left;
  justify-content: flex-start;
  gap: 20px;

  .detail-right {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 10px;
    align-content: flex-start;

    .right-creator,
    .userInfo {
      display: flex;
      align-items: center;
    }

    .song {
      color: #f00;
      border: 1px solid #f00;
      padding: 2px 3px;
      font-size: 14px;
      border-radius: 3px;
    }
  }
}
</style>
