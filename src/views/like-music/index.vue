<template>
  <div class="love">
    loveMusic
    <i class="icon iconfont icon-shezhi"></i>
  </div>
</template>
<script>
import { likeList } from '@/api/user/user'
export default {
  name: 'loveMusic',
  data() {
    return {
    }
  },
  created() {
    this.getLikeList()
  },
  methods: {
    getLikeList() {
      console.log(this.$store.state.user.uid)
      likeList(this.$store.state.user).then((res) => {
        console.log(res)
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
