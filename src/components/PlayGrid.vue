<template>
    <!-- grid列表 -->
    <div class="play-grid">
        <ul class="grid">
            <li class="w-20 mb-20" v-if="playlist.length == 9">
                <div class="play-img" @click="getDaySong">
                    <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
                    <el-button @click.stop="getPlayAllList('2034838310')" circle class="iconFont icon-play-red"></el-button>
                </div>
                <p class="name">每日歌曲推荐</p>
            </li>
            <li class="w-20 mb-20" v-for="(item) in playlist" :key="item.id">
                <div class="play-img" @click="getDetail(item.id)">
                    <el-image fit="cover" lazy :src="item.coverImgUrl ? item.coverImgUrl : item.picUrl"
                        :alt="item.alg"></el-image>
                    <span class="playCount font-12">
                        <i class="el-icon-caret-right"></i>{{ $playTime(item.playCount) }}</span>
                    <el-button @click.stop="getPlayAllList(item)" size="small" circle
                        class="iconFont icon-play-red"></el-button>
                </div>
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
            type: Array,
        }
    },
    data() {
        return {
            params: {
                ids: 0,
                index: 0,
                play:'all'
            },
        }
    },
    methods: {
        // 点击跳转到详情页面
        getDetail(ids) {
            this.$router.push({ name: 'detail', params: { id: ids } })
        },
        getPlayAllList(item) {
            this.params.ids = item.id;
            this.$store.dispatch('getCurrentMusicIsPlay', this.params);
        },
        // 获取每日推荐
        getDaySong() {
            this.$router.push('daysong')
        },
    }
}
</script>
<style lang="less" scoped>
.play-grid {
    .w-20 {
        width: 19%;
    }

    .grid {
        gap: 1%;

        li {
            .play-img {
                position: relative;

                .el-image {
                    border-radius: 4px;
                }

                .playCount {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    color: #fff;
                }

                .el-button {
                    position: absolute;
                    background: #fff;
                    color: red;
                    right: 5px;
                    bottom: 10px;
                    transform: scale(0);
                    transition: all .3s linear;
                }

                &:hover .el-button {
                    transform: scale(.8);
                }
            }
        }
    }
}
</style>