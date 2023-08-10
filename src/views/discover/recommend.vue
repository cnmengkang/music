<template>
  <div id="discover-recommend mb-30">
    <!-- banner -->
    <el-card class="mb-15">
      <div class="recommend-banner">
        <el-carousel type="card" height="180px">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <img :src="item.imageUrl" :alt="item.typeTitle" />
            <span :class="item.titleColor">{{ item.typeTitle }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
    <!-- banner -->
    <el-card>
      <h2 class="res-grid-title mb-15">
        <router-link to="/discover/playlist">
          推荐歌单<i class="el-icon-arrow-right"></i>
        </router-link>
      </h2>
      <div class="grid">
        <div class="item w-20">
          <router-link to="/daysong">
            <div class="play-img">
              <el-image fit="cover" :src="images" />
              <el-button
                @click.stop="getPlayAllList()"
                circle
                class="iconFont icon-play-red"
              ></el-button>
              <h1 class="today">{{ today }}</h1>
            </div>
          </router-link>
          <p class="name">每日歌曲推荐</p>
        </div>
        <!-- 每日推荐歌单 -->
        <play-grid
          v-for="(item, index) in filterPersonAlized"
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
import {
  banner,
  recommendResource,
  personalized,
} from "@/api/discover/discover";
import playGrid from "@/components/PlayGrid";
export default {
  name: "recommend",
  components: { playGrid },
  data() {
    return {
      bannerList: [],
      personalized: [],
      params: {
        limit: 9,
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
    async getBanner() {
      let result = await banner();
      this.bannerList = result.banners;
    },
    // 每日推荐歌单
    getPersonalized() {
      if (true) {
        recommendResource(this.params).then((res) => {
          this.personalized = res.recommend;
        });
      } else {
        console.log("false login 推荐");
      }
    },
  },
  computed: {
    filterPersonAlized() {
      return this.personalized.splice(0, 9);
    },
  },
};
</script>
<style lang="less" scoped>
.recommend-banner {
  img {
    height: 100%;
  }
}
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
