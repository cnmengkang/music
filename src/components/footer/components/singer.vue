<template>
    <div class="author flex flex-wrap-nowrap">
        <div class="author-avatar mr-15">
            <el-avatar shape="square" :size="50" :src="singer.singerAvatar" />
        </div>
        <div class="author-singer ellipsis">
            <p class="ellipsis">{{ singer.singerName }}</p>
            <template v-if="singer.singerAuthor">
                <span class="font-12" v-for="item in singer.singerAuthor" :key="item.id">{{ item.name }}</span>
            </template>
        </div>
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
    mounted() {

    },
    methods: {

    },
    computed: {},
};
</script>
<style lang="less" scoped>
.author {
    width: 100%;
}

.flex-wrap-nowrap {
    flex-wrap: nowrap
}
</style>