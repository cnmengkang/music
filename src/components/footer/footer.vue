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
                        <div @click="setLyrics('lyrics')" class="lyrics-icon" title="打开歌词">歌词开</div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="24">
                        <el-row :gutter="10" type="flex" justify="center">
                            <el-col :span="3">
                                <span class="start">{{ formatCurrentTime(currentTime) }}</span>
                            </el-col>
                            <el-col :span="18">
                                <el-slider v-model="value" :show-tooltip="false" @change="getCurrentTimer($event)"/>
                            </el-col>
                            <el-col :span="3">
                                <span class="end">{{ parseTime(musicInfo.musicTime, "{i}:{s}") }}</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6" class="audio_sound" v-if="musicInfo.musicUrl.length != 0">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <div class="level">音质</div>
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
        <audio duration @timeupdate="updateCurrentTime" autoplay ref="audio" :src="musicInfo.musicUrl"
            :type="musicInfo.musicType" />
        <lyrics></lyrics>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import lyrics from './lyrics'
export default {
    name: 'footers',
    components: { lyrics },
    data() {
        return {
            isPlay: false,
            value: 0,
            timer: null,//定时器
            audioTime: '', //音乐总时长
            currentTime: '', //当前时长
            // 歌词显示隐藏
        }
    },
    created() {
    },
    mounted() {
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
        getCurrentTimer(e) {
            console.log(e)
        },
        setLyrics(e) {
            console.log(e)
        },
        updateCurrentTime() {
            console.log(this.$refs.audio.currentTime)
            this.value = this.$refs.audio.currentTime;
            this.currentTime = this.$refs.audio.currentTime;
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