<template>
    <div class="audio">
        <div class="audio-play flex">
            <div class="audio-top plays mb-5">
                <span title="上一首" class="iconFont icon-prev" @click="prev"></span>
                <span title="暂停" class="play iconFont icon-play" v-if="isPlay" @click="startPlayOrPause(false)"></span>
                <span title="播放" class="pause iconFont icon-pause" v-else @click="startPlayOrPause(true)"></span>
                <span title="下一首" class="iconFont icon-next" @click="next"></span>
            </div>
            <div class="audio-slider flex justify-content-center flex-wrap-nowrap">
                <span v-if="hide" class="start font-14">{{ formatCurrentTime(currentTime) || '00:00' }}</span>
                <!-- <el-slider class="w-60" v-model="sliderTime" :show-tooltip="false" 
                     /> -->
                <span v-if="hide" class="end font-14">{{ musicTime }}</span>
                {{ player }}
            </div>
        </div>
    </div>
</template>
<script>
import AudioPlayer from '@/utils/AudioPlayer'
import { mapState } from 'vuex';
// import { lyric } from '@/api/music/music'
export default {
    props: {

    },
    data() {
        return {
            player: null,
            isPlay: false,
        }
    },
    watch: {
        musicUrl(newSrc, oldSrc) {
            console.log('newValue', newSrc);
            this.player = new AudioPlayer(newSrc);
            this.player.play(newSrc);
        }
    },
    computed: {
        hide() {
            this.player != null ? true : false;
        },
        ...mapState({
            musicTime: state => state.musicInfo.musicTime,
            musicType: state => state.musicInfo.musicTime,
            musicUrl: state => state.musicInfo.musicUrl,
        }),
    },
    created() {
    },
    mounted() {
    },
    methods: {
        prev() { },
        next() { },
        startPlayOrPause(val) {
            console.log(val)
            if (this.isPlay) {
                this.player.pause()
            } else {
                this.player.play()
            }
            this.isPlay = !this.isPlay
        }
    },
}
</script>
<style lang="less" scoped>
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
        overflow: hidden;

        p {
            text-align: center;
            font-size: 12px;
            line-height: 30px;

        }
    }
}
</style>