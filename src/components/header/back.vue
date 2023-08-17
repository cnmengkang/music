<template>
    <el-button-group>
        <el-button @click="goBack" size="small" plain icon="el-icon-arrow-left"></el-button>
        <el-button @click="goForward" size="small" plain><i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
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