<template>
    <div class="drawer-index">
        <div class="drawer-background" :style="'background-image:url(' + authorAvatar + ')'"></div>
        <el-drawer :title="songName" :withHeader="true" :show-close="false" :modal="false" size="100%"
            :direction="direction" :visible.sync="drawer">
            <div class="footer_drawer flex">
                <div class="left flex justify-content-center">
                    <div class="router">
                        <el-avatar shape="circle" :size="200" :src="authorAvatar" />
                    </div>
                </div>
                <div class="right">
                    <div class="right-head">
                        <span class="font-14 ml-15 mr-15">歌手：{{ authorName }}</span>
                        <!-- <span class="font-14">专辑：{{ subName }}</span> -->
                    </div>
                    <div class="right-body">
                        <lyric></lyric>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import Lyric from '@/components/Lyric';
import { mapState } from 'vuex';
export default {
    components: { Lyric },
    data() {
        return {
            direction: 'btt',
            drawer: true
        }
    },
    computed: {
        ...mapState({
            player: state => state.player,
            songName: state => state.player.singer.songName,
            authorAvatar: state => state.player.singer.authorAvatar,
            subName: state => state.player.singer.subName,
            author: state => state.player.singer.authorName
        }),
        authorName() {
            return [...this.author.map(obj => obj.name)].join(' / ');
        }
    },
}
</script>
<style lang="less" scoped>
@height: 600px;
@head: 80px;

.drawer-index {
    top: 60px;
    left: 0px;
    bottom: 70px;
    position: fixed;
    right: 0px;
    z-index: 10;
    overflow: hidden;

    .drawer-background {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 15;
        background-size: 5000px;
        background-position: center center;
        filter: blur(30px);
        transform: scale(2.5);
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
            height: 100%;
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
                height: 450px;
                overflow: hidden;

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
}</style>