<template>
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" :tab-position="position">
        <slot></slot>
    </el-tabs>
</template>
<script>
export default {
    name: 'Tabs',
    props: {
        position: {
            type: String,
            require: 'top'
        },

    },
    data() {
        return {
            activeTab: '',

        };
    },
    created() { },
    mounted() {
    },
    methods: {
        handleTabClick(tab) {
            this.$emit('tab-click', tab);
        },
    },
};
</script>
<style lang="less" scoped></style>