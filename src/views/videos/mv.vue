<template>
    <div class="video-mv">
        mv
    </div>
</template>

<script>
import { videoMv } from '@/api/video/mv';

export default {
    components: {  },
    props: {},
    data() {
        return {
            params: {
                area: '',  //地区
                order: '',//排序
                limit: '',//取出数量默认30
                offset: '', //偏移数量用于分页
            },
            videoMvList: []
        };
    },
    created() { },
    mounted() {
        this.getVideoMv()
    },
    methods: {
        // 获取mv信息
        getVideoMv() {
            videoMv(this.params).then(res => {
                this.videoMvList = res.data
                console.log('mv', res.data)
            })
        }
    },
    computed: {},
};
</script>
<style lang="less" scoped>

</style>