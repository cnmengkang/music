<template>
    <div class="video">
        <div class="" v-if="videoAuth">
            <TitleComponent title="标题" icon="icon-title-left"></TitleComponent>
            <video-component :url="url"></video-component>
            <div class="video-author flex mt-20">
                <el-avatar :size="50" :src="avatar"></el-avatar>
                <p class="ml-10">{{ nickName }}</p>
                <p class="time">{{ parseTime(duration, "{i}:{s}") }}</p>
            </div>
            <h2 class="mt-10">{{ AuthorTitle }}</h2>
            <p>{{ $playTime(playTime) }}</p>
            <p>{{ parseTime(publishTime, "{y}-{m}-{d}") }}</p>
        </div>
        <el-empty v-else :image-size="200"></el-empty>
    </div>
</template>
<script>
import { videoUrl, videoDetail } from '@/api/video/video';
import TitleComponent from '@/components/TitleComponent'
import videoComponent from '@/components/video'
export default {
    name: 'detail',
    components: { TitleComponent, videoComponent },
    data() {
        return {
            videoAuth: '',
            url: ''
        };
    },

    mounted() {
        this.getVideoDetail(this.$route.params)
        this.getVideoUrl(this.$route.params)
    },
    methods: {
        async getVideoUrl(id) {
            const { urls } = await videoUrl(id);
            this.url = urls[0].url;
        },
        // 获取视频详情
        async getVideoDetail(id) {
            const { data } = await videoDetail(id);
            this.videoAuth = data;
            console.log(data)
        }
    },
    computed: {
        nickName() {
            return this.videoAuth.creator.nickname;
        },
        avatar() {
            return this.videoAuth.avatarUrl
        },
        duration() {
            return this.videoAuth.durationms
        },
        AuthorTitle() {
            return this.videoAuth.title
        },
        description() {
            return this.videoAuth.description
        },
        playTime() {
            return this.videoAuth.playTime
        },
        publishTime() {
            return this.videoAuth.publishTime
        }

    }
}
</script>
<style lang="less" scoped>
.video {
    width: 500px;

    video {
        width: 100%;
    }
}
</style>