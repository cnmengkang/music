<template>
        <div class="lyrics">
            <span v-if="musicInfo.lyric != 0">
                {{ formatLyric(musicInfo.lyric) }}
            </span>
        </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
    components: {},
    props: {
  
    },
    data() {
        return {
        };
    },
    created() {
    },
    mounted() {

    },
    computed: {
        ...mapState(['musicInfo']),
    },
};
</script>
<style lang="less" scoped>
.lyrics {
    width: calc(100% - 200px);
    background: #ffffffad;
    position: absolute;
    height: 30px;
    line-height: 30px;
    text-align: center;
    right: 0px;
    top: -30px;
    z-index: 99;
    font-size: 12px;
    border-top: 1px solid #ccc;
    overflow: hidden;
}
</style>