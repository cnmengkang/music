<template>
    <div class="user_info cursor">
        <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
            <div class="el-dropdown-avatar flex">
                <el-avatar icon="el-icon-user-solid" :size="size" :src="avatar"></el-avatar>
                <div class="el-dropdown-link ml-10">
                    {{ nickName || "未登录" }}<i class="el-icon-arrow-down el-icon--right"></i>
                </div>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="account" divided icon="el-icon-edit">我的账户</el-dropdown-item>
                <el-dropdown-item command="revise" divided icon="el-icon-edit">个人信息修改</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { removeToken } from '@/utils/auth';
export default {
    data() {
        return {
            size: 35,
        }
    },
    methods: {
        ...mapMutations(['CLEAR_USER_INFO']),
        handleCommand(command) {
            if (command == 'account') {
                this.$router.push({ name: 'user', params: { uid: this.uid } })
            } else if (command == 'revise') {
                this.$router.push({ name: 'edit', params: { uid: this.uid } })

            } else {
                removeToken();
                this.CLEAR_USER_INFO();
            }
        },
    },
    computed: {
        ...mapState({
            nickName: state => state.nickName,
            avatar: state => state.avatar,
            uid: state => state.uid,
        })
    }
}
</script>