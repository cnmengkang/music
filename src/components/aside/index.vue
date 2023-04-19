<template>
  <div id="aside-index">
    <asideLeft />
  </div>
</template>
<script>
import asideLeft from "./asideLeft.vue";
export default {
  name: "index",
  components: {
    asideLeft,
  },
};
</script>
<style lang="less" scoped>
#aside-index {
  padding: 0px 5px 0px 15px;
}
</style>
