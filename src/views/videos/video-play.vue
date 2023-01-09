<template>
    <div class="video-mv">
        <template v-if="url.length != 0">
            <h2><i class="iconFont icon-title-left"></i>MV详情</h2>
            <div class="video">
                <video :src="url" autoplay controls></video>
            </div>
            <div class="video-author flex mt-20">
                <el-avatar :size="50" :src="avatar"></el-avatar>
                <p class="ml-10">{{ name }}</p>
                <p class="time">{{ parseTime(duration,"{i}:{s}") }}</p>
            </div>
        </template>
        <el-empty v-else :image-size="200"></el-empty>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {

        };
    },
    props: {

    },
    mounted() {
    },
    computed: mapState({
        name: state => state.videos.name,
        avatar: state => state.videos.avatar,
        url: state => state.videos.url,
        duration: state => state.videos.duration
    }),
    methods: {
    },
};
</script>
<style lang="less" scoped>
.video {
    width: 500px;

    video {
        width: 100%;
    }
}
</style>