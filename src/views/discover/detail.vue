<template>
    <div class="detail mt-20">
        <div class="detail-header" :key="playlist.id">
            <div class="detail-left">
                <el-avatar :size="180" shape="square" icon="el-icon-user-solid" :src="playlist.coverImgUrl"></el-avatar>
            </div>
            <div class="detail-right">
                <div class="right-title  flex">
                    <span class="song mr-10">歌单</span>
                    <h1>{{ playlist.name }}</h1>
                </div>
                <!-- 标题 -->
                <div class="right-creator font-12 flex">
                    <el-avatar :src="creator.avatarUrl" class="mr-10" :size="30"  />
                    <span class="mr-10 blue">{{ creator.nickname }}</span>
                    <div class="createTime">
                        {{ parseTime(playlist.createTime, "{y}-{m}-{d}") }}创建
                        <!-- 创建时间 -->
                    </div>
                </div>
                <!-- 作者时间 -->
                <div class="tips flex ">
                    <label>标签：</label>
                    <a class="blue mr-10" v-for="(item, index) in playlist.tags" :key="index">{{ item }}</a>
                </div>
                <span>歌曲：{{ playlist.trackCount }}</span>
                <span>播放：{{ numCount(playlist.playCount) }}</span>
                <div class="desc">简介：{{ playlist.description }}</div>
            </div>
        </div>
        <div class="detail-body">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲列表" name="song">
                    <el-table highlight-current-row @row-dblclick="getPlayRow($event)" :data="songsList"
                        :key="songsList.id" stripe style="width: 100%">
                        <el-table-column type="index" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="date" label="操作" width="50">
                            <i class="el-icon-star-off"></i>
                            <i class="el-icon-download"></i>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip label="标题" width="320">
                            <template slot-scope="scope">
                                <span class="name mr-10">{{ scope.row.name }}</span>
                                <div class="mv" v-if="!scope.row.mv == 0">
                                    <span @click="getMv(scope.row.mv)">{{ scope.row.mv == 0 ? '' : 'MV' }}<i
                                            class="el-icon-caret-right"></i></span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip prop="ar[0].name" label="歌手">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip prop="al.name" label="专辑">
                        </el-table-column>
                        <el-table-column label="时间" width="65">
                            <template slot-scope="scope">
                                <span>{{ parseTime(scope.row.dt, "{i}:{s}") }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane name="reviews">
                    <span slot="label">评论({{ total }})</span>
                    <div class="comment" v-for="(item, index) in comment" :key="index">
                        <div class="user-avatarUrl">
                            <el-avatar :size="40" :src="item.user.avatarUrl"></el-avatar>
                        </div>
                        <div class="user-info">
                            <span class="blue mb-5 inline-b">{{ item.user.nickname }}<span class="vip ml-5"
                                    v-if="item.user.vipType != 0">VIP{{ item.user.vipRights.redVipLevel }}</span>：</span>
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
                                <span style="color:red" v-if="item.gender != 0">{{ item.gender == 1 ? '男' : '女' }}</span>
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
export default {
    name: 'detail',
    data() {
        return {
            playlist: '',
            playAll: {
                id: this.$route.params.id,
                limit: 30,
            },
            activeName: 'song',
            songsList: [],
            comment: "",
            subscribers: "",
            creator: '',
            total: ''
        }
    },
    created() {
        const id = this.$route.params;
        this.getDetail(id)
        this.getPlayTrack()
        this.getComment()
    },
    methods: {
        // 
        getDetail(id) {
            detail(id).then((res) => {
                console.log('playlist', res)
                this.playlist = res.playlist;
                this.creator = res.playlist.creator
            })
        },
        getPlayTrack() {
            playTrack(this.playAll).then((res) => {
                console.log('songsList', res)
                this.songsList = res.songs
            })
        },
        indexMethod(index) {
            return index + 1 * 1
        },
        // 单选
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
            commentPlayList(this.playAll).then((res) => {
                console.log('reviews', res)
                this.total = res.total
                this.comment = res.comments
            })
        },
        // 歌单收藏者
        getSubscribers() {
            subscribers(this.playAll).then((res) => {
                console.log(res.subscribers)
                this.subscribers = res.subscribers
            })
        },
        // 获取双击数据(row) 双击播放歌曲并获取数据
        getPlayRow(event) {
            this.$store.dispatch('getSongUrl', event);
        },
        // 获取mv
        getMv(mv) {
            console.log(mv)
        }
    }
}
</script>
<style scoped lang="less">
.detail {
    // 顶部区域
    .detail-header {
        display: flex;
        align-items: center;
        text-align: left;

        .detail-left {
            width: 20%;
            border-radius: 10px;

  
        }

        .detail-right {
            width: 75%;
            padding-left: 5%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 5px 10px;

  
            .tips {
                span:last-type-of {
                    display: none;
                }
            }

            .song {
                color: #f00;
                border: 1px solid #f00;
                padding: 0px 3px;
                font-size: 14px;
                border-radius: 3px;
            }

            .desc {
                font-size: 14px;
            }
        }
    }

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

        .mv {
            display: inline-block;

            span {
                cursor: pointer;
                border: 1px solid #f00;
                padding: 0px 2px;
                border-radius: 4px;
                font-size: 12px;
                color: red;
            }
        }
    }
}
</style>