<template>
    <div class="back mr-10">
        <el-button @click="goBack" plain circle size="mini" type="info" icon="el-icon-arrow-left"></el-button>
        <el-button @click="goForward" plain circle size="mini" type="info" icon="el-icon-arrow-right"></el-button>
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
    methods:{
        goBack(){
            console.log('back',history.length)
            history.back()
        },
        goForward(){
            console.log('forward',history.length)
            history.forward()
        }
    }
}
</script>
<style lang="less" scoped>

</style>