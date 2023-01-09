<template>
    <div class="video-mv" v-show="name.length!=0">
        <h2>MV详情</h2>
        <div class="video">
            <video :src="url" autoplay controls></video>
        </div>
        <div class="video-author flex mt-20">
            <el-avatar :size="50" :src="avatar"></el-avatar>
            <p class="ml-10">{{ name }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
        };
    },
    mounted() {
    },
    computed: mapState({
        name: state => state.videos.name,
        avatar: state => state.videos.avatar,
        url: state => state.videos.url
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