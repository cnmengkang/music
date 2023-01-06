<template>
    <div id="footer">
        <el-row :gutter="20" type="flex" align="middle" justify="center">
            <el-col :span="6" v-if="musicInfo.musicUrl.length != 0">
                <singer :singer="musicInfo"></singer>
            </el-col>
            <el-col :span="12">
                <!-- 播放组件 -->
                <audio-play></audio-play>
            </el-col>
            <el-col :span="6" class="audio_sound" v-if="musicInfo.musicUrl.length != 0">
                <sound></sound>
                <!-- 音量音质组件 -->
            </el-col>
        </el-row>
        <lyric></lyric>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import singer from './components/singer'
import audioPlay from './components/play'
import sound from './components/sound'
import lyric from './components/lyrics'
export default {
    name: 'footers',
    components: { singer, audioPlay, sound, lyric },
    data() {
        return {
            isPlay: false,
            volume: 50,//默认音量
        }
    },
    created() {
    },
    // 计算属性
    computed: {
        ...mapState(['musicInfo']),
    },
    methods: {

    }
}
</script>
<style scope lang="less">

</style>