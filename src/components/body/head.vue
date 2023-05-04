<template>
    <!-- 详情页面顶部组件 -->
    <div class="head">
        <div class="detail-left">
            <el-avatar :size="180" shape="square" icon="el-icon-user-solid" :src="tableHead.coverImgUrl"></el-avatar>
        </div>
        <div class="detail-right">
            <div class="right-title  flex">
                <span class="song mr-10">歌单</span>
                <h1>{{ tableHead.name }}</h1>
            </div>
            <div class="right-creator font-12 flex">
                <el-avatar v-if="tableHead.creator" :src="tableHead.creator.avatarUrl" class="mr-10" :size="30" />
                <el-link :underline="false">
                    <span class="mr-10 blue" v-if="tableHead.creator">{{ tableHead.creator.nickname }}</span>
                </el-link>
                <div class="createTime">
                    {{ parseTime(tableHead.createTime, "{y}-{m}-{d}") }}创建
                </div>
            </div>
            <div class="head-box">
                <div class="flex mb-5">
                    <el-button-group>
                        <el-button round size="mini" type="danger" icon="el-icon-video-play">播放全部</el-button>
                        <el-button round size="mini" type="danger" icon="el-icon-plus"></el-button>
                    </el-button-group>
                </div>
            </div>
            <div class="tips flex mb-5" v-if="tableHead.tags">
                <label v-if="tableHead.tags.length != 0">标签：</label>
                <el-link :underline="false" class="blue mr-5" v-for="(item, index) in tableHead.tags" :key="index">
                    {{ item }}</el-link>
            </div>
            <div class="font-14" style="width:100%">
                <span class="mr-20">歌曲：{{ tableHead.trackCount }}</span>
                <span>播放：{{ numCount(tableHead.playCount) }}</span>
            </div>
            <el-collapse accordion style="width:100%;">
                <el-collapse-item title="简介:">
                    <div>{{ tableHead.description }}</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <!-- 详情页面顶部组件 -->
</template>
<script>
export default {
    components: {},
    props: {
        tableHead: {
            type: Object,
            require: true
        },
    },
    data() {
        return {
            folder: true
        }
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
.head {
    display: flex;
    text-align: left;

    .detail-left {
        width: 25%;
        border-radius: 10px;
    }

    .detail-right {
        width: 75%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px 10px;

        .song {
            color: #f00;
            border: 1px solid #f00;
            padding: 2px 3px;
            font-size: 14px;
            border-radius: 3px;
        }
    }
}
</style>