<template>
    <div class="detail mt-20">
        <div class="detail-header">
            <song-head :tableHead="playlist"></song-head>
            <!-- 详情页顶部 -->
        </div>
        <div class="detail-body">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲列表" name="song">
                    <song-list :tableDate="list"></song-list>
                </el-tab-pane>
                <el-tab-pane name="reviews">
                    <span slot="label">评论 <small style="font-size:12px;">({{ totalReview }})</small> </span>
                    <div class="comment" v-for="(item, index) in comment" :key="index">
                        <div class="user-avatarUrl">
                            <el-avatar :size="40" :src="item.user.avatarUrl"></el-avatar>
                        </div>
                        <div class="user-info">
                            <span class="blue mb-5 inline-b">{{ item.user.nickname }}<span class="vip ml-5"
                                    v-if="item.user.vipType != 0">VIP{{
                                        item.user.vipRights.redVipLevel
                                    }}</span>：</span>
                            <span>{{ item.content }}</span>
                            <div class="reviews-2" v-for="(items, index) in item.beReplied" :key="index">
                                <a class="blue font-12">@{{ items.user.nickname }}:</a>
                                <span>{{ items.content }}</span>
                            </div>
                            <div class="font-12 mt-5">{{ item.timeStr }}</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收藏者" name="third">
                    <div class="scribers">
                        <div class="subscribers" v-for="(item, index) in subscribers" :key="index">
                            <div class="user-avatarUrl">
                                <el-avatar :size="90" :src="item.avatarUrl"></el-avatar>
                            </div>
                            <div class="user-info">
                                <span class="nickName"> {{ item.nickname }}</span>
                                <span style="color:red" v-if="item.gender != 0">{{
                                    item.gender == 1 ? '男' : '女'
                                }}</span>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { detail, playTrack, commentPlayList, subscribers } from '@/api/discover/detail';
import songHead from '@/components/body/head'
import songList from '@/components/body/songlist'
export default {
    components: { songHead, songList },
    name: 'detail',
    data() {
        return {
            playlist: {},
            params: {
                id: this.$route.params.id,
                limit: '',
                offset: 0
            },
            activeName: 'song',
            list: [],
            comment: "",
            subscribers: "",
            totalReview: '',  //总评论数
        }
    },
    mounted() {
        const id = this.$route.params;
        this.getDetail(id);
        this.getPlayTrack();
        this.getComment();
    },
    methods: {
        // 获取详情页顶部数据
        getDetail(id) {
            detail(id).then((res) => {
                this.totalPage = res.playlist.trackCount;
                this.playlist = res.playlist;
            })
        },
        // // 获取歌单所有歌曲
        getPlayTrack() {
            playTrack(this.params).then((res) => {
                console.log('songsList', res)
                this.list = res.songs
            })
        },
        // tab切换
        handleClick(tab) {
            if (tab.index == 1) {
                this.getComment()
            } else if (tab.index == 2) {
                this.getSubscribers()
            }
        },
        // 获取歌单评论
        getComment() {
            commentPlayList(this.params).then((res) => {
                this.totalReview = res.total
                this.comment = res.comments
            })
        },
        // 歌单收藏者
        getSubscribers() {
            subscribers(this.params).then((res) => {
                this.subscribers = res.subscribers;
            })
        }
    }
}
</script>
<style scoped lang="less">
.detail {
    // 内容区域
    .detail-body {
        .comment {
            display: flex;
            border-bottom: 1px solid #eee;
            padding: 15px 0px;

            .user-info {
                text-align: left;
                margin-left: 10px;
                width: calc(100% - 40px);

                span {
                    font-size: 12px;
                }

                .reviews-2 {
                    background: #f2f2f2;
                    padding: 8px 10px;
                    border-radius: 5px;
                }

                .vip {
                    color: red;
                }
            }

            .user-avatarUrl {
                width: 40px;
                height: 40px;
                border-radius: 50%;
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
                }
            }
        }
    }
}
</style>