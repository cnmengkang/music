<template>
    <div class="audio">
        <div class="audio-play flex">
            <div class="audio-top plays mb-5">
                <span title="上一首" class="iconFont icon-prev" @click="prev"></span>
                <span title="暂停" class="play iconFont icon-play" v-if="isPlay" @click="startPlayOrPause"></span>
                <span title="播放" class="pause iconFont icon-pause" v-else @click="startPlayOrPause"></span>
                <span title="下一首" class="iconFont icon-next" @click="next"></span>
            </div>
            <div class="audio-slider flex justify-content-center flex-wrap-nowrap">
                <span v-if="hide" class="start font-14">{{ formatCurrentTime(currentTime) || '00:00' }}</span>
                <el-slider class="w-60" v-model="sliderTime" :show-tooltip="false" :format-tooltip="formatProcessToolTip"
                    @change="changeCurrenTime" />
                <span v-if="hide" class="end font-14">{{ parseTime(musicTime, "{i}:{s}") }}</span>
            </div>
            <!-- 播放暂停按钮 -->
        </div>
        <!-- <lyric></lyric> -->
        <div class="lyrics">
            <p>{{ createLyrics }}</p>
        </div>
        <audio duration @timeupdate="updateCurrentTime" autoplay ref="audio" :src="musicUrl" :type="musicType"
            @loadedmetadata="loadedmetadata" @ended="playEnded" />
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
    }
    else {
        return '00:00';
    }
}
import { mapState } from 'vuex';
import { lyric } from '@/api/music/music'
export default {
    props: {

    },
    data() {
        return {
            isPlay: false,
            currentTime: 0, //当前时长
            sliderTime: 0,  //默认进度条
            duration: 0,//总时长
            lyricsObjArr: [],
            createLyrics: '',
            maxTime: 0
        }
    },
    computed: {
        hide() {
            return this.maxTime > 0
        },
        ...mapState({
            musicTime: state => state.musicInfo.musicTime,
            musicType: state => state.musicInfo.musicTime,
            musicUrl: state => state.musicInfo.musicUrl,
            singerName: state => state.musicInfo.singerName
        }),
    },
    mounted() {
        // 向sound文件传递audio元素，控制音量
        this.$bus.$emit('audio', this.$refs.audio);
    },

    watch: {
        currentTime() {
            // 匹配歌词
            for (let i = 0; i < this.lyricsObjArr.length; i++) {
                const time = this.lyricsObjArr[i].time
                const lyric = this.lyricsObjArr[i].lyric
                if (this.currentTime > time) {
                    if (lyric == '') return;
                    this.createLyrics = lyric
                }
            }
        }
    },
    methods: {
        // 点击调用播放与暂停事件
        startPlayOrPause() {
            if (this.currentTime == 0) return;
            if (this.isPlay == true) {
                this.$refs.audio.pause();
                this.isPlay = false
            } else {
                this.isPlay = true
                this.$refs.audio.play();
            }
        },
        // 当音频加载完成会调用此事件
        loadedmetadata(res) {
            console.log('音频加载完成');
            this.maxTime = res.target.duration;
            this.isPlay = true;
            this.lyricsObjArr = [];
            this.getLyric(this.$store.state.musicInfo.id);
        },
        // audio事件自动更新当前播放时间
        updateCurrentTime(res) {
            this.currentTime = parseInt(res.target.currentTime);
            this.sliderTime = parseInt(this.currentTime / this.maxTime * 100);
            this.singerCurrentTime(res)
        },
        // bus
        singerCurrentTime(res) {
            this.$bus.$emit('getCurrentTime', res);
        },
        // 
        formatProcessToolTip(index = 0) {
            index = parseInt(this.maxTime / 100 * index);
            return realFormatSecond(index);
        },
        // 音量控制=============================
        // 播放跳转
        changeCurrenTime(index) {
            this.currentTime = parseInt(index / 100 * this.maxTime);
        },
        // 当音乐播放停止时
        playEnded() {
            this.isPlay = false;
            console.log('播放结束');
        },
        //上一首
        prev() {
            console.log('prev');
        },
        next() {
            console.log('next');
        },
        // ======================歌词显示
        // // 获取歌曲歌词信息
        getLyric(id) {
            lyric(id).then(res => {
                const lyricList = res.lrc.lyric;
                this.formLyricTime(lyricList);
            })
        },
        //歌词格式化
        formLyricTime(lyric) {
            // console.log(lyric)
            const regNewLine = /\n/;
            const lineArr = lyric.split(regNewLine);
            const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
            lineArr.forEach(item => {
                if (item === '') return
                const obj = {}
                const time = item.match(regTime)
                obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim();
                obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
                obj.uid = Math.random().toString().slice(-6);
                this.lyricsObjArr.push(obj);
            })
            // console.log(this.lyricsObjArr)
        },
        // 歌词时间格式化
        formatLyricTime(time) { // 格式化歌词的时间 转换成 sss:ms
            const regMin = /.*:/
            const regSec = /:.*\./
            const regMs = /\./
            const min = parseInt(time.match(regMin)[0].slice(0, 2))
            let sec = parseInt(time.match(regSec)[0].slice(1, 3))
            const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
            if (min !== 0) {
                sec += min * 60
            }
            return Number(sec + '.' + ms)
        },
    },
    filters: {
        formatSecond(second = 0) {
            return realFormatSecond(second)
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