<template>
    <div class="drawer-index" v-if="isOpen">
        <div class="drawer-background" :style="{ backgroundImage: 'url(' + avatar + ')' }"></div>
        <el-drawer :title="name" :withHeader="true" @close="close" size="100%" :modal="false" :visible.sync="isOpen"
            :direction="direction">
            <div class="footer_drawer flex">
                <div class="left flex justify-content-center">
                    <transition name="rotate">
                        <el-avatar shape="circle" :size="200" :src="avatar" />
                    </transition>
                </div>
                <div class="right">
                    <div class="right-head">
                        <span class="font-12">歌手：{{ authorName }}</span>
                        <span class="font-12">专辑：{{ subtitle }}</span>
                    </div>
                    <div class="right-body">
                        <lyric :lyric="lyric" :space="1" :currentTime="currentTime"></lyric>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import lyric from './lyric'
export default {
    components: { lyric },
    props: {
        singer: {
            type: Object,
            require: true
        },
        lyric: {
            type: String,
            require: true

        },
        currentTime: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            // 弹出层数据
            direction: 'btt',
        };
    },
    methods: {
        close() {
            this.$store.state.musicInfo.isOpen = false;
        }
    },
    computed: {
        name() {
            return this.singer.name;
        },
        avatar() {
            return this.singer.al.picUrl
        },
        subtitle() {
            return this.singer.alia[0]
        },
        authorName() {
            return this.singer.ar[0].name
        },
        isOpen: {
            get() {
                return this.$store.state.musicInfo.isOpen
            },
            set() { }
        }
    },
}
</script>
<style lang="less" scoped>
@height: 521px;
@head: 80px;



.drawer-index {
    width: 100%;
    height: @height;
    top: -@height;
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
        filter: blur(30px);
        transform: scale(2.5);
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
                height: 350px;

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