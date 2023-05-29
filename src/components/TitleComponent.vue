<template>
    <el-page-header @back="Back" :content="title">
    </el-page-header>
</template>
  
<script>
export default {
    name: 'TitleComponent',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        Back() {
            history.back()
        }
    }
};
</script>
  
<style scoped lang="less">
.title-component {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.title-component {
    i {
        font-size: 16px;
    }
}
</style>
  