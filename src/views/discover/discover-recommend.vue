<template>
  <div id="discover-recommend">
    <el-carousel :interval="2000" type="card" :autoplay="false" height="200px">
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <a href="#">
          <img :src="item.imageUrl" />
          <span :class="item.titleColor">{{ item.typeTitle }}</span>
        </a>
      </el-carousel-item>
    </el-carousel>
    <!-- banner -->

    <!-- 每日推荐歌单 -->
  </div>
</template>
<script>
import { banner,recommend } from "@/api/discover";
export default {
  name: "recommend",
  data() {
    return {
      type: 0,
      banners: {},
    };
  },
  created() {
    this.getBanner();
    this.getRecommend()
  },
  methods: {
    // banner
    getBanner() {
      banner(this.type).then((res) => {
        console.log(res);
        this.banners = res.banners;
      });
    },
    getRecommend(){
      recommend().then((res=>{
        console.log(res)
      }))
    }
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
      img {
        width: 100%;
        border-radius: 10px;
        position: relative;
      }
    }
    .el-carousel__indicators {
      .button {
        border-radius: 100%;
      }
    }
  }
}
</style>
