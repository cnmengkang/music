<template>
    <div class="footer">
        <div class="footer-singer" v-if="musicInfo.footerShow">
            <!-- 左侧歌曲名作者名组件 -->
            <singer :singer="musicInfo"></singer>
        </div>
        <div class="footer-audio">
            <!-- 播放组件 -->
            <audio-play></audio-play>
        </div>
        <div style="width:25%" v-if="musicInfo.footerShow">
            <!-- 音量组件 -->
            <sound></sound>
            <lyric :lyric="musicInfo"></lyric>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import singer from './components/singer'
import audioPlay from './components/play'
import sound from './components/sound'
import lyric from './components/lyric'

export default {
    name: 'footers',
    components: { singer, audioPlay, sound,lyric },
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
.footer {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;

    .footer-singer {
        width: 25%
    }

    .footer-audio {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
    }
}
</style>