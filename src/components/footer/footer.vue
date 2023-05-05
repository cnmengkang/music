<template>
    <div class="footer">
        <!-- 左侧歌曲信息展示 -->
        <div class="footer-singer" v-if="isFooterShow">
            <singer :singer="singers" />
        </div>
        <!-- 左侧歌曲信息展示 -->
        <!-- 中间控制器 -->
        <div class="footer-audio">
            <div :class="{ audio: true, pointerNone: !isFooterShow }">
                <div class="audio-play flex">
                    <div class="audio-top plays mb-5">
                        <span title="上一首" class="icon-prev" @click="prev"></span>
                        <span title="暂停" class="play icon-play" v-if="isBtnShow" @click="startPlayOrPause(false)"></span>
                        <span title="播放" class="pause icon-pause" v-else @click="startPlayOrPause(true)"></span>
                        <span title="下一首" class="icon-next" @click="next"></span>
                    </div>
                    <div class="audio-slider flex justify-content-center flex-wrap-nowrap">
                        <span v-if="isFooterShow" class="start font-14">{{ currentTime || "00:00"
                        }}</span>
                        <el-slider class="w-80" :min="0" :max="player.duration" @change="seek" v-model="slidValue"
                            :show-tooltip="false" />
                        <span v-if="isFooterShow" class="end font-14">{{ duration || "00:00" }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中间控制器 -->
        <!-- 音量 -->
        <div class="flex" style="width:25%" v-if="isFooterShow">
            <sound :player="player" />
            <div class="btn_lyrics">
                <span class="font-16 ml-10" @click="show = !show">词</span>
            </div>
        </div>
        <!-- 音量 -->
        <!-- 底部歌词 -->
        <transition name="el-zoom-in-bottom">
            <div class="lyrics" v-show="show">
                <div v-if="isFooterShow">
                    <lyric v-if="!isOpen" :lyric="lyrics" :space="0" :currentTime="player.currentTime" />
                </div>
            </div>
        </transition>

        <!-- 底部歌词 -->

        <!-- 弹出层包含歌词作者信息 -->
        <div class="drawer" v-if="isFooterShow">
            <drawer v-if="isOpen" :singer="singers" :space="0" :lyric="lyrics" :currentTime="player.currentTime"
                :isPlaying="isPlaying" />
        </div>
        <!-- 弹出层包含歌词作者信息 -->

    </div>
</template>
<script>
import { formatTIme } from '@/utils/formLyrics';
import { mapState } from 'vuex'
import singer from './components/singer'
import sound from './components/sound'
import lyric from './components/lyric'
import drawer from './components/drawer'
export default {
    name: 'footers',
    components: { singer, sound, lyric, drawer },
    data() {
        return {
            isBtnShow: false,
            slidValue: 0,
            show: true,
            loops: [
                { id: '0', name: '循环' },
                { id: '1', name: '随机' },
            ]
        }
    },
    watch: {
        'player.currentTime'(newTime) {
            this.slidValue = newTime;
        },
        'player.isPlaying'(newTrue) {
            if (newTrue != true) return;
            this.player.isPlaying = true;
            this.isBtnShow = true;
        }
    },
    created() {
        this.$store.dispatch('getLoadPlay');
    },
    // 计算属性
    computed: {
        ...mapState({
            player: state => state.musicInfo.player,
            lyrics: state => state.musicInfo.player.lyric,
            isPlaying: state => state.musicInfo.player.isPlaying,
            isFooterShow: state => state.musicInfo.player.isFooterShow,
            singers: state => state.musicInfo.player.singer,
            isOpen: state => state.musicInfo.isOpen,
        }),
        currentTime() {
            return formatTIme(this.player.currentTime)
        },
        duration() {
            return formatTIme(this.player.duration)
        },
    },
    methods: {
        prev() {
            this.player.prevTrack();
        },
        next() {
            this.player.nextTrack();
        },
        seek() {
            this.player.setCurrentTime(this.slidValue);
        },
        // loop 0：单曲循环 1:随机播放 默认列表循环播放
        loop(val) {
            console.log(val)
        },
        startPlayOrPause(val) {
            if (val) {
                this.player.play();
                this.isBtnShow = true;
                this.player.isPlaying = true;
            } else {
                this.player.pause();
                this.isBtnShow = false;
                this.player.isPlaying = false;
            }
        },
    }
}
</script>
<style scope lang="less">
.footer {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;

    .footer-singer {
        width: 25%
    }

    .footer-audio {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;

        .audio {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .audio-play {
                justify-content: center !important;

                .audio-top {
                    span {
                        cursor: pointer;
                        font-family: "iconFont" !important;
                        font-size: 22px;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            }

            .start,
            .end {
                width: 10%;
                text-align: center;
            }

            .plays {
                display: flex;
                justify-content: center;
                gap: 0px 30px;
                align-items: center;
            }
        }
    }

    .lyrics {
        width: calc(100% - 200px);
        background: #ffffffad;
        position: absolute;
        height: 30px;
        line-height: 30px;
        right: 0px;
        top: -32px;
        z-index: 10;
        border-top: 1px solid #ccc;
    }
}

// 防止点击穿透
// pointer-events
.pointerNone {
    pointer-events: none;
    opacity: .5;
}
</style>