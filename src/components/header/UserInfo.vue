<template>
    <div class="user_info cursor">
        <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
            <div class="el-dropdown-avatar flex" @click="getDropdown">
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
import { mapState } from 'vuex';
import { removeToken } from '@/utils/auth'
export default {
    data() {
        return {
            size: 35,
            dropdown: false,
        }
    },
    methods: {
        handleCommand(command) {
            console.log(command)
            if (command == 'account') {
                console.log('account')
            } else if (command == 'revise') {
                console.log('revise')
            } else {
                removeToken()

            }
        },
        getDropdown() {
            console.log('ddddd')
        }
    },
    computed: {
        ...mapState({
            nickName: state => state.nickName,
            avatar: state => state.avatar,
        })
    },
}
</script>
<style lang="less" scoped></style>