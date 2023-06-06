<template>
  <div id="discover-recommend mb-30">
    <el-card class="mb-15">
      <div class="recommend-banner" style="border-radius: 100%">
        <el-carousel indicator-position="none" height="200px">
          <el-carousel-item v-for="item in banners" :key="item.imageUrl">
            <img :src="item.imageUrl" />
            <span :class="item.titleColor">{{ item.typeTitle }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
    <el-card>
      <h2 class="res-grid-title mb-15">
        <router-link to="/discover/playlist">
          推荐歌单<i class="el-icon-arrow-right"></i>
        </router-link>
      </h2>
      <div class="grid">
        <div class="w-20 mb-15 item">
          <div class="play-img" @click="getDaySong">
            <el-image fit="cover" :src="images" />
            <el-button
              @click.stop="getPlayAllList()"
              circle
              class="iconFont icon-play-red"
            ></el-button>
            <h1 class="today">{{ today }}</h1>
          </div>
          <p class="name">每日歌曲推荐</p>
        </div>
        <!-- 每日推荐歌单 -->
        <play-grid
          v-for="(item, index) in personalized"
          :key="index"
          :name="item.name"
          :picUrl="item.picUrl"
          :playcount="item.playcount"
          :trackCount="item.trackCount"
          :id="item.id"
          :alg="item.alg"
        />
        <!-- 每日推荐歌单 -->
      </div>
    </el-card>
  </div>
</template>
<script>
import { banner, recommendResource } from "@/api/discover/discover";
import playGrid from "@/components/PlayGrid";
export default {
  name: "recommend",
  components: { playGrid },
  data() {
    return {
      banners: "",
      personalized: [],
      params: {
        limit: 0,
        timestamp: new Date().getTime(),
      },
      images: require("../../static/images/day.jpg"),
      today: new Date().getDate(),
    };
  },
  mounted() {
    this.getBanner();
    this.getPersonalized();
  },
  methods: {
    // banner
    getBanner() {
      banner().then((res) => {
        this.banners = res.banners;
      });
    },
    // 每日推荐歌单
    getPersonalized() {
      recommendResource(this.params).then((res) => {
        console.log(res);
        this.personalized = res.recommend;
      });
    },
    // 获取每日推荐
    getDaySong() {
      this.$router.push("daysong");
    },
  },
};
</script>
<style lang="less" scoped>
.today {
  font-size: 5rem;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  font-family: fangsong;
  display: flex;
  text-align: center;
  font-weight: bold;
  color: #fff;
  align-items: center;
  justify-content: center;
}
</style>
