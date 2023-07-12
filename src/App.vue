<template>
  <div id="app">
    <transition name="slide-left">
      <router-view />
      <!-- 111111111111111111111111111111 -->
    </transition>
  </div>
</template> 
<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>