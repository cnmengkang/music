<template>
  <div class="header flex">
    <div class="header-logo">logo</div>
    <back class="ml-30" />
    <search />
  </div>
</template>

<script>
import search from './search.vue'
import back from './back.vue'
export default {
  components: { search, back },
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  .header-logo {
    width: 180px;
  }
}
</style>