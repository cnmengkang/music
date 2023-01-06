<template>
    <div class="author">
        <el-row :gutter="10" type="flex" align="middle">
            <el-col :span="6">
                <el-avatar shape="square" :size="50" :src="singer.singerAvatar"></el-avatar>
            </el-col>
            <el-col :span="18">
                <p>{{ singer.singerName }}</p>
                <template v-if="singer.singerAuthor">
                    <span class="font-12" v-for="item in singer.singerAuthor" :key="item.id">{{
                        item.name
                    }}</span>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        singer: {
            type: Object
        }
    },
    data() {
        return {
        };
    },
    created() { },
    mounted() { },
    methods: {},
    computed: {},
};
</script>
<style lang="less" scoped>

</style>