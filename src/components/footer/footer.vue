<template>
    <div class="footer">
        <div class="footer-singer" v-if="musicInfo.footerShow">
            <singer :singer="musicInfo"></singer>
        </div>
        <div class="footer-audio">
            <div class="audio">
                <div class="audio-play flex">
                    <div class="audio-top plays mb-5">
                        <span title="上一首" class="iconFont icon-prev" @click="prev"></span>
                        <span title="暂停" class="play iconFont icon-play" v-if="isBtnShow"
                            @click="startPlayOrPause(false)"></span>
                        <span title="播放" class="pause iconFont icon-pause" v-else @click="startPlayOrPause(true)"></span>
                        <span title="下一首" class="iconFont icon-next" @click="next"></span>
                    </div>
                    <div class="audio-slider flex justify-content-center flex-wrap-nowrap">
                        <span v-if="musicUrl" class="start font-14">{{ currentTime || "00:00"
                        }}</span>
                        <el-slider class="w-80" v-model="sliderValue" :show-tooltip="false" />
                        <span v-if="musicUrl" class="end font-14">{{ duration || "00:00" }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 音量 -->
        <div style="width:25%" v-if="musicInfo.footerShow">
            <sound :player="player"></sound>
        </div>
        <!-- 音量 -->
        <!-- 歌词 -->
        <div class="lyrics">
            <lyric v-if="lyrics.length > 0" :lyric="lyrics" :currentTime="player.currentTime"></lyric>
        </div>
        <!-- 歌词 -->
        <!-- 弹出层 -->
        <div class="prover">
            
        </div>
    </div>
</template>
<script>
import { formatTIme } from '@/utils/formLyrics';
import { mapState } from 'vuex'
import AudioPlayer from '@/utils/AudioPlayer'
import singer from './components/singer'
import sound from './components/sound'
import lyric from './components/lyric'
export default {
    name: 'footers',
    components: { singer, sound, lyric },
    data() {
        return {
            player: null,
            sliderValue: 0,
            isBtnShow: false,
        }
    },
    created() {
        this.player = new AudioPlayer();
    },
    watch: {
        musicUrl(newSrc) {
            const id = this.$store.state.musicInfo.id;
            this.player.isPlayUrl(newSrc, id);
            this.isBtnShow = true;
        }
    },
    // 计算属性
    computed: {
        ...mapState({
            musicUrl: state => state.musicInfo.musicUrl,
            musicInfo: state => state.musicInfo,
            lyrics: state => state.musicInfo.lyric
        }),
        currentTime() {
            return formatTIme(this.player.currentTime)
        },
        duration() {
            return formatTIme(this.player.duration)
        }
    },
    methods: {
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
        prev() { },
        next() { },
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
        z-index: 99;
        border-top: 1px solid #ccc;

        p {
            text-align: center;
            font-size: 12px;
            line-height: 30px;

        }
    }
}
</style>