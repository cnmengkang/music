<template>
  <div class="author flex flex-wrap-nowrap">
    <div class="author-avatar mr-10" @click="drawerOpen">
      <el-avatar shape="square" :size="60" :src="authorAvatar" />
      <i class="el-icon-rank"></i>
    </div>
    <div class="author-singer">
      <div class="font-14 author-flex">
        <div class="ellipsis">
          <span>{{ songName }}</span>
          <span class="alia" v-if="subName">({{ subName }})</span>
        </div>
        <div class="like ml-10 mr-10">
          <span>❤</span>
        </div>
      </div>
      <div class="mt-5 ellipsis" :title="authorName">
        <span class="font-12">{{ authorName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      player: (state) => state.player,
      songName: (state) => state.player.singer.songName,
      authorAvatar: (state) => state.player.singer.authorAvatar,
      subName: (state) => state.player.singer.subName,
      author: (state) => state.player.singer.authorName,
    }),
    authorName() {
      return [...this.author.map((obj) => obj.name)].join("/");
    },
  },
  methods: {
    ...mapActions(["drawerOpen"]),
  },
};
</script>
<style lang="less" scoped>
.alia {
  color: #ccc;
}

.author {
  width: 100%;

  .author-flex {
    display: flex;
  }

  .author-singer {
    width: 80%;
  }

  .author-avatar {
    cursor: pointer;
    position: relative;
    transition: all .1s linear;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: #fff;
      font-weight: 500;
      z-index: -1;
    }
    &:hover {
      span {
        opacity: 0.5;
      }
      i {
        z-index: 2;
      }
    }
  }
}

.flex-wrap-nowrap {
  flex-wrap: nowrap;
}
</style>
