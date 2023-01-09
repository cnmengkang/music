<template>
    <div class="audio">
        <div class="audio-play">
            <div class="audio-top plays">
                <span title="上一首" class="iconFont icon-prev"></span>
                <span title="播放" class="play iconFont icon-play" v-if="isPlay" @click="play"></span>
                <span title="暂停" class="pause iconFont icon-pause" v-else @click="pause"></span>
                <span title="下一首" class="iconFont icon-next"></span>
            </div>
            <div class="audio-slider flex">
                <span class="start font-12">{{ formatCurrentTime(currentTime) }}</span>
                <el-slider style="width:calc(100% - 16%)" v-model="value" :show-tooltip="false"
                    :format-tooltip="formatProcessToolTip" @change="getCurrentTimer" />
                <span class="end font-12">{{ parseTime(musicInfo.musicTime, "{i}:{s}") }}</span>
            </div>
            <!-- 播放暂停按钮 -->
        </div>
        <!-- 进度条组件 -->
        <div class="sound">
            <el-popover placement="top-start" trigger="hover" class="popover">
                <el-slider :show-tooltip="false" :format-tooltip="formatTooltip" @change="changeVolume" v-model="volume"
                    vertical height="80px">
                </el-slider>
                <span title="静音" slot="reference" v-if="!isPlay" class="iconFont icon-sound-start"
                    @click="setSound"></span>
                <span title="恢复音量" slot="reference" v-else class="iconFont icon-sound-close" @click="setSound"></span>
            </el-popover>
        </div>

        <!-- 音量组件 -->
        <audio duration @timeupdate="updateCurrentTime" autoplay ref="audio" :src="musicInfo.musicUrl"
            :type="musicInfo.musicType" @loadedmetadata="loadedmetadata" />
    </div>
</template>

<script>
function realFormatSecond(second) {
    var secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)
        var hours = Math.floor(second / 3600)
        second = second - hours * 3600
        var mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '0:00:00'
    }
}
import { mapState } from 'vuex';
export default {
    components: {},
    props: {

    },
    data() {
        return {
            isPlay: false,
            currentTime: '', //当前时长
            value: 0,  //默认进度条
            volume: 30,  //默认音量
            duration: 0,//总时长
        };
    },
    computed: {
        ...mapState(['musicInfo']),
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
        startPlayOrPause() {
            return this.isPlay ? this.pause() : this.play()
        },
        // 当音频加载完成会调用此事件
        loadedmetadata(res) {
            let duration = parseInt(res.target.duration * 100) / 100
            console.log(duration)
            this.duration = duration;
        },
        // slider进度条事件
        getCurrentTimer(e) {
            console.log(e)
        },
        // audio事件自动更新当前播放时间
        updateCurrentTime(res) {
            let parse = parseInt(res.target.currentTime * 100) / 100;
            console.log('当前播放时间', parse)
            this.currentTime = parse;
            this.value = parse / this.duration * 100;
        },
        // 
        formatProcessToolTip() {
        },

        // 音量控制=============================
        // 控制音量大小
        setSound(e) {
            this.$refs.audio.volume = 0;
            this.volume = 0;
            console.log('点击音量', e)
        },
        // 音量条
        formatTooltip(val) {
            return val;

        },
        // 手动改变音量
        changeVolume(val) {
            console.log('volume', val)
            this.$refs.audio.volume = val / 100;
            this.volume = val
        }
    }
}
</script>
<style lang="less">
.start,
.end {
    width: 8%;
    text-align: center;
}
.audio{
    width:100%;
}
.plays {
    display: flex;
    justify-content: center;
    gap: 0px 30px;
}
</style>