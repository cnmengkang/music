<template>
    <div class="video-grid mt-20">
        <div class="wrapper" v-if="videoGroups.length != 0">
            <div class="cover border-r-5" v-for="item in videoGroups" :key="item.data.vid">
                <el-image class="border-r-5 wh" :src="item.data.coverUrl" lazy />
                <span class="playCount">{{ numCount(item.data.playTime) }}</span>
                <span class="playTime">{{ parseTime(item.data.durationms, "{i}:{s}") }}</span>
                <p class="creator-title ellipsis">{{ item.data.title }}</p>
                <p class="creator-nickname">by {{ item.data.creator.nickname }}</p>
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
            src: 'https://p2.music.126.net/GnGnHdK-L36ySBaNNZG7sw==/109951163570543741.jpg',
            name: '十大中文金曲《烈焰红唇》梅艳芳 天啊这二米三的大长腿',
            nickname: 'nickname'
        };
    },
    created() { },
    mounted() { },
    methods: {},
    computed: {},
};
</script>
<style lang="less" scoped>
.video-grid {
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content:flex-start;
        gap:15px;
    }


    .cover {
        position: relative;
        .wh{
            width:270px;
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
        .creator-title{
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