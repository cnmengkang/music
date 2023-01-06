<template>
    <div id="footer">
        <el-row :gutter="20" type="flex" align="middle" justify="left">
            <el-col :span="6" v-if="musicInfo.musicUrl.length != 0">
                <singer :singer="musicInfo"></singer>
                <!-- 作者信息组件 -->
            </el-col>
            <el-col :span="18">
                <!-- 播放组件 -->
                <audio-play></audio-play>
            </el-col>
        </el-row>
        <lyric></lyric>
        <!-- 歌词组件 -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
import singer from './components/singer'
import audioPlay from './components/play'
import lyric from './components/lyrics'
export default {
    name: 'footers',
    components: { singer, audioPlay, lyric },
    data() {
        return {
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

    }
}
</script>
<style scope lang="less">

</style>