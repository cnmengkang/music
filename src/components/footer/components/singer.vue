<template>
    <div class="author flex flex-wrap-nowrap">
        <div class="author-avatar mr-15">
            <el-avatar shape="square" :size="50" :src="singer.avatar" />
        </div>
        <div class="author-singer ellipsis">
            <div class="ellipsis">
                <span>{{ singer.title }}</span>
                <span class="alia" v-if="singer.alia.length != 0">({{ singer.alia[0] }})</span>
            </div>
            <div class="mt-5">
                <span class="font-12" v-for="item in singer.name" :key="item.id">{{ item.name }}<span
                        v-if="item.length > 1">/</span></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        singer: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
        };
    }
};
</script>
<style lang="less" scoped>
.alia {
    color: #ccc;
}

.author {
    width: 100%;

    .author-avatar:hover {
        cursor: pointer;
        transition: all .2s linear;

        .el-avatar {
            opacity: 0.5;
        }
    }

}

.flex-wrap-nowrap {
    flex-wrap: nowrap;
}</style>