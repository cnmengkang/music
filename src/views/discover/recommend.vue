<template>
  <div id="discover-recommend">
    <div class="recommend-banner">
      <el-carousel :interval="4000" type="card" indicator-position="none" height="210px">
        <el-carousel-item v-for="item in banners" :key="item.imageUrl">
          <a :href="item.url || ''" target="_blank">
            <el-image fit="fill" :src="item.imageUrl" />
            <span :class="item.titleColor">{{ item.typeTitle }}</span>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <h2 class="res-grid-title mb-15">
      <router-link to="/discover/playlist">
        推荐歌单<i class="el-icon-arrow-right"></i>
      </router-link>
    </h2>
    <!-- 每日推荐歌单 -->
    <play-grid :playlist="personalized" />
    <!-- 每日推荐歌单 -->
  </div>
</template>
<script>
import { banner, personalized } from "@/api/discover/discover";
import playGrid from '@/components/PlayGrid'
export default {
  name: "recommend",
  components: { playGrid },
  data() {
    return {
      banners: "",
      personalized: [],
      person: {
        limit: 9
      }
    };
  },
  mounted() {
    this.getBanner()
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
      personalized(this.person).then((res) => {
        this.personalized = res.result
      });
    },
  },
};
</script>
<style scoped lang="less">
#discover-music {
  .el-carousel {
    .el-carousel__item {
      border-radius: 10px;

      a {
        width: 100%;
        height: 100%;
        display: inline-block;

        span {
          position: absolute;
          bottom: 44px;
          z-index: 2;
          right: 0px;
          color: #fff;
          font-size: 14px;
          padding: 2px 10px;
          border-radius: 10px 0px;
        }

        .red {
          background: red;
          overflow: hidden;
        }

        .blue {
          background: blue;
        }
      }

    }

    .el-carousel__indicators {
      .button {
        border-radius: 100%;
      }
    }
  }

  // banner
  .recommend-resource {
    .resource-grid {
      h4 {
        text-align: left;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
          position: relative;
          cursor: pointer;



          .title {
            font-size: 14px;
            white-space: normal;
            display: inline-block;
            margin: 5px 0px;
            text-align: left;
            width: 150px;
          }

          .playCount {
            display: block;
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
