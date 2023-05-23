<template>
  <div id="videos-index">
    <tabs @tab-click="handleClick" :tabsName="activeName">
      <el-tab-pane label="视频" name="video">
        <div class="videos">
          <div class="video-tabs">
            <el-button @click="show">{{ tabsName || '全部视频' }}</el-button>
            <tabs :tabsName="tabsName" @tab-click="handClickTabs">
              <el-tab-pane v-for="item in tabList" :key="item.id" :name="item.name" :label="item.name"
                :value="item.id"></el-tab-pane>
            </tabs>
          </div>
          <el-card class="box-card" v-if="isShow">
            <div slot="header" class="clearfix">
              <p class="text-left" @click="getVideoAll"><a>全部视频</a></p>
            </div>
            <!-- 标签列表 -->
            <div class="card_body">
              <el-tag round v-for="item in videoListBtn" @click="isActive(item)" :key="item.id"
                :class="activeClass == item.id ? 'active' : ''">
                <a>{{ item.name }}</a>
              </el-tag>
            </div>
          </el-card>
        </div>
        <video-grid :videoGroups="videoGroups"></video-grid>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <video-mv></video-mv>
      </el-tab-pane>
    </tabs>
  </div>
</template>
<script>
import { videoList, videoCategory, videoGroup, videoAll } from '@/api/video/video';
import Tabs from '@/components/Tabs'
import videoGrid from '@/components/body/videogrid'
import videoMv from './mv.vue'
export default {
  components: { Tabs, videoGrid, videoMv },
  name: "videos",
  data() {
    return {
      videoListBtn: [],
      activeClass: -1,
      isShow: false,
      name: '',
      activeName: 'video',
      tabsName: '',
      tabList: [],
      videoGroups: [],
      params: {
        id: 0,
        offset: 0

      }
    };
  },
  mounted() {
    this.getVideoList();
    this.getVideoCategory();
    this.getVideoAll();
  },
  methods: {
    getVideoList() {
      videoList().then((res) => {
        this.videoListBtn = res.data;
      })
    },
    // 获取右侧分类tabs菜单
    getVideoCategory() {
      videoCategory().then(res => {
        this.tabList = res.data;
      })
    },
    // 点击获取分类id，并隐藏弹框
    isActive(res) {
      this.isShow = false;
      this.tabsName = res.name;
      this.activeClass = res.id;
      this.params.id = res.id;
      this.getVideoGroup();
    },
    // 点击显示弹框
    show() {
      this.isShow = true;
    },
    // 获取点击标签下的视频展示
    getVideoGroup() {
      videoGroup(this.params).then(res => {
        this.videoGroups = res.datas;
      })
    },
    // 点击右侧分类
    handClickTabs(tab) {
      console.log(tab)
      this.tabsName = tab.label;
      this.params.id = tab.$attrs.value;
      this.getVideoGroup();
      this.isShow = false;
    },
    // 默认获取全部视频
    getVideoAll() {
      videoAll().then(res => {
        this.videoGroups = res.datas;
        this.isShow = false;
      })
    },
    handleClick(tab) {
      console.log(tab)
      this.activeName = tab.name;
    }
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