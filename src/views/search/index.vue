<template>
  <el-card class="index-search">
    <div class="search_head">
      <h1 class="mb-20">搜索：{{ title }}--Total:{{ songCount }}</h1>
    </div>
    <div class="search_body">
      <song-list :tableDate="searchList" />
    </div>
  </el-card>
</template>
<script>
import SongList from '@/components/SongList'
import { mapState } from 'vuex';
export default {
  components: { SongList },
  props: {},
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      title: state => state.cloudsearch.title,
      songCount: state => state.cloudsearch.songCount,
      searchList: state => state.cloudsearch.searchList
    })
  }
}
</script>