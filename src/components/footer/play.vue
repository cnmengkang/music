<template>
    <div class="audio">
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
                <el-button title="暂停" plain circle icon="icon iconFont icon-bofang" v-else @click="pause"></el-button>
            </el-col>
            <el-col :span="2">
                <el-button title="下一首" size="small" circle class="next" icon="el-icon-caret-right"></el-button>
            </el-col>
            <el-col :span="4">
                <div @click="setLyrics" class="lyrics-icon" title="打开歌词">歌词开</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            audio: {
                isPlaying: false
            }
        };
    },
    created() { },
    mounted() { },
    methods: {
        // 播放
        play() {
            this.$refs.audio.play();
        },
        // 暂停
        pause() {
            this.$refs.audio.pause();
        },

    },
    computed: {},
};
</script>
<style lang="less" scoped>

</style>