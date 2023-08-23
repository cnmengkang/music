<template>
    <div class="video-mv">
        <h4>全部MV</h4>
        <div class="videoMv-head">

        </div>
        <div class="mv_grid">
            <mv-grid :data="mvData"></mv-grid>
        </div>
    </div>
</template>
<script>
import { videoMv } from '@/api/video/mv';
import Tabs from '@/components/Tabs';
import mvGrid from '@/components/mvGrid';
export default {
    components: { Tabs, mvGrid },
    data() {
        return {
            list: [
                {
                    name: '地区',
                    id: 1,
                    children: [
                        { name: '内地', },
                        { name: '港台', },
                        { name: '欧美', },
                        { name: '日本', },
                        { name: '韩国', },
                    ]
                },
                {
                    name: '类型',
                    id: 1,
                    children: [
                        { name: '内地', },
                        { name: '港台', },
                        { name: '欧美', },
                        { name: '日本', },
                        { name: '韩国', },
                    ]
                },
                {
                    name: '排序',
                    id: 1,
                    children: [
                        { name: '内地', },
                        { name: '港台', },
                        { name: '欧美', },
                        { name: '日本', },
                        { name: '韩国', },
                    ]
                },
            ],
            params: {
                area: '内地',
                limit: 9,
                order: '最新',
                offset: ''
            },
            mvData: []
        }
    },
    mounted() {
        this.getALlMv();
        console.log(this.list)
    },
    methods: {
        async getALlMv() {
            let result = await videoMv(this.params);
            this.mvData = result.data;
        },
        handleClick(tab) {
            console.log(tab.label)
        }
    },
};
</script>
<style lang="less" scoped>
.video-mv {
    .videoMv-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .aaaa {
        display: flex;
    }

}
</style>