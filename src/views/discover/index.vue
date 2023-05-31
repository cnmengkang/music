<template>
  <div id="discover-music">
    <el-card class="mb-15">
      <nav-bar />
    </el-card>
    <!-- 菜单tabs -->
    <router-view />
  </div>
</template>
<script>
import navBar from './components/navBar'
export default {
  name: "index",
  components: { navBar },

};
</script>