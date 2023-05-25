<template>
    <div class="drawer-index">
        <div>
            <div class="drawer-background" :style="'background-image:url(' + avatar + ')'"></div>
            <el-drawer :title="name" :withHeader="true" :show-close="false" :modal="false" size="100%"
                :direction="direction" :visible.sync="drawer">
                <div class="footer_drawer flex">
                    <div class="left flex justify-content-center">
                        <div class="router">
                            <el-avatar shape="circle" :size="200" :src="avatar" />
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-head">
                            <span class="font-14 ml-15 mr-15">歌手：{{ authorName }}</span>
                            <span class="font-14">专辑：{{ name }}</span>
                        </div>
                        <div class="right-body">
                            <lyric :lyric="lyric" :space="1" :currentTime="currentTime"></lyric>
                        </div>
                    </div>
                </div>
            </el-drawer>
        </div>
    </div>
</template>
<script>
import Lyric from '@/components/Lyric'
export default {
    components: { Lyric },
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
        },
    },
    data() {
        return {
            direction: 'btt',
            drawer: true
        }
    },
    computed: {
        name() {
            return this.singer.songName;
        },
        avatar() {
            return this.singer.authorAvatar;
        },
        subtitle() {
            return this.singer.alia[0];
        },
        authorName() {
            return [...this.singer.authorName.map(obj => obj.name)].join(' / ');
        },
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
        background-size: 6000px;
        background-position: center center;
        filter: blur(30px);
        transform: scale(2.5);
        background-color: #ccc;
    }
}

.rotate {
    animation: rotation 50s infinite linear;
    transition: all 1s linear;
    transform-origin: center center;
}

@keyframes rotation {
    form {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.el-drawer__wrapper {
    position: absolute;

    .footer_drawer {
        padding: 0px 5%;

        .bgc-radius {
            border: 20px solid #ccc9;
            border-radius: 50%;
        }

        .left,
        .right {
            width: 50%;
            height: @height - @head;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;

            .right-head {
                text-align: center;

                span {
                    color: #fff;
                }
            }

            .right-body {
                width: 100%;
                height: 350px;

                ul {
                    li {
                        text-align: center;
                        color: #fff;
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