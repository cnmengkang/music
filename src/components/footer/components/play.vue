<template>
    <div class="audio">
        <el-row :gutter="10" type="flex" justify="center" align="middle">
            <el-col :span="2">
                <span title="上一首" class="el-icon-caret-left prev"></span>
            </el-col>
            <el-col :span="2">
                <span title="播放" class="play icon iconFont icon-Play" v-if="isPlay" @click="play"></span>
                <span title="暂停" class="pause icon iconFont icon-bofang" v-else @click="pause"></span>
            </el-col>
            <el-col :span="2">
                <span title="下一首" class="next el-icon-caret-right"></span>
            </el-col>
        </el-row>
        <!-- 播放暂停按钮 -->
        <el-row type="flex" justify="center" align="middle">
            <el-col :span="24">
                <el-row :gutter="10" type="flex" justify="center">
                    <el-col :span="2">
                        <span class="start font-12">{{ formatCurrentTime(currentTime) }}</span>
                    </el-col>
                    <el-col :span="20">
                        <el-slider v-model="value" :show-tooltip="false" :format-tooltip="formatProcessToolTip"
                            @change="getCurrentTimer" />
                    </el-col>
                    <el-col :span="2">
                        <span class="end font-12">{{ parseTime(musicInfo.musicTime, "{i}:{s}") }}</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 进度条组件 -->
        <!-- <el-row :gutter="10">
            <el-col :span="10">
                <div class="sound">
                    <el-popover placement="top-start" trigger="hover" class="popover">
                        <el-slider :show-tooltip="false" :format-tooltip="formatTooltip" @change="changeVolume"
                            v-model="volume" vertical height="80px">
                        </el-slider>
                        <span title="静音" slot="reference" class="el-icon-caret-right" @click="setSound"></span>
                    </el-popover>
                </div>
            </el-col>
        </el-row> -->
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
            isPlay: this.$store.state.musicInfo.isPlay,
            currentTime: '', //当前时长
            value: 0,
            maxTime: 0,
            duration: 0,//总时长
        };
    },
    computed: {
        ...mapState(['musicInfo']),
    },
    mounted() {
    },
    methods: {
        // 暂定/播放
        pause() {
            this.$refs.audio.pause();
            this.isPlay = true
        },
        // 开始
        play() {
            this.$refs.audio.play();
            this.isPlay = false
        },
        // 当音频加载完成会调用此事件
        loadedmetadata(res) {
            // console.log('loading',res.target.duration)
            this.duration = parseInt(res.target.duration)
        },
        // slider进度条事件
        getCurrentTimer(e) {
            console.log(e)
        },
        // audio事件自动更新当前播放时间
        updateCurrentTime(res) {
            // console.log('当前播放时间',res.target.currentTime)
            let time = parseInt(res.target.currentTime)
            this.currentTime = time;
            this.value = this.currentTime / this.duration * 100;
        },
        // 
        formatProcessToolTip() {
        },

        // 音量控制=============================
        // 控制音量大小
        setSound() {

        },
        // 音量条
        formatTooltip(val) {
            console.log(this.$refs.aa)
            console.log('val', val)
        },
        // 手动改变音量
        changeVolume(val) {
            console.log('volume', val)
        }
    }
}
</script>
<style lang="less">

</style>