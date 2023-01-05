<template>
    <div id="footer">
        <el-row :gutter="20" type="flex" align="middle" justify="center">
            <el-col :span="6" @click="drawer = true" v-if="!musicInfo.musicUrl.length == 0">
                <el-row :gutter="10" type="flex" align="middle">
                    <el-col :span="6">
                        <el-avatar shape="square" :size="50" :src="musicInfo.singerAvatar"></el-avatar>
                    </el-col>
                    <el-col :span="18">
                        <p>{{ musicInfo.singerName }}</p>
                        <template v-if="musicInfo.singerAuthor">
                            <span class="font-12" v-for="item in musicInfo.singerAuthor" :key="item.id">{{
        item.name
}}</span>
                        </template>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row :gutter="10" type="flex" justify="center" align="middle">
                    <el-col :span="2">
                        <span class="for ">for</span>
                    </el-col>
                    <el-col :span="2">
                        <el-button title="上一首" size="small" circle class="prev" icon="el-icon-caret-left"></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button title="播放" plain type="info" circle icon="icon iconFont icon-Play" v-if="isPlay"
                            @click="play"></el-button>
                        <el-button title="暂停" plain circle icon="icon iconFont icon-bofang" v-else
                            @click="pause"></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button title="下一首" size="small" circle class="next" icon="el-icon-caret-right"></el-button>
                    </el-col>
                    <el-col :span="4">
                        <div @click="setLyrics" class="lyrics-icon" title="打开歌词">歌词开</div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
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
            </el-col>
            <el-col :span="6" class="audio_sound" v-if="musicInfo.musicUrl.length != 0">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="level">音质</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="sound">
                            <el-popover placement="top-start" trigger="hover" class="popover">
                                <el-slider :min="0" :max="100" tooltip-class="slideSound" :show-tooltip="false"
                                    :format-tooltip="formatTooltip" @change="changeVolume" v-model="volume" vertical
                                    height="80px">
                                </el-slider>
                                <span title="静音" slot="reference" class="el-icon-caret-right" @click="setSound"></span>
                            </el-popover>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="level" title="音效">音效</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="level">
                            list
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <lyrics></lyrics>
        <audio duration @timeupdate="updateCurrentTime" autoplay ref="audio" :src="musicInfo.musicUrl"
            :type="musicInfo.musicType" />
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
import { mapState } from 'vuex'
import lyrics from './lyrics'
export default {
    name: 'footers',
    components: { lyrics },
    data() {
        return {
            isPlay: false,
            timer: null,//定时器
            currentTime: '', //当前时长
            volume: 50,//默认音量
            value: '',
            maxTime: 0
        }
    },
    created() {
    },
    mounted() {
        console.log(this.$refs.audio.volume)
    },
    // 计算属性
    computed: {
        ...mapState(['musicInfo']),
    },
    methods: {
        // 
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
        // 当前播放时间
        getCurrentTimer(e) {
            console.log(e)
        },
        // 每秒钟更新时间
        updateCurrentTime(res) {
            const time = parseInt(res.target.currentTime)
            console.log('当前时间', time)
            this.currentTime = time;
            this.value = time;
        },
        // 
        formatProcessToolTip(index = 0) {
            index = parseInt(this.maxTime / 100 * index);
            return realFormatSecond(index)
        },
        // 歌词隐藏与显示
        setLyrics() {
            this.show = !this.show
        },
        // 控制音量大小
        setSound() {
            this.$refs.audio.volume = 0;
            this.volume = 0;
        },
        // 音量刻度
        formatTooltip(index = 0) {
            this.$refs.audio.volume = index / 100;
            this.volume = index
        },
        changeVolume(index) {
            console.log(index)
            this.$refs.audio.volume = index / 100
            this.volume = index
        }
    }
}
</script>
<style scope lang="less">
.el-slider {
    .el-slider__runway {
        margin: 5px 0px;
    }

    .el-slider__button {
        width: 10px;
        height: 10px;
        border: none;
        color: #f00;
        background-color: #f00;
    }

    .el-slider__bar {
        background-color: red;
    }
}
</style>