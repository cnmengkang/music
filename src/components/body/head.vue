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
                <span class="mr-10 blue" v-if="tableHead.creator">{{ tableHead.creator.nickname }}</span>
                <div class="createTime">
                    {{ parseTime(tableHead.createTime, "{y}-{m}-{d}") }}创建
                </div>
            </div>
            <div class="head-box">
                <div class="flex">
                    <el-button-group class="mr-10">
                        <el-button round size="mini" type="danger" icon="el-icon-video-play">播放全部</el-button>
                        <el-button round size="mini" type="danger" icon="el-icon-plus"></el-button>
                    </el-button-group>
                    <el-button round size="mini" v-if="folder" icon="el-icon-folder-add">收藏({{numCount(tableHead.subscribedCount)}})</el-button>
                    <el-button round size="mini" v-else icon="el-icon-folder-checked">已收藏({{numCount(tableHead.subscribedCount)}})</el-button>
                    <el-button round size="mini" icon="el-icon-share">分享({{numCount(tableHead.shareCount)}})</el-button>
                    <el-button round size="mini" icon="el-icon-download">下载全部</el-button>
                </div>
            </div>
            <div class="tips flex " v-if="tableHead.tags">
                <label v-if="tableHead.tags.length != 0">标签：</label>
                <el-link :underline="false" class="blue mr-5" v-for="(item, index) in tableHead.tags" :key="index">{{ item }}</el-link>
            </div>
            <div class="font-14">
                <span class="mr-20">歌曲：{{ tableHead.trackCount }}</span>
                <span>播放：{{ numCount(tableHead.playCount) }}</span>
                <p class="desc">简介：{{ tableHead.description }}</p>
            </div>
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
    align-items: center;
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