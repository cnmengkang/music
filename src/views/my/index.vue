<template>
  <div class="my">
    Fm
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      id: 0,
      creator: {}
    };
  },
  methods: {
    getDetail(id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    },
  },
};
</script>
<style lang="less" scoped></style>