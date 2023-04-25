<template>
    <el-drawer :title="musicInfo.title" :withHeader="true" @open="drawerOpen" size="100%" :modal="false"
        :visible.sync="drawer" :direction="direction">
        <div class="footer_drawer flex">
            <!-- <div class="left flex justify-content-center">
                    <el-avatar shape="circle" :size="200" :src="singer.avatar" />
                </div> -->
            <div class="right">
                <!-- <div class="right-head">
                        <span class="font-12" v-for="item in singer.name" :key="item.id">歌手：{{ item.name }}</span>
                        <span class="font-12">专辑：{{ singer.title }}</span>
                    </div> -->
                <div class="right-body">
                    歌词
                </div>
            </div>
        </div>
    </el-drawer>
</template>
<script>
export default {
    components: {},
    props: {},
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
};
</script>
<style lang="less" scoped>
@height: 520px;
@head: 80px;
.el-drawer__wrapper {
    position: absolute;
    top: -@height;
    bottom: 70px;

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