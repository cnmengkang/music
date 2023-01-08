<template>
    <!-- grid列表 -->
    <div class="play-grid">
        <ul class="grid">
            <li class="mb-10" v-if="playlist.length == 9">
                <div class="play-img" @click="getDaySong">
                    <el-avatar shape="square" :size="150"
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
                    <el-button @click.stop="getVideoPlay" size="small" circle
                        icon="icon iconFont icon-red_play"></el-button>
                </div>
                <p class="name">每日歌曲推荐</p>
            </li>
            <li class="mb-10" v-for="(item) in playlist" :key="item.id">
                <div class="play-img" @click="getDetail(item.id)">
                    <el-avatar shape="square" :size="150" :src="item.coverImgUrl ? item.coverImgUrl : item.picUrl"
                        :alt="item.alg"></el-avatar>
                    <span class="playCount font-12">
                        <i class="el-icon-caret-right"></i>
                        {{ numCount(item.playCount) }}</span>
                    <el-button @click.stop="getVideoPlay(item)" size="small" circle
                        icon="icon iconFont icon-red_play"></el-button>
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
            type: Array
        }
    },
    data() {
        return {
        };
    },
    mounted() { },
    methods: {
        // 点击歌单红色播放按钮
        getVideoPlay(e) {
            const id = e.id;
            console.log('id', id)
        },
        getDetail(id) {
            // this.$emit('detail', id)
            console.log('detail',1)
            this.$router.push({ name: 'detail', params: { id: id } })
        },
        getDaySong() {
            this.$router.push('daysong')
        }
    }
};
</script>
<style lang="less" scoped>
.play-grid {
    .grid {
        li {
            .play-img {
                position: relative;

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

        .name {
            width: 150px;
        }
    }
}
</style>