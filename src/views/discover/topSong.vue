<template>
    <div class="tops-song">
        <div class="tops-nav">
            <tabs>
                <tabs @tab-click="handleTabClickType">
                    <el-tab-pane v-for="(item, index) in tops" :value="item.type" :label="item.name" :key="index" />
                </tabs>
                <el-tab-pane label="新歌速递">
                    <table-list :data="topSongList"></table-list>
                </el-tab-pane>
                <el-tab-pane label="新蝶上架">Tab 2 Content</el-tab-pane>
            </tabs>
        </div>
    </div>
</template>
<script>
import Tabs from '@/components/Tabs';
import tableList from './components/tablesList'
import { topSong } from '@/api/music/music'
export default {
    components: { Tabs, tableList },
    props: {},
    data() {
        return {
            params: {
                type: 0,
            },
            topSongList: [],
            tops: [
                { name: '全部', type: 0 },
                { name: '华语', type: 7 },
                { name: '欧美', type: 96 },
                { name: '韩国', type: 16 },
                { name: '日本', type: 8 },
            ]
        }
    },
    created() { },
    mounted() {
        this.getTopSong()
    },
    methods: {
        // 新歌速递
        getTopSong() {
            topSong(this.params).then(res => {
                console.log(res)
                this.topSongList = res.data;
            })
        },
        // tabs1 点击事件
        handleTabClickType(tab) {
            console.log('Tab Clicked:', tab.$attrs.value);
            this.topSongList = [];
            this.params.type = tab.$attrs.value
            this.getTopSong(this.params)
        },
    },
}
</script>
<style lang="less" scoped>
.el-tabs__nav-scroll {
    width: 50%;
    margin: 0 auto;
}
</style>