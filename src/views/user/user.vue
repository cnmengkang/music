<template>
    <div class="user mt-30">
        <div class="user-head flex">
            <div class="user-avatar mr-20">
                <el-avatar :size="200"></el-avatar>
            </div>
            <div class="user-userInfo">
                <div class="user-name mb-10">
                    <h3>menciuskang</h3>
                </div>
                <div class="user-vip-sex flex space-between">
                    <div class="user_sex">
                        <span class="mr-10">Vip</span>
                        <span class="mr-10">lv9</span>
                        <span class="mr-10">男</span>
                    </div>
                    <div>
                        <el-button @click="edit">编辑个人信息</el-button>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="user-info mb-10">
                    <span>动态(1234)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>关注(234)</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>粉丝(99)</span>
                </div>
                <div class="user-city mb-10">
                    <p class="mb-5">所在地区:合肥</p>
                    <p class="mb-5">社交网络:3123123124124</p>
                    <p class="mb-5">个人介绍:1232444</p>
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
import { userPlaylist, loginStatus, userDetail } from '@/api/user/user';
export default {
    components: { Tabs },
    props: {},
    data() {
        return {
        };
    },
    created() { },
    mounted() {
        this.getStatus();
    },
    methods: {
        edit() {
            this.$router.push('/edit')
        },
        async getUserPlaylist(uid) {
            const result = await userPlaylist({ uid });
            console.log('userPlaylist',result)
        },
        async getUserDetail(uid) {
            const result = await userDetail({ uid });
            console.log('userDetail',result)
        },
        async getStatus() {
            const { data } = await loginStatus();
            this.getUserPlaylist(data.data.account.id);
            this.getUserDetail(data.data.account.id);
        }
    },
}
</script>
<style lang="less" scoped>
.user {
    .user-userInfo {
        width: calc(100% - 220px);
    }
}
</style>