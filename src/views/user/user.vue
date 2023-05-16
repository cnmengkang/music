<template>
    <div class="user mt-30">
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
                        <span class="mr-10">Vip</span>
                        <span class="mr-10">{{ Level }}</span>
                        <span class="mr-10">{{ gender }}</span>
                    </div>
                    <div>
                        <el-button @click="edit">编辑个人信息</el-button>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="user-info mb-10">
                    <span>动态({{ eventCount }})</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>关注({{ follows }})</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>粉丝({{ followeds }})</span>
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
    </div>
</template>
<script>
import Tabs from '@/components/Tabs';
import { userDetail } from '@/api/user/user';
export default {
    components: { Tabs },
    props: {},
    data() {
        return {
            user: '',
            profile: ''
        };
    },
    created() { },
    mounted() {
        const id = this.$route.params
        this.getUserDetail(id);
    },
    methods: {
        edit() {
            this.$router.push('/edit')
        },
        async getUserDetail(id) {
            const result = await userDetail(id);
            this.user = result;
            this.profile = result.profile;

            console.log(result);
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

    }
}
</script>
<style lang="less" scoped>
.user {
    .user-userInfo {
        width: calc(100% - 220px);
    }
}
</style>