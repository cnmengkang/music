<template>
    <div class="user-info">
        <div class="user-avatar flex">
            <el-avatar icon="el-icon-user-solid" :size="35" :src="userAvatar"></el-avatar>
            <el-dropdown trigger="click" class="user-down" @click.native="handleClick" placement="bottom"
                @command="handleCommand">
                <span class="el-dropdown-link ml-5 flex">
                    {{ userName || '未登录' }}
                    <img v-if="user" class="vipInfo" :src="vipInfo.redVipLevelIcon" />
                    <i class="el-icon-arrow-down el-icon--right ml-5"></i>
                </span>
                <el-dropdown-menu v-if="show" slot="dropdown" class="user-dropdown">
                    <div class="down-grid">
                        <p class="count">{{ user.eventCount }}<span class="title">动态</span></p>
                        <p class="count">{{ user.follows }}<span class="title">关注</span></p>
                        <p class="count">{{ user.followeds }}<span class="title">粉丝</span></p>
                    </div>
                    <el-dropdown-item command="0" icon="iconFont icon-user_revise" divided>个人信息设置</el-dropdown-item>
                    <el-dropdown-item command="1" icon="iconFont icon-level">等级<span class="right">{{
                        level
                    }}</span></el-dropdown-item>
                    <el-dropdown-item command="2" icon="iconFont icon-setting">设置</el-dropdown-item>
                    <el-dropdown-item command="3" icon="iconFont icon-logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
        </div>
    </div>
</template>

<script>
import { logout, userDetail, vipInfo } from '@/api/user/user'
import { mapState } from 'vuex'
export default {
    components: {},
    props: {},
    data() {
        return {
            user: '',
            level: '',
            show: true,
            vipInfo: ''
        };
    },
    computed: {
        user() {
            return this.user.length != 0;
        }
    },
    mounted() {
        this.getUserInfo();

    },
    methods: {
        // 登录状态
        async getUserInfo() {
            const uid = localStorage.getItem('uid');
            if (!uid) return;
            const res = await userDetail(uid);
            this.user = res.profile;
            this.level = res.level
            const vip = await vipInfo();
            this.vipInfo = vip.data
        },
        // 点击用户下来item数据事件
        handleCommand(command) {
            console.log(command)
            if (command == 3) {
                logout().then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        localStorage.clear();
                        this.user = '';
                        this.level = ''
                        this.getUserInfo();
                        this.$message('退出登录成功！');
                    }
                })
            }
        },
        handleClick() {
            if (!localStorage.getItem('uid')) {
                this.show = false;
                console.log('去登陆')
                this.$confirm('登录享受更多资源, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/qrCode')
                })
            } else {
                this.show = true;
                console.log('已登录')
            }
        }
    },
    computed: {
        ...mapState({
            userName: state => state.user.userName,
            userAvatar: state => state.user.userAvatar
        })
    },
};
</script>
<style lang="less" scoped>
.user-avatar {
    cursor: pointer;
}

.user-info {
    margin-left: 15%;
}

.vipInfo {
    width: 35px;
    margin-left: 5px;
}

.down-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;

    p {
        width: 33.33%;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;

        span {
            display: block;
            font-size: 12px;
            font-weight: 100;
        }
    }
}

.right {
    position: absolute;
    right: 10px;
}

.el-dropdown-menu__item {
    line-height: 45px !important;
}

.el-dropdown-menu__item:hover {
    background: #f2f2f2 !important;
    color: #000 !important;
}
</style>