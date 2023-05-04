<template>
    <div class="footer">
        <div class="footer-singer" v-if="currentTime">
            <singer :singer="singers"></singer>
        </div>
        <div class="footer-audio">
            <div :class="{ audio: true, pointerNone: isPlaying }">
                <div class="audio-play flex">
                    <div class="audio-top plays mb-5">
                        <span title="上一首" class="iconFont icon-prev cursor" @click="prev"></span>
                        <span title="暂停" class="play iconFont icon-play cursor" v-if="isBtnShow"
                            @click="startPlayOrPause(false)"></span>
                        <span title="播放" class="pause iconFont icon-pause cursor" v-else
                            @click="startPlayOrPause(true)"></span>
                        <span title="下一首" class="iconFont icon-next cursor" @click="next"></span>
                    </div>
                    <div class="audio-slider flex justify-content-center flex-wrap-nowrap">
                        <span v-if="player" class="start font-14">{{ currentTime || "00:00"
                        }}</span>
                        <el-slider class="w-80" :min="0" :max="player.duration" @change="seek" v-model="slidValue"
                            :show-tooltip="false" />
                        <span v-if="player" class="end font-14">{{ duration || "00:00" }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 音量 -->
        <div style="width:25%" v-if="currentTime">
            <sound :player="player"></sound>
        </div>
        <!-- 音量 -->
        <!-- 歌词 -->
        <div class="lyrics" v-if="!isOpen">
            <lyric v-if="lyrics.length > 0" :lyric="lyrics" :space="0" :currentTime="player.currentTime"></lyric>
        </div>
        <!-- 歌词 -->
        <!-- 弹出层 -->
        <div class="drawer" v-else>
            <drawer :singer="singers" :space="0" :lyric="lyrics" :currentTime="player.currentTime"
                :isPlaying="player.isPlaying"></drawer>
        </div>
    </div>
</template>
<script>
import { formatTIme } from '@/utils/formLyrics';
import { mapState } from 'vuex'
import singer from './components/singer'
import sound from './components/sound'
import lyric from './components/lyric'
import drawer from './components/drawer'
import { generateGradientFromImage } from '@/utils/bgc'

export default {
    name: 'footers',
    components: { singer, sound, lyric, drawer },
    data() {
        return {
            isBtnShow: false,
            slidValue: 0,
        }
    },
    watch: {
        'player.currentTime'(newTime) {
            this.slidValue = newTime;
        },
        'player.isPlaying'(newTrue) {
            if (newTrue == true) {
                this.player.isPlaying = true;
                this.isBtnShow = true;
            } else {
                console.log('isPlayings')
            }
        }
    },
    created() {
        this.$store.dispatch('getLoadPlay');
    },
    mounted() {
        generateGradientFromImage(this.avatar, gradient => {
            const element = document.querySelector(".drawer-background");
            element.style.backgroundImage = gradient;
        });
    },
    // 计算属性
    computed: {
        ...mapState({
            player: state => state.musicInfo.player,
            lyrics: state => state.musicInfo.player.lyric,
            isPlaying: state => state.musicInfo.player.audio.isPlaying,
            singers: state => state.musicInfo.player.singer,
            isOpen: state => state.musicInfo.isOpen,
            isSrc: state => state.musicInfo.player.audio.src,
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
            this.player.audio.currentTime = this.slidValue;
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
                        font-size: 22px;
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