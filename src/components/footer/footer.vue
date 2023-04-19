<template>
    <div class="footer">
        <div class="footer-singer">
            <singer :singer="musicInfo"></singer>
            <!-- 作者信息组件 -->
        </div>
        <div class="footer-audio">
            <!-- 播放组件 -->
            <audio-play></audio-play>
        </div>
        <div  style="width:25%">
            
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import singer from './components/singer'
import audioPlay from './components/play'
export default {
    name: 'footers',
    components: { singer, audioPlay },
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
    width:100%;
    .footer-singer {
        width: 25%
    }
    .footer-audio {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding-left: 30px;
    }
}
</style>