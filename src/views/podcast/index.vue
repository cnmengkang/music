<template>
  <el-card class="blog-index">
    <qr-code></qr-code>
  </el-card>
</template>
<script>
import qrCode from '@/views/login/qrCode';
export default {
  components: { qrCode },
  name: "blog",
  data() {
    return {};
  },
  computed: {},

  methods: {},
};
</script>
