<template>
    <div class="sound">
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
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
        };
    },
    created() { },
    mounted() { },
    methods: {
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
        setLyrics() {

        },
        changeVolume(index) {
            console.log(index)
            this.$refs.audio.volume = index / 100
            this.volume = index
        }
    },
    computed: {},
};
</script>
<style lang="less" scoped>

</style>