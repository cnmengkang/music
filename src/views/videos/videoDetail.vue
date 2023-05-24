<template>
    <div class="video-detail mt-30">
        <div class="detail">
            <div class="detail-left" v-if="videoAuth">
                <TitleComponent title="视频详情" icon="icon-title-left"></TitleComponent>
                <video-component :url="url"></video-component>
                <div class="video-author flex">
                    <el-avatar :size="50" :src="avatar"></el-avatar>
                    <p class="ml-10">{{ nickName }}</p>
                    <p class="time">{{ parseTime(duration, "{i}:{s}") }}</p>
                </div>
                <div class="authorTitle mb-15">
                    <h2 class="mt-10">{{ AuthorTitle }}</h2>
                </div>
                <div class="author flex mb-15">
                    <p class="mr-20">创建时间：{{ parseTime(publishTime, "{y}-{m}-{d}") }}</p>
                    <p>播放：{{ $playTime(playTime) }}</p>
                </div>
                <div class="videoGroup mb-15">
                    <el-tag class="mr-10 cursor mb-10" @click="getTag(item)" color="#f2f2f2f2" v-for="item in videoGroup"
                        :key="item.id" type="info" effect="plain" size="mini">
                        {{ item.name }}
                    </el-tag>
                </div>
            </div>
            <el-empty v-else :image-size="200"></el-empty>
            <div class="detail-right">
                <TitleComponent title="相关推荐"></TitleComponent>
                <div class="related flex mb-10 cursor" v-for="(item, index) in related" :key="index"
                    @click="getRelatedVideo(item)">
                    <div class="related-left">
                        <el-image class="border-r-5" :src="item.coverUrl" :alg="item.alg"  fit="cover"
                            style="width: 140px; height: 90px"></el-image>
                        <span class="playTime">{{ $playTime(item.playTime) }}</span>
                        <span class="duration">{{ parseTime(item.durationms, "{i}:{s}") }}</span>
                        <span></span>
                    </div>
                    <div class="related-right" v-if="item.creator">
                        <p>{{ item.title }}</p>
                        <p class="by mt-10">by&nbsp;{{item.creator[0].userName}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { videoUrl, videoDetail, relatedAllVideo } from '@/api/video/video';
import TitleComponent from '@/components/TitleComponent'
import videoComponent from '@/components/video'
export default {
    name: 'detail',
    components: { TitleComponent, videoComponent },
    data() {
        return {
            videoAuth: '',
            url: '',
            id: this.$route.params.id,
            related: '',
        }
    },

    mounted() {
        this.getAllVideoDetail();
    },
    methods: {
        async getVideoUrl() {
            const { urls } = await videoUrl(this.id);
            this.url = urls[0].url;
        },
        // 获取视频详情
        async getVideoDetail() {
            const { data } = await videoDetail(this.id);
            this.videoAuth = data;
        },
        // 获取相关视频
        async getRelatedAllVideo() {
            const { data } = await relatedAllVideo(this.id);
            this.related = data;
            console.log(data)
        },
        getTag(params) {
            this.$router.push({ name: 'video', params })
        },
        getAllVideoDetail() {
            this.getVideoDetail();
            this.getRelatedAllVideo();
            this.getVideoUrl();
        },
        getRelatedVideo(item) {
            this.id = item.vid
            this.getAllVideoDetail();
        }
    },
    computed: {
        nickName() {
            return this.videoAuth.creator.nickname;
        },
        avatar() {
            return this.videoAuth.avatarUrl;
        },
        duration() {
            return this.videoAuth.durationms;
        },
        AuthorTitle() {
            return this.videoAuth.title;
        },
        description() {
            return this.videoAuth.description;
        },
        playTime() {
            return this.videoAuth.playTime;
        },
        publishTime() {
            return this.videoAuth.publishTime;
        },
        videoGroup() {
            return this.videoAuth.videoGroup;
        },
    }
}
</script>
<style lang="less" scoped>
.video-detail {
    .detail {
        display: flex;

        .detail-left {
            width: 60%;
        }

        .detail-right {
            width: 40%;
            padding-left: 30px;
            .related {
                flex-wrap: nowrap;
                gap: 10px;

                .related-left {
                    position: relative;

                    .playTime,
                    .duration {
                        position: absolute;
                        right: 5px;
                        font-size: 12px;
                        color: #fff;
                    }

                    .playTime {
                        top: 5px;
                    }

                    .duration {
                        bottom: 10px;
                    }
                }
            }
        }

    }
}
</style>