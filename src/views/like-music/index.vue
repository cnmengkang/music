<template>
  <div>
    loveMusic
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
      likeList(345288322).then((res) => {
        console.log(res)
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
