<template>
    <div class="detail">
        <div class="detail-header" :key="playlist.id">
            <div class="detail-left">
                <img :src="playlist.coverImgUrl" alt="">
            </div>
            <div class="detail-right">
                <span class="song">歌单</span>
                <h4>{{ playlist.name }}</h4>
                <div>最近更新：{{ playlist.createTime }}</div>
                <span>歌曲：{{ playlist.trackCount }}</span>
                <div class="desc">简介：{{ playlist.description }}</div>
            </div>
        </div>
        <div class="detail-body">
            <ul>
                <li v-for="(item, index) in songsList" :key="item.id">
                    <div class="number">0{{ index + 1 }}</div>
                    <div class="name">{{ item.name }} </div>
                    <div class="tip">{{ item.alia[0] }}</div>
                    <div class="zuozhe">{{ item.ar[0].name }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { detail, playTrack } from '@/api/discover/detail'
export default {
    name: 'detail',
    data() {
        return {
            playlist: '',
            playAll: {
                id: this.$route.params.id,
                limit: 50,
                offset: 1
            },
            songsList: ''

        }
    },
    created() {
        const id = this.$route.params;
        this.getDetail(id)
        this.getPlayTrack(id)
    },
    methods: {
        // 
        getDetail(id) {
            detail(id).then(res => {
                console.log('detail', res)
                this.playlist = res.playlist;
            })
        },
        getPlayTrack() {
            playTrack(this.playAll).then((res) => {
                console.log('all', res)
                this.songsList = res.songs
            })
        }
    }
}
</script>
<style scoped lang="less">
.detail {
    .detail-header {
        display: flex;
        align-items: center;
        text-align: left;

        .detail-left {
            width: 20%;
        }

        .detail-right {
            width: 75%;
            padding-left: 5%;

            .song {
                color: #f00;
                border: 1px solid #f00;
                padding: 1px 2px;
                font-size: 14px;
                border-radius: 3px;
                margin-right: 10px;
            }

            h4 {
                display: inline-block;
            }
        }
    }

    .detail-body {
        ul {
            li {
                text-align: left;
                font-size: 14px;
                height: 35px;
                line-height: 35px;

                .number {
                    padding: 0px 15px;
                }

                .name {
                    margin-right: 5px;
                }

                div {
                    display: inline-block;
                }
            }
        }
    }
}
</style>