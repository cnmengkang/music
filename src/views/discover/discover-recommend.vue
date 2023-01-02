<template>

  <div id="discover-recommend">
    <div class="recommend-banner">
      <el-carousel :interval="4000" type="card" indicator-position="none" height="200px">
        <el-carousel-item v-for="item in banners" :key="item.imageUrl">
          <a :href="item.url == '' ? '#' : item.url">
            <img :src="item.imageUrl" />
            <span :class="item.titleColor">{{ item.typeTitle }}</span>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- banner -->
    <div class="recommend-resource">
      <div class="resource-grid">
        <h2 class="res-grid-title">推荐歌单<i class="el-icon-arrow-right"></i> </h2>
        <ul>
          <router-link to="daysong">
            <li>
              <div class="box">
                <el-avatar shape="square" :size="150"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="1111"></el-avatar>
              </div>
              <span class="title">每日歌曲推荐</span>
            </li>
          </router-link>
          <li v-for="(item) in personalized" @click="getRecommendDetail(item.id)" :key="item.id">
            <div class="box">
              <el-avatar shape="square" :size="150" :src="item.picUrl" :alt="item.alg"></el-avatar>
            </div>
            <span class="playCount font-12"><i class="el-icon-caret-right"></i>{{ numCount(item.playCount) }}</span>
            <p class="title">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 每日推荐歌单 -->
  </div>
</template>
<script>
import { banner, personalized } from "@/api/discover/discover";
export default {
  name: "recommend",
  data() {
    return {
      banners: "",
      personalized:'',
      person:{
        limit:9
      }
    };
  },
  // 
  computed: {
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
          console.log(res)
      });
    },
    getRecommendDetail(id) {
      this.$emit('detail', id)
      this.$router.push({ name: 'detail', params: { id: id } })

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
