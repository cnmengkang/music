<template>
    <div class="play-grid">
        <ul class="grid">
            <li class="mb-10" v-for="(item) in playlist" :key="item.id">
                <div class="play-img">
                    <el-avatar shape="square" :size="195" :src="item.coverImgUrl" :alt="item.alg"></el-avatar>
                </div>
                <span class="playCount font-12">
                        <i class="el-icon-caret-right"></i>
                        {{ numCount(item.playCount) }}</span>
                <p class="name">{{ item.name }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        playlist: {
            type: Array
        }
    },
    data() {
        return {
        };
    },
    created() { },
    mounted() { }
};
</script>
<style lang="less" scoped>
.play-grid {
    .grid {
        li {
            position: relative;
            .playCount {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    color: #fff;
                }
        }
        .name{
            width: 195px;
        }
    }
}
</style>