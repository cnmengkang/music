<template>
    <div id="footer">
        <div class="audio_list" v-if="!musicInfo.musicUrl.length == 0">
            <div class="audio_img border-r-10" @click="drawer = true">
                <img class="border-r-10" :src="musicInfo.avatar">
            </div>
            <div class="audio_name">
                <p>{{ musicInfo.name }}</p>
                <p>{{ musicInfo.title }}</p>
            </div>
            <audio duration controls autoplay :src="musicInfo.musicUrl" :type="musicInfo.musicType" />
            <div class="audio_sound">
                <div class="level">音质</div>
                <div>音效</div>
                <div class="currently_playing">
                    当前list
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'footers',
    data() {
        return {
        }
    },
    mounted() {
        // console.log(this.musicInfo);
    },
    // 计算属性
    computed: {
        ...mapState(['musicInfo'])
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
#footer {
    .audio_list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0px 15px;

        .audio_img {
            width: 50px;
            height: 50px;
        }

        .audio_sound {
            display: flex;
            gap: 0px 20px;
            align-items: center;

        }
    }

    audio {
        width: 50%;
        margin: 0 auto;
    }
}
</style>