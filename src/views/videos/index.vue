<template>
  <el-card class="videos-index">
    <tabs @tab-click="handleClick" :tabsName="activeName">
      <el-tab-pane label="视频" name="video">
        <div class="videos">
          <div class="video-tabs">
            <el-button @click="isShow = !isShow">{{ tabsName || '全部视频' }}</el-button>
            <tabs :tabsName="tabsName" @tab-click="handClickTabs">
              <el-tab-pane v-for="item in tabsList" :key="item.id" :name="item.name" :label="item.name"
                :value="item.id"></el-tab-pane>
            </tabs>
          </div>
          <el-card class="box-card" v-if="isShow">
            <div slot="header" class="clearfix">
              <p class="text-left" @click="getVideoAll"><a>全部视频</a></p>
            </div>
            <!-- 标签列表 -->
            <div class="card_body">
              <el-tag type="plain" v-for="item in videoCategoryList" @click="getTabsList(item)" :key="item.id"
                :class="activeClass == item.id ? 'active' : ''">
                <a>{{ item.name }}</a>
              </el-tag>
            </div>
          </el-card>
        </div>
        <video-grid :videoGroups="allVideo"></video-grid>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="videos_scroll" v-infinite-scroll="load"></div>
        <video-mv></video-mv>
      </el-tab-pane>
    </tabs>
  </el-card>
</template>
<script>
import { videoCategoryList, videoGroup, videoAll, videoGroupList } from '@/api/video/video';
import Tabs from '@/components/Tabs'
import videoGrid from '@/components/VideoGrid'
import videoMv from './mv.vue'
export default {
  components: { Tabs, videoGrid, videoMv },
  name: "videos",
  data() {
    return {
      allVideo: [],
      params: {
        id: 0,
        offset: 1,
      },
      tabsList: '',
      CategoryList: '',
      activeClass: -1,
      isShow: false,
      activeName: 'video',
      tabsName: '',
      videoCategoryList: ''
    }
  },
  mounted() {
    this.getIdShowName(this.$route.params);
    this.getVideoAll();
    this.getVideoGroupList();
    this.getVideoCategoryList();
  },
  methods: {
    // 点击获取分类id，并隐藏弹框
    getTabsList(item) {
      this.getIdShowName(item);
    },
    // 点击右侧分类
    handClickTabs(item) {
      const res = { id: item.$attrs.value, name: item.name }
      this.getIdShowName(res);
    },
    handleClick(tab) {
      this.activeName = tab.name;
    },
    getIdShowName(item) {
      if (!item.id) return;
      this.params.id = item.id
      this.tabsName = item.name;
      this.isShow = false;
      this.getVideoGroup();
    },
    // 获取所有视频分类列表
    getVideoGroupList() {
      videoGroupList().then(res => {
        this.videoCategoryList = res.data;
      })

    },
    getVideoCategoryList() {
      videoCategoryList().then(res => {
        this.tabsList = res.data;
      })
    },
    // 根据id获取视频分类
    getVideoGroup() {
      videoGroup(this.params).then(res => {
        this.allVideo = res.datas;
      })

    },
    getVideoAll() {
      this.isShow = false;
      videoAll().then(res => {
        this.allVideo = res.datas;
      })
    }
  }
}
</script>
<style lang="less" scope>
.videos-index {
  .videos {
    .video-tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .box-card {
      width: 80%;
      height: 520px;
      overflow-y: scroll;
      transition: all .4s linear;

      .card_body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .active {
          background: #ffc0cb;
          color: #fff;
        }
      }
    }
  }
}

.videos-index .el-tabs .el-tabs__header {
  position: sticky;
  top: 0px;
  z-index: 99;
  background: #fff;

  .el-tag {
    width: 16.66%;
    text-align: center;
    background: #fff;
    border: none;
    line-height: 30px;
  }
}
</style>