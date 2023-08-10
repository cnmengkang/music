<template>
  <el-card class="topList">
    <TitleComponent title="相关推荐"></TitleComponent>
    <div class="top-grid">
      <div
        :class="['grid mb-15', index > 3 ? 'item' : '']"
        v-for="(item, index) in topListDetail"
        :key="index"
      >
        <TitleComponent title="全球榜" v-if="index == 4"></TitleComponent>
        <div class="left list" @click="btnDetail(item.id)">
          <img :src="item.coverImgUrl + '?param=140y140'" />
          <el-button
            @click.stop="getCurrentMusicId(item, (index = 0))"
            size="medium"
            circle
            class="iconFont icon-play-red"
          ></el-button>
        </div>
        <div class="right list w-80 ml-10" v-if="item.tracks.length >= 3">
          <ul>
            <li
              v-for="(items, index) in item.tracks"
              :key="index"
              @dblclick="getCurrentMusicId(item, index)"
            >
              <span class="title">{{ index + 1 }}</span>
              <div>{{ items.first }}</div>
              <div class="second">{{ items.second }}</div>
            </li>
            <span class="topListAll cursor" @click="btnDetail(item.id)"
              >查看全部&nbsp;<i class="el-icon-arrow-right"></i>
            </span>
          </ul>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { topList, topListDetail } from "@/api/discover/topList";
import TitleComponent from "@/components/TitleComponent";
export default {
  components: { TitleComponent },
  name: "topList",
  data() {
    return {
      topList: "",
      topListDetail: [],
      // 单曲播放调用
      params: {
        ids: 0,
        index: 0,
        play: "all",
      },
    };
  },
  mounted() {
    this.getTopList();
    this.getTopListDetail();
  },
  methods: {
    async getTopList() {
      let { list } = await topList();
      this.topList = list;
    },
    async getTopListDetail() {
      let { list } = await topListDetail();
      this.topListDetail = list;
    },
    btnDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    // 播放歌曲按钮
    getCurrentMusicId(item, index) {
      this.params.index = index;
      this.params.ids = item.id;
      this.$store.dispatch("getCurrentMusicIsPlay", this.params);
    },
  },
};
</script>
<style lang="less" scoped>
.topList {
  .top-grid {
    .grid {
      display: flex;
      flex-wrap: wrap;
    }
    .item {
      display: inline-block;
      margin-right: 19px;
    }
    .left {
      border-radius: 10px;
      position: relative;
      .el-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: red;
        display: none;
      }
      &:hover {
        .el-button {
          display: block;
        }
      }
      img {
        border-radius: 10px;
      }
    }

    .right {
      ul {
        .topListAll {
          font-size: 12px;
          text-align: left;
          padding: 0px 10px;
          display: flex;
          line-height: 35px;
          height: 35px;
          align-items: center;
        }
      }

      li {
        text-align: left;
        height: 35px;
        line-height: 35px;
        border-radius: 4px;
        position: relative;
        font-size: 12px;
        color: #000;

        .title {
          padding: 0px 10px;
        }

        div {
          display: inline-block;
        }

        .second {
          position: absolute;
          right: 10px;
          color: #a59595;
        }
      }

      li:hover,
      .li:active {
        background: #f2f2f2;
        border-radius: 4px;
      }
    }
  }
}
</style>
