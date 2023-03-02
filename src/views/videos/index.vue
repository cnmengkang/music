<template>
  <div id="videos-index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="视频" name="video">
        <div class="videos">
          <div class="video-tabs">
            <el-button @click="show">{{ name ? name : '全部视频' }}</el-button>
            <el-tabs @tab-click="handClickTabs">
              <el-tab-pane v-for="(item) in tabList" :key="item.id" :label="item.name" :value="item.id"></el-tab-pane>
            </el-tabs>
          </div>
          <el-card class="box-card" v-if="isShow">
            <div slot="header" class="clearfix">
              <p class="text-left" @click="getVideoAll"><a>全部视频</a></p>
            </div>
            <!-- 标签列表 -->
            <div class="card_body">
              <el-tag round v-for="(item, index) in videoListBtn" @click="isActive(item, index)" :key="index"
                :class="activeClass == index ? 'active' : ''">
                <a>{{ item.name }}</a>
              </el-tag>
            </div>
          </el-card>
        </div>
        <!-- badyGrid -->
        <video-grid :videoGroups="videoGroups"></video-grid>
      </el-tab-pane>
      <el-tab-pane label="MV" name="MV">
        <video-mv></video-mv>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import { videoList, videoCategory, videoGroup, videoAll } from '@/api/video/video';
import tabs from '@/components/body/tabs'
import videoGrid from '@/components/body/videogrid'
import headTitle from '@/components/header/title'
import videoMv from './mv.vue'
export default {
  components: { tabs, videoGrid, headTitle, videoMv },
  name: "videos",
  data() {
    return {
      videoListBtn: [],
      activeClass: -1,
      isShow: false,
      name: '',
      activeName: 'video',
      tabList: [],
      videoGroups: [],
      offset: 0
    };
  },
  created() {

  },
  mounted() {
    this.getVideoList()
    this.getVideoCategory()
    this.getVideoAll()
  },
  methods: {
    // 点击顶部视频MV调用接口
    handleClick(tab) {
      console.log('tab', tab);
    },
    // 获取全部分类按钮
    getVideoList() {
      videoList().then((res) => {
        this.videoListBtn = res.data
      })
    },
    // 获取右侧分类tabs菜单
    getVideoCategory() {
      videoCategory().then(res => {
        this.tabList = res.data;
      })
    },
    // 点击获取分类id，并隐藏弹框
    isActive(res, index) {
      this.name = res.name
      this.activeClass = index;
      this.isShow = false
      this.getVideoGroup(res.id)
    },
    // 点击显示弹框
    show() {
      this.isShow = true
    },
    // 获取视频详情
    getVideoGroup(id) {
      videoGroup(id).then(res => {
        this.videoGroups = res.datas
      })
    },
    // 点击右侧分类
    handClickTabs(id) {
      this.getVideoGroup(id.$attrs.value)
      this.isShow = false
    },
    // 默认获取全部视频
    getVideoAll() {
      videoAll().then(res => {
        this.videoGroups = res.datas
        this.isShow = false
      })
    },
  }
};
</script>

<style lang="less" scope>
#videos-index .el-tabs .el-tabs__header {
  position: sticky;
  top: 0px;
  z-index: 99;
  background: #fff;
}

.box-card {
  width: 80%;
  height: 520px;
  overflow-y: scroll;
  transition: all .4s linear;
}

.video-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card_body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 15px 0px;
}

.el-tag {
  width: 16.66%;
  text-align: center;
  background: #fff;
  border: none;
  line-height: 30px;
}

.active {
  background: #ffc0cb;
  color: #fff;
}
</style>