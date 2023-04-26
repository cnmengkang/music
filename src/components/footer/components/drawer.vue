<template>
    <div class="drawer-index" v-if="drawer">
        <div class="drawer-background" :style="{ backgroundImage: 'url(' + musicInfo.avatar + ')' }"></div>
        <el-drawer :title="musicInfo.title" :withHeader="true" @open="drawerOpen" size="100%" :modal="false"
            :visible.sync="drawer" :direction="direction">
            <div class="footer_drawer flex">
                <div class="left flex justify-content-center">
                    <el-avatar shape="circle" :size="200" :src="musicInfo.avatar" />
                </div>
                <div class="right">
                    <div class="right-head">
                        <span class="font-12" v-for="item in musicInfo.name" :key="item.id">歌手：{{ item.name }}</span>
                        <span class="font-12">专辑：{{ musicInfo.title }}</span>
                    </div>
                    <div class="right-body">
                        歌词
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    props: {
        musicInfo: Object,
    },
    data() {
        return {
            // 弹出层数据
            direction: 'btt',
            drawer: false
        };
    },
    created() { },
    mounted() { },
    methods: {
        drawerOpen() {

        }
    },
    computed: {},
}
</script>
<style lang="less" scoped>
@height: 520px;
@head: 80px;

.drawer-index {
    width: 100%;
    height: 520px;
    top: -520px;
    left: 0px;
    position: absolute;
    right: 0px;
    z-index: 20;
    overflow: hidden;

    .drawer-background {
        width: 100%;
        position: absolute;
        height: @height;
        z-index: -1;
        background-size: cover;
        background-position: center;
        filter: blur(20px);
        transform: scale(2);
    }
}


.el-drawer__wrapper {
    position: absolute;

    .footer_drawer {
        padding: 0px 5%;

        .left,
        .right {
            width: 50%;
            height: @height - @head;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;

            .right-body {
                width: 100%;
                overflow-y: scroll;
                height: @height - @head;

                ul {

                    li {
                        text-align: center;
                        color: #ccc;
                        font-size: 14px;
                        height: auto;
                        line-height: 32px;
                    }
                }
            }
        }
    }
}
</style>