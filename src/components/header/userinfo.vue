<template>
    <div class="user-info">
        <div class="user-avatar flex">
            <el-avatar icon="el-icon-user-solid" :size="35" :src="user.avatarUrl"></el-avatar>
            <el-dropdown trigger="click" class="user-down" @click.native="handleClick" placement="bottom"
                @command="handleCommand">
                <span class="el-dropdown-link ml-5 flex">
                    {{ user.nickname || '未登录' }}
                    <!-- <img v-if="user" class="vipInfo" :src="vipInfo.redVipLevelIcon" /> -->
                    <i class="el-icon-arrow-down el-icon--right ml-5"></i>
                </span>
                <el-dropdown-menu v-if="dropdown" slot="dropdown" class="user-dropdown">
                    <div class="down-grid">
                        <p class="count">{{ user.eventCount }}<span class="title">动态</span></p>
                        <p class="count">{{ user.follows }}<span class="title">关注</span></p>
                        <p class="count">{{ user.followeds }}<span class="title">粉丝</span></p>
                    </div>
                    <el-dropdown-item command="1" icon="iconFont icon-user_revise" divided>个人信息设置</el-dropdown-item>
                    <el-dropdown-item command="2" icon="iconFont icon-setting">设置</el-dropdown-item>
                    <el-dropdown-item command="3" icon="iconFont icon-logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="login" v-if="hide">
            <qr-code></qr-code>
        </div>
    </div>
</template>
<script>
import { logout, userDetail, } from '@/api/user/user';
import qrCode from '@/views/login/qrCode'
export default {
    components: { qrCode },
    props: {},
    data() {
        return {
            user: '',
            level: '',
            dropdown: true,
            vipInfo: '',
            hide: false,
            id: { uid: 345288322 }
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        // 登录状态
        async getUserInfo() {
            const { profile } = await userDetail(this.id);
            this.user = profile;
        },
        // 点击用户下来item数据事件
        handleCommand(index) {
            if (index == 1) {
                console.log('1');
                this.$router.push('/edit');
            } else if (index == 2) {
                console.log('2');
            } else {
                this.user = '';
            }
        },
        handleClick() {
            if (this.user) return;
            this.dropdown = false;
        },
        async getLogout() {
            const res = await logout();
            console.log(res)
        }
    }
}
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

.login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    background-color: #f2f2f2;
    z-index: 9999;
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
}</style>