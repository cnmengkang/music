<template>
    <ul class="mv_flex">
        <li class="border-r-5 mv_item mb-20" v-for="(item, index) in data" :key="index" @click="getVideoDetail(item)">
            <div class="relative">
                <el-image class="border-r-5 cursor" :src="item.cover" />
                <span class="playCount">
                    {{ $playCount(item.playCount) }}</span>
                <span class="playTime">{{ $formatTime(item.duration, "{i}:{s}") }}</span>
                <p class="briefDesc">{{ item.briefDesc }}</p>
            </div>
            <p>{{ item.name }}</p>
            <p class="font-12">{{ item.artistName }}</p>
        </li>
    </ul>
</template>

<script>
export default {
    components: {},
    props: {
        data: Array
    },
    data() {
        return {
        };
    },
    created() { },
    mounted() { },
    methods: {
        // 点击视频列表跳转
        getVideoDetail(res) {
            this.$router.push({ name: "videoDetail", params: { id: res.id } });
        },
    },
    computed: {},
}
</script>
<style lang="less" scoped>
.mv_flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>