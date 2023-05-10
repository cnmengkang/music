<template>
    <!-- 详情页面顶部组件 -->
    <div class="head" v-if="tableHead">
        <div class="detail-left">
            <el-avatar :size="180" shape="square" icon="el-icon-user-solid" :src="coverImgUrl"></el-avatar>
        </div>
        <div class="detail-right">
            <div class="right-title  flex">
                <span class="song mr-10">歌单</span>
                <h1>{{ name }}</h1>
            </div>
            <div class="right-creator font-12 flex" v-if="tableHead.creator">
                <el-avatar :src="avatarUrl" class="mr-10" :size="30" />
                <el-link :underline="false">
                    <span class="mr-10 blue">{{ nickname }}</span>
                </el-link>
                <div class="createTime">
                    {{ parseTime(tableHead.createTime, "{y}-{m}-{d}") }}创建
                </div>
            </div>
            <div class="flex mb-5">
                <el-button-group>
                    <el-button round size="mini" type="danger" icon="el-icon-video-play">播放全部</el-button>
                    <el-button round size="mini" type="danger" icon="el-icon-plus"></el-button>
                </el-button-group>
            </div>
            <!-- <div class="tips flex mb-5" v-if="tableHead.tags.length > 1">
                <label>标签：</label>
                <el-link :underline="false" class="blue mr-5" v-for="(item, index) in tableHead.tags" :key="index">
                    {{ item }}</el-link>
            </div> -->
            <div class="font-14" style="width:100%">
                <span class="mr-20">歌曲：{{ tableHead.trackCount }}</span>
                <span>播放：{{ numCount(tableHead.playCount) }}</span>
            </div>
            <el-collapse-transition v-if="tableHead.description">
                <div class="transition-box">
                    <p>
                        {{ tableHead.description }}
                    </p>
                </div>
            </el-collapse-transition>
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
    computed: {
        name() {
            return this.tableHead.name;
        },
        // 封面图
        coverImgUrl() {
            return this.tableHead.coverImgUrl;
        },
        avatarUrl() {
            return this.tableHead.creator.avatarUrl;
        },
        nickname() {
            return this.tableHead.creator.nickname;
        }
    },
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