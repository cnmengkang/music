<template>
    <div class="comment">
        <div class="comment_button">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="140" show-word-limit v-model="value">
            </el-input>
            <el-button size="mini" class="mt-10 mb-20" @click="submitComment(value)">评论</el-button>
        </div>
        <div class="hot_reviews mb-50" v-if="hotReviewsList.length > 0">
            <p class="bold">精彩评论</p>
            <div class="reviews" v-for="(item) in hotReviewsList" :key="item.id">
                <div class="user-avatarUrl cursor" @click="getUserInfo(item.user)">
                    <el-avatar :size="40" :src="item.user.avatarUrl + '?param=40y40'"></el-avatar>
                </div>
                <div class="user-info">
                    <span class="blue mb-5 inline-b cursor mr-5" @click="getUserInfo(item.user)">{{ item.user.nickname }}
                        :</span>
                    <span>{{ item.content }}</span>
                    <div class="reviews-2" v-for="(items) in item.beReplied" :key="items.id">
                        <a class="blue font-12" @click="getUserInfo(item.user)">@{{ items.user.nickname }}:</a>
                        <span class="ml-5 text-center">{{ items.content == null ? '该评论已删除' : item.content }}</span>
                    </div>
                    <div class="reviews_replay mt-10 cursor">
                        <div class="left time font-12">{{ item.timeStr }} {{ $formatTime(item.time, "{h}:{i}") }}</div>
                        <div class="right">
                            <div class="liked">
                                <i @click="sedCommentLike(item)"
                                    :class="['iconFont font-16', item.liked ? 'icon-liked_true' : 'icon-liked_false']"></i>
                                <span class="" v-if="item.likedCount > 0"> {{ item.likedCount }}</span>
                            </div>
                            <span v-if="item.user.userId == uid" class="delete" @click="deleteComment(item)"><i
                                    class="el-icon-delete font-16"></i></span>
                            <span @click="replayToComment(item)"><i class="el-icon-chat-dot-round font-16"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="new_reviews" v-if="newReviewsList.length > 0">
            <p class="bold">最新评论({{ reviewsTotal }})</p>
            <div class="reviews" v-for="(item, index) in newReviewsList" :key="index">
                <div class="user-avatarUrl cursor" @click="getUserInfo(item.user)">
                    <el-avatar :size="40" :src="item.user.avatarUrl + '?param=40y40'"></el-avatar>
                </div>
                <div class="user-info">
                    <span class="blue mb-5 inline-b cursor mr-5" @click="getUserInfo(item.user)">{{ item.user.nickname }}
                        :</span>
                    <span>{{ item.content }}</span>
                    <div class="reviews-2" v-for="(items) in item.beReplied" :key="items.id">
                        <a class="blue font-12" @click="getUserInfo(item.user)">@{{ items.user.nickname }}:</a>
                        <span class="ml-5 text-center">{{ items.content == null ? '该评论已删除' : item.content }}</span>
                    </div>
                    <div class="reviews_replay mt-10 cursor">
                        <div class="left time font-12">{{ item.timeStr }} {{ $formatTime(item.time, "{h}:{i}") }}</div>
                        <div class="right">
                            <div class="liked">
                                <i @click="sedCommentLike(item)"
                                    :class="['iconFont font-16', item.liked ? 'icon-liked_true' : 'icon-liked_false']"></i>
                                <span class="" v-if="item.likedCount > 0"> {{ item.likedCount }}</span>
                            </div>
                            <span v-if="item.user.userId == uid" class="delete" @click="deleteComment(item)"><i
                                    class="el-icon-delete font-16"></i></span>
                            <span @click="replayToComment(item)"><i class="el-icon-chat-dot-round font-16"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="text-center">还没有评论，快来抢沙发~</p>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { comment, commentLike } from '@/api/discover/reviews'
export default {
    props: {
        hotReviewsList: {
            type: Array,
            require: true
        },
        newReviewsList: {
            type: Array,
            require: true
        },
        reviewsTotal: {
            type: Number,
            require: true
        },
        commentType: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            commentsList: {
                t: 1,
                type: 0,
                id: this.$route.params.id,
                content: '',
                commentId: ''
                // 发布/删除评论
            },
            like: {
                id: this.$route.params.id,
                t: 1,
                type: 0,
                cid: 0
            },
            value: '',

        };
    },
    watch: {
        "$route.params.id": {
            immediate: true,
            handler(newId, oldId) {
                this.like.id = newId;
                this.commentsList.id = newId;
                this.commentsList.type = this.commentType
                this.like.type = this.commentType
            },
        },
    },
    created() {
        this.commentsList.type = this.commentType
        this.like.type = this.commentType
    },
    methods: {
        // 获取用户详情
        getUserInfo(item) {
            this.$router.push({ name: "user", params: { uid: item.userId } });
        },
        // 确定评论按钮
        submitComment(value) {
            if (value == "") {
                this.$message.error('写点东西吧，废物！')
            } else {
                this.commentsList.content = value;
                this.sedReplayCommit()
            }
        },
        // 评论数据交互
        async sedReplayCommit(t) {
            let result = await comment(this.commentsList);
            if (result.code != 200) return;
            if (t == 0) {
                this.updateCommit();
            } else {
                alert('评论成功')
                this.value = "";
                this.updateCommit();
            }
        },
        // 回复评价
        replayToComment(replay) {
            this.commentsList.commentId = replay.commentId;
            this.commentsList.t = 2;
            this.value = replay.user.nickname;
        },
        // 删除评论
        deleteComment(remove) {
            this.commentsList.commentId = remove.commentId;
            this.commentsList.t = 0;
            this.$confirm('此操作将永久删除评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.sedReplayCommit(0);
                this.$message({
                    type: 'success',
                    message: '评论删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 点赞评论
        async sedCommentLike(like) {
            if (like.liked) {
                this.like.cid = like.commentId
                this.like.t = 0;
            } else {
                this.like.cid = like.commentId
                this.like.t = 1;
            }
            let result = await commentLike(this.like);
            if (result.code != 200) return;
            alert('success')
            this.updateCommit();

        },
        // 更新数据
        updateCommit() {
            this.$emit('upDateReviews')
        }

    },
    computed: {
        ...mapState({
            uid: (state) => state.uid
        }),
    }
}
</script>
<style lang="less" scoped>
.reviews {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 15px 0px;

    .reviews_replay {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right {
            display: flex;
            align-items: center;
            gap: 15px;
        }
    }

    .user-info {
        text-align: left;
        margin-left: 10px;
        width: calc(100% - 40px);

        span {
            font-size: 12px;
        }

        .reviews-2 {
            background: #f2f2f2;
            padding: 10px 10px;
            border-radius: 5px;
            margin: 5px 0px;
        }


    }

    .user-avatarUrl {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.bold {
    font-weight: bold;
    font-size: 16px;
}

.icon-liked_true {
    color: red;
}
</style>