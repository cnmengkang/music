<template>
    <div class="author flex flex-wrap-nowrap">
        <div class="author-avatar mr-15" @click="drawerOpen">
            <el-avatar shape="square" :size="50" :src="avatar" />
        </div>
        <div class="author-singer ellipsis">
            <div class="ellipsis">
                <span>{{ name }}</span>
                <span class="alia" v-if="subtitle">({{ subtitle }})</span>
            </div>
            <div class="mt-5">
                <span class="font-12">{{ authorName }}</span>
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
    },
    computed: {
        name() {
            return this.singer.name;
        },
        avatar() {
            return this.singer.al.picUrl
        },
        subtitle() {
            return this.singer.alia[0]
        },
        authorName() {
            return this.singer.ar[0].name
        }
    },
    methods: {
        drawerOpen() {
            this.$store.commit('IS_OPEN', true);
        }
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
}
</style>