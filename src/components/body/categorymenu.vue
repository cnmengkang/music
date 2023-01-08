<template>
    <div class="category-menu">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="视频" name="video">
                <div class="videos">
                    <div class="video-tabs">
                        <el-button @click="show">{{ name?name: '全部视频' }}</el-button>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="现场" name="1">现场</el-tab-pane>
                            <el-tab-pane label="翻唱" name="2">翻唱</el-tab-pane>
                            <el-tab-pane label="舞蹈" name="3">舞蹈</el-tab-pane>
                            <el-tab-pane label="听BGM" name="4">听BGM</el-tab-pane>
                            <el-tab-pane label="MV" name="mv">MV</el-tab-pane>
                            <el-tab-pane label="生活" name="5">生活</el-tab-pane>
                        </el-tabs>
                    </div>



                    <el-card class="box-card" v-if="isShow">
                        <div slot="header" class="clearfix">
                            <p class="text-left">全部视频</p>
                        </div>
                        <div class="card_body">
                            <el-tag round v-for="(item, index) in videoList" @click="isActive(index, item.name)"
                                :key="index" :class="activeClass == index ? 'active' : ''">
                                <a>{{ item.name }}</a>
                            </el-tag>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="MV" name="MV">MV</el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import { videoList } from '@/api/video/video'
export default {
    name: "videos",
    data() {
        return {
            videoList: [],
            activeClass: -1,
            isShow: false,
            name: '',
            activeName: 'video'
        };
    },
    created() {
        this.getVideoList()

    },
    methods: {
        getVideoList() {
            videoList().then((res) => {
                console.log(res)
                this.videoList = res.data
            })
        },
        isActive(index, name) {
            this.activeClass = index;
            this.name = name
            this.isShow = false
        },
        show() {
            this.isShow = true
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style lang="less" scoped>
.category-menu {
    width: 100%;

    .box-card {
        width: 80%;
        height: 520px;
        overflow-y: scroll;
    }

    .card_body {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        text-align: center;

        .el-tag {
            border: none;
            width: 15%;
            transition: all .3s linear;
        }

        .active {
            background: #ffc0cb;
        }
    }
    .video-tabs{
        display: flex;
        align-items: center;
    justify-content: space-between;
    }
}
</style>
