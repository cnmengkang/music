<template>
  <div class="header">
    <div class="left flex">
      <div class="header-logo" v-if="!drawer">
        <a href="#">
          <img src="../../static/images/logo.png" />
        </a>
      </div>
      <back/>
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
  margin: 0 auto;
  display: flex;
  .left{
    flex-wrap: nowrap;
    gap: 15px;
  }
  .right {
    justify-content: flex-end;
  }

  .header-logo {

    a {
      width: 40px;
      display: inline-block;

      img {
        width: 100%;
      }
    }

  }
}</style>
