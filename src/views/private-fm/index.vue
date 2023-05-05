<template>
    <div>
        fm
        <button @click="getLogin">状态</button>
        <button @click="info">获取用户信息</button>
    </div>
</template>
  
<script>
import { getToken, setToken,getUserInfo } from '@/utils/auth'
export default {
    data() {
        return {
            
        };
    },
    computed: {
        
    },
    methods: {
        getLogin(){
            this.$store.dispatch('LoginStatus');
        },
        info(){
            console.log(getUserInfo('getToken'))
        }
    }
};
</script>
  