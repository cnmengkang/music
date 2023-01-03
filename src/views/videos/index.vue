<template>
  <div id="videos-index">
    <category-menu></category-menu>
  </div>
</template>

<script>
import categoryMenu from '@/components/body/categorymenu'
export default {
  components: { categoryMenu },
  name: "videos",
  data() {
    return {
      videoList: [],
      activeClass: -1
    };
  },
  created() {

  },
  methods: {

  }
};
</script>

