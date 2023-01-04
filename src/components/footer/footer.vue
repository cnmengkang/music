<template>
    <div id="footer">
        <el-row :gutter="20" type="flex" align="middle" justify="center">
            <el-col :span="6" @click="drawer = true" v-if="!musicInfo.musicUrl.length == 0">
                <el-row :gutter="10" type="flex" align="middle">
                    <el-col :span="6">
                        <el-avatar shape="square" :size="50" :src="musicInfo.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="18">
                        <p>{{ musicInfo.name }}</p>
                        <template v-if="musicInfo.title">
                            <span v-for="item in musicInfo.title" :key="item.id">{{ item.name }}</span>
                        </template>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" >
                <el-row :gutter="10" type="flex" justify="center" align="middle">
                    <el-col :span="2">
                        <div class="for">for</div>
                    </el-col>
                    <el-col :span="2">
                        <el-button size="small" circle class="prev" icon="el-icon-caret-left"></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button plain type="info" circle icon="icon iconFont icon-Play" v-if="isPlay"
                            @click="play"></el-button>
                        <el-button plain circle icon="icon iconFont icon-bofang" v-else @click="pause"></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button size="small" circle class="next" icon="el-icon-caret-right"></el-button>
                    </el-col>
                    <el-col :span="4">
                        <div @click="setLyrics('lyrics')" class="lyrics-icon">歌词开</div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="24">
                        <div>
                            <el-slider :show-tooltip="false" @change="getCurrentTimer($event)" v-model="value">
                            </el-slider>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6" class="audio_sound" v-if="!musicInfo.musicUrl.length == 0">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <div class="level">音质</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="level">音效</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="level">

                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <audio style="display:none;" duration controls autoplay ref="audioPlayer" :src="musicInfo.musicUrl"
            :type="musicInfo.musicType" />
        <div class="lyrics">
            <lyrics :lyricList="musicInfo"></lyrics>
        </div>
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
            audioTime: 0, //音乐总时长
            currentTime: 0, //当前时长
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
            this.$refs.audioPlayer.pause();
            this.isPlay = true
            clearInterval(this.timer)
        },
        // 开始
        play() {
            this.$refs.audioPlayer.play();
            this.isPlay = false
            this.timer
        },
        getCurrentTimer(e) {
            console.log(e)
            this.$refs.audioPlayer.duration = e
        },
        setLyrics(e) {
            console.log(e)
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