<template>
    <div class="detail">
        <div class="detail-header" :key="playlist.id">
            <div class="detail-left">
                <img :src="playlist.coverImgUrl" alt="">
            </div>
            <div class="detail-right">
                <span class="song">歌单</span>
                <h2>{{ playlist.name }}</h2>
                <div>最近更新：{{ playlist.createTime }}</div>
                <label>标签：</label>
                <div v-for="(item, index) in playlist.tags" :key="index">{{ item }}</div>
                <span>歌曲：{{ playlist.trackCount }}</span>
                <span>播放{{ playlist.playCount }}</span>
                <div class="desc">简介：{{ playlist.description }}</div>
            </div>
        </div>
        <div class="detail-body">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲列表" name="first">
                    <el-table @row-dblclick="getPlayRow($event)" :data="songsList" :key="songsList.id" stripe
                        style="width: 100%">
                        <el-table-column type="index" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="date" label="操作" width="50">
                            <i class="el-icon-star-off"></i>
                            <i class="el-icon-download"></i>
                        </el-table-column>
                        <el-table-column prop="name" label="标题" width="320">
                        </el-table-column>
                        <el-table-column prop="ar[0].name" label="歌手">
                        </el-table-column>
                        <el-table-column prop="al.name" label="专辑">
                        </el-table-column>
                        <el-table-column prop="address" label="时间" width="50">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="评论" name="comment">
                    <div class="comment" v-for="(item, index) in comment" :key="index">
                        <div class="user-avatarUrl">
                            <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="user-info">
                            <span class="nickName"> {{ item.user.nickname }}：</span>
                            <span>{{ item.content }}</span>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收藏者" name="third">
                    <div class="scribers">
                        <div class="subscribers" v-for="(item, index) in subscribers" :key="index">
                            <div class="user-avatarUrl">
                                <img :src="item.avatarUrl" />
                            </div>
                            <div class="user-info">
                                <span class="nickName"> {{ item.nickname }}</span>
                                <span>{{ item.content }}</span>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { detail, playTrack, commentPlayList, subscribers } from '@/api/discover/detail'
export default {
    name: 'detail',
    data() {
        return {
            playlist: '',
            playAll: {
                id: this.$route.params.id,
                limit: 20,
                offset: 1
            },
            activeName: 'first',
            songsList: [],
            comment: "",
            subscribers: "",
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
        },
        indexMethod(index) {
            return index + 1 * 1
        },
        // tab切换
        handleClick(tab) {
            console.log(tab)
            if (tab.index == 1) {
                this.getComment()
            } else if (tab.index == 2) {
                console.log('收藏者')
                this.getSubscribers()
            }
        },
        // 获取歌单评论
        getComment() {
            commentPlayList(this.playAll).then((res) => {
                console.log(res)
                this.comment = res.comments
            })
        },
        // 歌单收藏者
        getSubscribers() {
            subscribers(this.playAll).then((res) => {
                this.subscribers = res.subscribers
            })
        },
        // 获取双击数据(row) 双击播放歌曲并获取数据
        getPlayRow(event) {
            this.$store.dispatch('getSongUrl', event);
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
            border-radius: 10px;

            img {
                border-radius: 10px;

            }
        }

        .detail-right {
            width: 75%;
            padding-left: 5%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 5px 10px;

            .song {
                color: #f00;
                border: 1px solid #f00;
                padding: 0px 3px;
                font-size: 14px;
                border-radius: 3px;
            }

            h2 {
                display: inline-block;
                width: 90%
            }

            .desc {
                font-size: 14px;
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

        .comment {
            display: flex;
            border-bottom: 1px solid #eee;
            padding: 15px 0px;

            .user-info {
                text-align: left;
                margin-left: 10px;

                span {
                    font-size: 12px;
                }

                .nickName {
                    color: blue
                }
            }

            .user-avatarUrl {
                width: 40px;
                height: 40px;
                border-radius: 50%;

                img {
                    border-radius: 50%;

                }
            }
        }

        .scribers {
            display: flex;
            flex-wrap: wrap;
            gap: 20px 0px;

            .subscribers {
                display: flex;
                align-items: center;
                width: 50%;
                gap: 0px 10px;

                .user-avatarUrl {
                    width: 95px;
                    height: 95px;
                    border-radius: 50%;

                    img {
                        border-radius: 50%;
                    }
                }
            }
        }

    }
}
</style>