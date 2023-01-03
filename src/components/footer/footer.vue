<template>
    <div id="footer">
        <div class="audio_list" v-if="!musicInfo.musicUrl.length == 0">
            <div class="audio_img border-r-10 flex" @click="drawer = true">
                <div class="avatar">
                    <el-avatar  shape="square" :size="50" :src="musicInfo.avatar"></el-avatar>
                </div>
                <div class="audio_name ml-15">
                    <p>{{ musicInfo.name }}</p>
                    <template v-if="musicInfo.title">
                        <p>{{ musicInfo.title }}</p>
                        <p>{{ author}}</p>
                    </template>
                </div>
            </div>
            <div class="play">
                <div class="for">for</div>
                <div class="prev">上</div>
                <div class="prev">stop</div>
                <div class="prev">下</div>
                <div class="词"></div>
            </div>
            <div class="audio_sound">
                <div class="level">音质</div>
                <div>音效</div>
                <div class="currently_playing">
                    当前list
                </div>
            </div>
        </div>
        <audio duration controls autoplay :src="musicInfo.musicUrl" :type="musicInfo.musicType" style="display:none" />
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
        console.log(this.musicInfo)

    },
    // 计算属性
    computed: {
        ...mapState(['musicInfo']),
        author(){
            let author = this.musicInfo.title;
            author.map((item)=>{
                return item.name;
            })
        }
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