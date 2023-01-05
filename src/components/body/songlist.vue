<template>
    <!-- list列表组件 -->
    <div class="song-list">
        <el-table highlight-current-row @row-dblclick="getPlayRow($event)" :data="tableDate" :key="tableDate.id" stripe
            style="width: 100%">
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="date" label="操作" width="50">
                <i class="el-icon-star-off"></i>
                <i class="el-icon-download"></i>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="标题" width="320">
                <template slot-scope="scope">
                    <span class="name">{{ scope.row.name }}</span>
                    <div class="mv ml-10" v-if="!scope.row.mv == 0">
                        <span @click="getMv(scope.row.mv)">{{ scope.row.mv == 0 ? '' : 'MV' }}<i
                                class="el-icon-caret-right"></i></span>
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
    methods: {
        // 序号
        indexMethod(index) {
            return index + 1 * 1
        },
        // 点击获取当前音乐信息，并存储到Vuex中
        getPlayRow(event) {
            this.$store.dispatch('getSongInfo', event);
        },
        getMv(mv) {
            console.log(mv)
        }
    }
};
</script>
<style lang="less" scoped>
.song-list {
    .mv {
        display: inline-block;
        span {
            cursor: pointer;
            border: 1px solid #f00;
            padding: 0px 2px;
            border-radius: 4px;
            font-size: 12px;
            color: red;
        }
    }
}
</style>