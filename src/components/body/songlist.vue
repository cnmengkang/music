<template>
    <!-- list列表组件 -->
    <div class="song-list">
        <el-skeleton :rows="6" animated :loading="tableDate.length != 0 ? false : true" />
        <el-table highlight-current-row @row-dblclick="getPlayRow($event)" :data="tableDate" :key="tableDate.id" stripe
            style="width: 100%">
            <el-table-column label="序号" type="index">
                <!-- <template slot-scope="scope">
                    <span>aa{{ scope.row.id }}</span>
                </template> -->
            </el-table-column>

            <el-table-column prop="date" label="操作" width="70">
                <i class="iconFont icon-love mr-10"></i>
                <i class="iconFont icon-down"></i>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="标题" width="350" class-name="title">
                <template slot-scope="scope">
                    <div class="ellipsis">
                        <span class="name">{{ scope.row.name }}</span>
                        <span class="name-tips" v-if="scope.row.alia.length != 0">({{ scope.row.alia[0] }})</span>
                    </div>
                    <div class="aa">
                        <span class="vip ml-10" v-if="scope.row.fee == 1">VIP</span>
                        <span v-if="scope.row.mv != 0" @click="getMv(scope.row)" class="mv ml-5">MV<i
                                class="el-icon-caret-right"></i></span>
                        <span class="originType ml-5" v-if="scope.row.originCoverType != 0">{{
                            scope.row.originCoverType == 1 ? '原唱' : '翻唱'
                        }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="al.name" label="专辑">
            </el-table-column>
            <el-table-column label="时间" width="65">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.dt, "{i}:{s}") }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- list列表组件 -->
</template>

<script>
export default {
    props: {
        tableDate: {
            type: Array
        }
    },
    data() {
        return {
        }
    },
    methods: {

        // 点击获取当前音乐信息，并存储到Vuex中
        getPlayRow(event) {
            console.log('event', event.id)
            this.$store.dispatch('getSongInfo', event);
        },
        // 获取mv
        getMv(res) {
            console.log('mv', res)
            this.$store.dispatch('videos/getDetailMv', res);
            this.$router.push({ name: 'videoPlay', params: { id: res.id } })
        },

    }
}
</script>
<style lang="less" scoped>
.song-list {
    .mv {
        display: inline-block;
    }

    .name-tips {
        font-size: 12px;
        color: #a39c9c;
    }


}
</style>