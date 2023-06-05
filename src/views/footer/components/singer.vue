<template>
    <div class="author flex flex-wrap-nowrap">
        <div class="author-avatar mr-10" @click="drawerOpen">
            <el-avatar shape="square" :size="50" :src="authorAvatar" />
        </div>
        <div class="author-singer">
            <div class="font-14 author-flex">
                <div class="ellipsis">
                    <span>{{ songName }}</span>
                    <span class="alia" v-if="subName">({{ subName }})</span>
                </div>
                <div class="like ml-10 mr-10">
                    <span>❤</span>
                </div>
            </div>
            <div class="mt-5 ellipsis" :title="authorName">
                <span class="font-12">{{ authorName }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { mapActions, } from 'vuex';
export default {
    computed: {
        ...mapState({
            player: state => state.player,
            songName: state => state.player.singer.songName,
            authorAvatar: state => state.player.singer.authorAvatar,
            subName: state => state.player.singer.subName,
            author: state => state.player.singer.authorName
        }),
        authorName() {
            return [...this.author.map(obj => obj.name)].join('/');
        }
    },
    methods: {
        ...mapActions(['drawerOpen'])
    }
}
</script>
<style lang="less" scoped>
.alia {
    color: #ccc;
}

.author {
    width: 100%;

    .author-flex {
        display: flex;
    }

    .author-singer {
        width: 80%;
    }

    .author-avatar {
        &:hover {
            cursor: pointer;
            transition: all .2s linear;
            opacity: .5;
        }
    }

}

.flex-wrap-nowrap {
    flex-wrap: nowrap;
}
</style>