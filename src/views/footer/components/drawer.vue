<template>
    <div class="drawer-index">
        <div class="drawer-background" append-to-body="true" :style="{ backgroundImage: 'url(' + authorAvatar + ')' }"></div>
        <el-drawer :title="songName" :modal="false" size="100%" :direction="direction" :before-close="drawerOpen"
            :visible.sync="drawer">
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
import { mapState, mapActions } from 'vuex';
import Lyric from '@/components/Lyric';
export default {
    components: { Lyric },
    data() {
        return {
            direction: 'btt',
        }
    },
    computed: {
        ...mapState({
            player: state => state.player,
            songName: state => state.player.singer.songName,
            authorAvatar: state => state.player.singer.authorAvatar,
            subName: state => state.player.singer.subName,
            author: state => state.player.singer.authorName,
            drawer: state => state.drawer,
        }),
        authorName() {
            return [...this.author.map(obj => obj.name)].join(' / ')
        }
    },
    methods: {
        ...mapActions(['drawerOpen']),
    }
}
</script>
<style lang="less" scoped>
@height: 600px;
@head: 80px;

.drawer-index {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 73px;
    z-index: 999;
    overflow: hidden;

    .drawer-background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        z-index: 15;
        right: 0px;
        left: 0px;
        bottom: 0px;
        background-size: 100%;
        background-position: center center;
        transform: scale(1.22);
        filter: brightness(0.7) blur(40px);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(30px);
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
        position: absolute;
        top: 60px;
        right: 0px;
        bottom: 30px;
        left: 0px;
        width: 100%;
        height: auto;

        .bgc-radius {
            border: 20px solid #ccc9;
            border-radius: 50%;
        }

        .left,
        .right {
            width: 50%;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden;

            .right-head {
                text-align: center;

                span {
                    color: #fff;
                }
            }

            .right-body {
                width: 100%;
                height: 100%;

                ul {
                    li {
                        text-align: center;
                        color: #fff;
                        font-size: 14px;
                        line-height: 35px;
                    }
                }
            }
        }
    }
}
</style>