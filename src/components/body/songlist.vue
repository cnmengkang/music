<template>
    <!-- list列表组件 -->
    <div class="song-list">
        <el-skeleton :rows="6" animated :loading="tableDate.length != 0 ? false : true" />
        <el-table highlight-current-row @row-dblclick="getPlayRow" :data="tableDate" :current-row-key="tableDate.id"
            :row-class-name="tableRowClassName" stripe>
            <el-table-column label="序号" type="index" :index="indexMethod"> </el-table-column>
            <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                    <i class="iconFont icon-love mr-10"></i>
                    <i class="iconFont icon-down " @click="downloadMusic(scope.row)"></i>
                </template>
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
import { songUrl } from '@/api/music/music'
export default {
    props: {
        tableDate: {
            type: Array
        }
    },
    data() {
        return {
            CurrentRow: 0,
        }
    },
    computed: {

    },
    methods: {
        // 点击获取当前音乐信息，并存储到Vuex中
        getPlayRow(row) {
            this.CurrentRow = row.index
            console.log('CurrentRow', this.CurrentRow)
            this.$store.dispatch('getSongInfo', row);
        },
        // 获取mv
        getMv(res) {
            console.log('mv', res)
            this.$store.dispatch('videos/getDetailMv', res);
            this.$router.push({ name: 'videoPlay', params: { id: res.id } })
        },
        indexMethod(index = 1) {
            return index * 1 + 1;
        },
        // 给每一行添加index
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex + 1;
            if (this.CurrentRow == rowIndex + 1) {
                return 'current-play'
            }
        },
        downloadMusic(row) {
            console.log('download', row)
            songUrl(row.id).then(res => {
                const blob = new Blob([res.data])
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = res.data[0].url // 设置下载文件名
                link.click() // 触发下载操作
            })

        }
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

    .hot {
        background: red;
    }
}
</style>