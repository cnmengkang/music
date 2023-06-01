<template>
  <div class="aside-left">
    <ul class="menu_list cursor">
      <li class="mb-5" v-for="item in data" @click="handActivePath(item.index)" :key="item.id"> <a>{{ item.name }}</a>
      </li>
      <template v-if="isLogin">
        <span class="font-12 my">创建歌单</span>
        <template v-for="item in playlist">
          <li class="font-12 mb-5 ellipsis" :title="item.name" v-if="!item.subscribed" @click="handSelectIndex(item.id)"
            :key="item.id"><a>{{
              item.name }}</a></li>
        </template>
      </template>
      <template v-if="isLogin">
        <span class="font-12 my">收藏歌单</span>
        <template v-for="item in playlist">
          <li class="font-12 mb-5 ellipsis" :title="item.name" @click="handSelectIndex(item.id)" v-if="item.subscribed"
            :key="item.id"><a>{{ item.name
            }}</a></li>
        </template>
      </template>
    </ul>
  </div>
</template>
<script>
import { userPlaylist } from '@/api/user/user';
import { mapState } from 'vuex';
export default {
  name: "asideLeft",
  data() {
    return {
      data: [
        { name: '发现音乐', index: '/discover' },
        { name: '博客', index: '/podcast' },
        { name: '视频', index: '/video/全部视频' },
        { name: '私人漫游', index: '/private' },
      ],
      playlist: '',
      params: {
        uid: this.$store.state.uid,
      },
    };
  },
  mounted() {
    this.getUserPlaylist();
  },
  methods: {
    handSelectIndex(res) {
      this.$router.push({ name: 'detail', params: { id: res } })
    },
    handActivePath(path) {
      this.$router.push(path)
    },
    getUserPlaylist() {
      userPlaylist(this.params).then(res => {
        if (res.code != 200) return;
        this.playlist = res.playlist;
      })
    },
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  }
}
</script>
<style scoped lang="less">
.aside-left {
  width: 100%;
  .menu_list {
    span {
      padding: 10px;
      display: block;
      color: #ccc;
    }

    li {
      height: 35px;
      line-height: 35px;
      transition: all 0.3s linear;
      border-radius: 4px;
      font-size: 16px;

      a {
        padding-left: 15px;
      }

      &:hover {
        background: rgb(236, 94, 118);
      }

      &:active {
        background: red;
      }
    }

  }
}
</style>
