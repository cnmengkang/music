<template>
    <div>
        <el-skeleton :rows="10"  animated :loading="data.length != 0 ? false : true" />
        <el-table v-if="data.length.length != 0" @row-dblclick="getCurrentMusicId" :data="data" style="width: 100%" :show-header="false" stripe>
            <el-table-column type="index" width="50" label="序号" />
            <el-table-column label="头像" width="66">
                <template slot-scope="scope">
                    <el-avatar shape="square" :size="size" :src="scope.row.album.blurPicUrl"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="标题" class-name="title">
                <template slot-scope="scope">
                    <div class="">
                        <span>{{ scope.row.name }}</span>
                        <span v-if="scope.row.alias.length" class="alias ml-5">({{ scope.row.alias[0] }})</span>
                    </div>
                    <div class="aa">
                        <span class="vip ml-10" v-if="scope.row.fee == 1">VIP</span>
                        <span v-if="scope.row.mvid != 0" @click="getMv(scope.row)" class="mv ml-5">MV<i
                                class="el-icon-caret-right"></i></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="名字" width="150">
                <template slot-scope="scope">
                    <span v-for="(item, index) in scope.row.album.artists" :key="index">{{ item.name }}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="标题" width="180" />
            <el-table-column label="时间" width="65">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.bMusic.playTime, "{i}:{s}") }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        data: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            size: 56,
            loading: true,
            
        };
    },
    created() { },
    mounted() { },
    methods: {
        // 获取mv详情
        getMv(res) {
            console.log('mv', res.album.id)
            this.$store.dispatch('videos/getDetailMv', res.mvid);
            this.$router.push({ name: 'videoPlay', params: { id: res.mvid } })
        },
        // 双击获取当前单曲详细信息
        getCurrentMusicId(res) {
            console.log(res.id)
            this.$store.dispatch('getCurrentMusicDetail',res.id)
        },
    },
    computed: {

    },
};
</script>
<style lang="less" scoped>
.el-table .warning-row {
    background: oldlace;
}

.alias {
    color: #ccc;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>