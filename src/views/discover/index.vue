<template>
  <div id="discover-music">
    <nav-tabs />
    <!-- 菜单tabs -->
    <router-view />
  </div>
</template>
<script>
import navTabs from './components/navTabs'
export default {
  name: "index",
  components: { navTabs },
  
};
</script>