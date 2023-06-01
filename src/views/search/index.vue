<template>
  <div class="index-search mt-15">
    <div class="search_head">
      <h1 class="mb-20">搜索：{{ title }}</h1>
      <p>total：{{ songCount }}</p>
    </div>
    <div class="search_body">
      <song-list :tableDate="searchList" />
    </div>
  </div>
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
  created() { },
  mounted() { },
  methods: {

  },
  computed: {
    
  },
};
</script>
<style lang="less" scoped></style>