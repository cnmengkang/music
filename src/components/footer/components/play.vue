<template>
    <div class="audio">
        <div class="audio-play flex">
            <div class="audio-top plays mb-10">
                <span title="上一首" class="iconFont icon-prev" @click="prev"></span>
                <span title="暂停" class="play iconFont icon-play" v-if="isPlay" @click="startPlayOrPause"></span>
                <span title="播放" class="pause iconFont icon-pause" v-else @click="startPlayOrPause"></span>
                <span title="下一首" class="iconFont icon-next" @click="next"></span>
            </div>
            <div class="audio-slider flex justify-content-center flex-wrap-nowrap">
                <span v-if="hide" class="start font-12">{{ formatCurrentTime(currentTime) }}</span>
                <el-slider class="w-60" v-model="value" :show-tooltip="false" :format-tooltip="formatProcessToolTip"
                    @change="getCurrentTimer" />
                <span v-if="hide" class="end font-12">{{ parseTime(musicInfo.musicTime, "{i}:{s}") }}</span>
            </div>
            <!-- 播放暂停按钮 -->
        </div>
        <!-- 进度条组件 -->
        <div class="sound" v-if="hide">
            <el-popover placement="top-start" trigger="hover" class="popover">
                <el-slider :show-tooltip="false" :format-tooltip="formatTooltip" @change="changeVolume" v-model="volume"
                    vertical height="80px">
                </el-slider>
                <span title="静音" slot="reference" v-if="isSound" class="font-30 iconFont icon-sound-start"
                    @click="setSound(false)"></span>
                <span title="恢复音量" slot="reference" v-else class="font-30 iconFont icon-sound-close"
                    @click="setSound(true)"></span>
            </el-popover>
        </div>
        <!-- 音量组件 -->
        <!-- 歌词组件 -->
        <!-- <lyric></lyric> -->
        <div class="lyrics">
        <ul>
            <li v-for="(item, index) in musicInfo.lyrics" :key="item.uid" :data-index="index" ref="lyric">{{ item.lyric }}--{{ item.time }}</li>
        </ul>
    </div>
        <audio duration @timeupdate="updateCurrentTime" autoplay ref="audio" :src="musicInfo.musicUrl"
            :type="musicInfo.musicType" @loadedmetadata="loadedmetadata" @ended="playEnded" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: {

    },
    data() {
        return {
            isPlay: false,
            isSound: true,
            currentTime: null, //当前时长
            value: 0,  //默认进度条
            volume: 20,  //默认音量
            duration: 0,//总时长
        };
    },
    computed: {
        ...mapState(['musicInfo']),
        hide() {
            return this.currentTime != null
        }
    },
    mounted() {
        this.$refs.audio.volume = this.volume / 100;
    },
    methods: {
        // 开始
        play() {
            this.$refs.audio.play();
        },
        // 暂停
        pause() {
            this.$refs.audio.pause();
        },
        // 点击调用播放与暂停事件
        startPlayOrPause() {
            if (this.currentTime == null) return;
            if (this.isPlay == true) {
                this.pause()
                this.isPlay = false
            } else {
                this.isPlay = true
                this.play()

            }
        },
        // 当音频加载完成会调用此事件
        loadedmetadata(res) {
            console.log('音频加载完成', res.target.duration)
            let duration = parseInt(res.target.duration * 100) / 100;
            console.log(duration)
            this.duration = duration;
            this.isPlay = true
        },
        // slider进度条事件
        getCurrentTimer(e) {
            console.log(e)
        },
        // audio事件自动更新当前播放时间
        updateCurrentTime(res) {
            let parse = parseInt(res.target.currentTime * 100) / 100;
            this.currentTime = parse;
            this.value = parse / this.duration * 100;
        },
        // 
        formatProcessToolTip(res) {
            // return parseInt(his.value / 100 * res)
        },
        // 音量控制=============================
        // 控制音量大小
        setSound(e) {
            // console.log('点击音量', this.volume)
            if (e != true) {
                this.$refs.audio.volume = 0;
                this.volume = 0;
                this.isSound = false
            }
            else {
                this.isSound = true;
                this.volume = 30;
                this.$refs.audio.volume = 0.5;
            }
        },
        // 音量条
        formatTooltip(val) {
            return val;

        },
        // 手动改变音量
        changeVolume(val) {
            // console.log('volume', val)
            if (val == 0) {
                this.$refs.audio.volume = 0;
                this.volume = 0;
                this.isSound = false
            } else {
                this.$refs.audio.volume = val / 100;
                this.volume = val
                this.isSound = true

            }

        },
        // 获取歌词
        // 当音乐播放停止时
        playEnded() {
            this.isPlay = false
        },
        //上一首
        prev() {
            console.log('prev')
        },
        next() {
            console.log('next')
        }
    }
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
        width: 8%;
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

    ul {
        li {
            text-align: center;
            font-size: 12px;

        }
    }
}
}
</style>