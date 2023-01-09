<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item) in tabList" :key="item.id" :label="item.name" :value="item.id"></el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    components: {},
    props: {
        tabList: Array
    },
    data() {
        return {
            activeName: 0
        };
    },
    created() { },
    mounted() { },
    methods: {
        handleClick(tab, event) {
            console.log('tab', tab.$attrs.value);
            console.log('event', event);
        }
    },
    computed: {},
};
</script>
<style lang="less" scoped>

</style>