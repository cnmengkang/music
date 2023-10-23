<template>
    <el-card class="user">
        <div class="user-head flex">
            <div class="user-avatar mr-20">
                <el-avatar :size="200" :src="avatarUrl"></el-avatar>
            </div>
            <div class="user-userInfo">
                <div class="user-name mb-10">
                    <h3>{{ nickName }}</h3>
                </div>
                <div class="user-vip-sex flex space-between">
                    <div class="user_sex">
                        <span class="mr-10 level">Lv {{ Level }}</span>
                        <span class="mr-10">{{ gender == 1 ? '男' : '女' }}</span>
                    </div>
                    <div v-if="params.uid == uid" class="edit">
                        <el-button type="small" @click="edit">编辑个人信息</el-button>
                    </div>
                </div>
                <div class="user-info mb-10 flex">
                    <p class="eventCount"><strong>{{ eventCount }}</strong><br>动态</p>
                    <p class="follows"><strong>{{ follows }}</strong><br>关注</p>
                    <p class="followeds"><strong>{{ followeds }}</strong><br>粉丝</p>
                </div>
                <div class="user-city mb-10">
                    <p class="mb-5">所在地区:{{ city }}</p>
                    <p class="mb-5">社交网络:3123123124124</p>
                    <p class="mb-5">个人介绍:{{ signature }}</p>
                </div>
            </div>
        </div>
        <div class="user-body mt-30">
            <tabs>
                <el-tab-pane label="创建的歌单">1</el-tab-pane>
                <el-tab-pane label="收藏的歌单">2</el-tab-pane>
                <el-tab-pane label="收藏的博客">3</el-tab-pane>
                <el-tab-pane label="创建的音乐专栏">4</el-tab-pane>
            </tabs>
        </div>
    </el-card>
</template>
<script>
import Tabs from '@/components/Tabs';
import { userDetail } from '@/api/user/user';
import { mapState } from "vuex";
export default {
    components: { Tabs },
    props: {},
    data() {
        return {
            user: '',
            profile: '',
            params: {
                uid: this.$route.params.uid,
            }
        };
    },
    mounted() {
        this.getUserDetail();
    },
    methods: {
        edit() {
            this.$router.push({ path: '/edit', query: { params: this.profile } })
        },
        async getUserDetail() {
            const result = await userDetail(this.params);
            this.user = result;
            this.profile = result.profile;
        }
    },
    computed: {
        nickName() {
            return this.profile.nickname
        },
        signature() {
            return this.profile.signature
        },
        Level() {
            return this.user.level
        },
        city() {
            return this.profile.city
        },
        avatarUrl() {
            return this.profile.avatarUrl
        },
        eventCount() {
            return this.profile.eventCount
        },
        follows() {
            return this.profile.follows
        },
        followeds() {
            return this.profile.followeds
        },
        gender() {
            return this.profile.gender
        },
        ...mapState({
            uid: (state) => state.uid
        }),
    }
}
</script>
<style lang="less" scoped>
.user {
    .user-userInfo {
        width: calc(100% - 220px);
    }

    .user-info {
        .eventCount{

        }
        p {
            text-align: center;
            line-height: 1.5;
            width: 12%;
            font-size: 12px;

            strong {
                font-size: 16px;
            }
        }
        .follows{
            border-left:1px solid #ccc ;
            border-right:1px solid #ccc ;

        }
        .followeds{
        }
    }

    .level {
        padding: 2px 10px;
        font-size: 10px;
        background-color: #ccc;
        color: #000;
        border-radius: 10px;
    }
}
</style>