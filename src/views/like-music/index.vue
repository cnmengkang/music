<template>
  <div class="love">
    loveMusic
    <i class="icon iconfont icon-shezhi"></i>
  </div>
</template>
<script>
// import { lyric } from '@/api/music/music'
// import lyricList from '@/components/footer/lyrics'
export default {
  name: 'loveMusic',
  components: { lyricList },
  data() {
    return {
    }
  },
  mounted() {
    // this.getLikeList()
  },
  methods: {
    // getLikeList() {
    //   console.log(this.$store.state.user.uid)
    //   likeList(this.$store.state.user).then((res) => {
    //     console.log(res)
    //   })
    // }


  },
}
</script>
<style lang="less" scoped>
.love{
  position: relative;
}
</style>
