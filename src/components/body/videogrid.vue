<template>
    <div class="video-grid mt-20">
        <div class="wrapper" v-if="videoGroups.length != 0">
            <div class="cover border-r-5" v-for="(item, index) in videoGroups" :key="index" @click="getVideoDetail(item)">
                <template v-if="item.data">
                    <el-image class="border-r-5 wh" :src="item.data.coverUrl" lazy />
                    <span class="playCount"><i class="iconFont icon-play-count font-12 mr-5"></i>{{
                        numCount(item.data.playTime)
                    }}</span>
                    <span class="playTime">{{ parseTime(item.data.durationms, "{i}:{s}") }}</span>
                    <p class="creator-title ellipsis">{{ item.data.title }}</p>
                    <p class="creator-nickname" v-if="item.data.creator" @click.stop="getDetailAuthor(item)">by {{
                        item.data.creator.nickname }}</p>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        videoGroups: {
            type: Array
        }
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() { },
    mounted() { },
    methods: {
        // 点击视频列表跳转
        getVideoDetail(res) {
            console.log('detail', res.data)
            this.$store.dispatch('videos/getVideoPlay', res.data)
            this.$router.push({ name: 'videoPlay', params: { id: res.data.vid } })
        },
        getDetailAuthor(res) {
            console.log(res.data.creator)
        },
    },
    computed: {},
};
</script>
<style lang="less" scoped>
.video-grid {
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 15px;

        .creator-nickname {
            font-size: 12px;
            color: #ccc;
        }
    }


    .cover {
        position: relative;

        .wh {
            width: 270px;
            height: 150px;
        }

        .playCount,
        .playTime {
            position: absolute;
            right: 5px;
            z-index: 1;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
        }

        .creator-title {
            width: 270px;
        }

        .playCount {
            top: 5px;
        }

        .playTime {
            bottom: 50px;
        }
    }
}
</style>