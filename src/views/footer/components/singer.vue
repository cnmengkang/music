<template>
    <div class="author flex flex-wrap-nowrap">
        <div class="author-avatar mr-15" @click="drawerOpen">
            <el-avatar shape="square" :size="50" :src="avatar" />
        </div>
        <div class="author-singer ellipsis">
            <div class="ellipsis font-14">
                <span>{{ songName }}</span>
                <span class="alia" v-if="subName">({{ subName }})</span>
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
        }
    },
    computed: {
        songName() {
            return this.singer.songName;
        },
        avatar() {
            return this.singer.authorAvatar
        },
        subName() {
            return this.singer.authorAli
        },
        authorName() {
            return [...this.singer.authorName.map(obj => obj.name)].join(' / ');
        }
    },
    methods: {
        drawerOpen() {
            this.$store.state.musicInfo.isOpen = !this.$store.state.musicInfo.isOpen;
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
}</style>