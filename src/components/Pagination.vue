<template>
  <div class="pagination" style="width: 100%" v-if="total > pageSize">
    <el-pagination
      background
      class="text-center mt-10 mb-10"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: {
    total: {
      type: Number,
      required: 0,
    },
    // 总条数
    pageSize: {
      type: Number,
      required: 0,
    },
    // 每页的数据
    currentPage: {
      type: Number,
      required: 0,
    },
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$emit("update:currentPage", currentPage);
    },
  },
};
</script>
