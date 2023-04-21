<template>
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <slot></slot>
    </el-tabs>
</template>
<script>
export default {
    name: 'Tabs',
    props: {},
    data() {
        return {
            activeTab: ''
        };
    },
    created() { },
    mounted() { },
    methods: {
        handleTabClick(tab) {
            this.$emit('tab-click', tab);
        },
    },
};
</script>
<style lang="less" scoped></style>