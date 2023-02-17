<template>
    <div class="result mt-30" v-if="result.length != 0">
        <div class="result-title">
            <h2 class="h2">搜索 "{{ title}}"</h2>
        </div>
        <div class="result-tabs">
            tabs
        </div>
        <div class="result-list">
            <!-- list列表组件 -->
            <song-list :tableDate="result"></song-list>
            <!-- list列表组件 -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import songList from '@/components/body/songlist'
export default {
    components: { songList },
    props: {

    },
    data() {
        return {
           
        };
    },
    created() {
    },
    mounted() { 
        this.getRouter()
    },
    computed: {
        ...mapState({
            result: state => state.search.SearchResult,
            total: state => state.search.total,
            title: state => state.search.title,
        })

    },
    methods: {
        // 搜索数据丢失返回上一页
        getRouter() {
            const title = this.title;
        },
        //选中页码触发
        CurrentChange(current){
            console.log(current)
        }
    },
};
</script>
<style lang="less" scoped>

</style>