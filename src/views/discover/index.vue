<template>
  <div id="discover-music">
    <nav-bar />
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