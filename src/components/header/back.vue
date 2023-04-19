<template>
    <div class="back mr-10 ml-30">
        <el-button @click="goBack" circle size="mini" type="info" icon="el-icon-arrow-left"></el-button>
        <el-button @click="goForward" circle size="mini" type="info" icon="el-icon-arrow-right"></el-button>
    </div>
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {
        };
    },
    created() { },
    mounted() { },
    methods: {
        goBack() {
            history.back()
        },
        goForward() {
            history.forward()
        }
    }
}
</script>
<style lang="less" scoped></style>