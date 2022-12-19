<template>
    <div class="topList">
        <div class="top-grid" v-for="item in topList" :key="item.id">
            <div class="left list">
            <img :src="item.coverImgUrl"/>
        </div>
        <div class="right list">

        </div>
        </div>
    </div>
</template>

<script>
import { topList } from '@/api/discover/topList';
export default {
    name: 'topList',
    data() {
        return {
            topList:''
        };
    },
    created() {
        this.getTopList()
    },
    mounted() { },
    methods: {
        getTopList() {
            topList().then(res => {
                console.log(res)
                this.topList = res.list
            })
        }
    },

};
</script>
<style lang="less" scoped>
.topList{
    .top-grid{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 50px;
        .left{
            width:170px;
            height: 170px;
            img{
                width: 100%;
            }
        }
    }
}
</style>