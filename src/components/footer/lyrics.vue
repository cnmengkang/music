<template>
    <div class="lyrics">
        歌词
    </div>
</template>

<script>
import { lyric } from '@/api/music/music'
export default {
    components: {},
    props: {
        lyricList: Object
    },
    data() {
        return {
 
        };
    },
    created() {

    },
    computed: {
    },

    mounted() {
    },
    methods: {


    }
};
</script>
<style lang="less" scoped>
.lyrics {
    width: calc(100% - 200px);
    background: #ffffffad;
    position: absolute;
    height: 35px;
    line-height: 35px;
    text-align: center;
    right: 0px;
    top: -35px;
    z-index: 99;
    font-size: 14px;
    border-top: 1px solid #ccc;
    transition: all 1s linear;
    overflow: hidden;
}
</style>