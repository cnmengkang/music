<template>
  <div class="header">
    <div class="left flex">
      <div class="header-logo" v-if="!drawer">
        <h1>
          <a href="#"></a>
        </h1>
      </div>
      <search />
    </div>
    <div class="right flex">
      <user-info></user-info>
    </div>
  </div>
</template>
<script>
import search from "./search";
import back from "./back";
import UserInfo from "./UserInfo";
import { mapState } from "vuex";
export default {
  components: { search, back, UserInfo },
  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
    }),
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  .right {
    justify-content: flex-end;
  }
  .header-logo {
    width: 180px;
    height: 60px;
    background: url(../../static/images/topbar.png) no-repeat 0 9999px;
    background-position: 0px -6px;
    filter: contrast(0.5);
  }
}
</style>
