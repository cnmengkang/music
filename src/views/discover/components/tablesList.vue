<template>
    <div>
        <el-skeleton :rows="10" animated :loading="data.length != 0 ? false : true" />
        <el-table v-if="data.length.length != 0" @row-dblclick="getCurrentMusicId" :data="data" style="width: 100%"
            :show-header="false" stripe>
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column label="头像" width="76">
                <template slot-scope="scope">
                    <el-image fit="cover" :width="size" :src="scope.row.album.blurPicUrl" lazy>
                        <div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>
                        </div>
                    </el-image>
                    <span class="iconFont icon-play-red align-item-center red border-r-20"
                        @click="getCurrentMusicId(scope.row)"></span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="标题" class-name="title">
                <template slot-scope="scope">
                    <div class="eli" :title="scope.row.name">
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
                    <span v-if="scope.row.bMusic">{{ parseTime(scope.row.bMusic.playTime, "{i}:{s}") }}</span>
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
        },
        ids:{
            type:Object,
            default:0
        }
    },
    data() {
        return {
            size: 60,
            loading: true,
            params: {
                ids: 0,
                index: 0,
            }
        };
    },
    methods: {
        // 获取mv详情
        getMv(res) {
            this.$store.dispatch('getDetailMv', res.mvid);
            this.$router.push({ name: 'videoPlay', params: { id: res.mvid } })
        },
        // 双击获取当前单曲详细信息
        getCurrentMusicId(row) {
            this.params.index = this.data.indexOf(row);
            console.log(this.ids)
            this.$store.dispatch('getCurrentMusicIsPlay', this.params);
        },
    }

}
</script>
<style lang="less" scoped>
.el-table {
    .warning-row {
        background: oldlace;
    }

    .el-image {
        border-radius: 4px;
    }
}

.align-item-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 2px 6px;
    font-size: 14px;
    cursor: pointer;
}

.alias {
    color: #ccc;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>