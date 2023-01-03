<template>
    <div class="category-menu">
        <div class="videos">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p class="text-left">全部视频</p>
                </div>
                <div class="card_body flex">
                    <el-button round v-for="(item, index) in videoList" @click="isActive(index)" :key="index"
                        :class="activeClass == index ? 'active' : ''">
                        <a>{{ item.name }}</a>
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
  
<script>
import { videoList } from '@/api/video/video'
export default {
    name: "videos",
    data() {
        return {
            videoList: [],
            activeClass: -1
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
        isActive(index) {
            this.activeClass = index
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
        p {
            width: 16.666%;
            padding: 5px 0px;
            margin-bottom: 15px;

            a:hover {
                color: #ffc0cb;
            }
        }

        .active {
            background: #ffc0cb;
            border-radius: 15px;
            color: red;
        }
    }
}
</style>
  