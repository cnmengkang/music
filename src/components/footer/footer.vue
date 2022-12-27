<template>
    <div id="footer"  @click="getURl">
        <div class="audio_list">
            <div class="audio_img border-r-10" @click="drawer = true">
                <img class="border-r-10" :src="al.picUrl" :alt="al.name">
            </div>
            <div class="audio_name">
                <p>{{ al.name }}</p>
                <p>{{ ar.name }}</p>
            </div>
            <audio duration controls autoplay :src="audioList.url" :type="audioList.encodeType" />
            <div class="audio_sound">
                <div class="level">音质</div>
                <div>音效</div>
                <div class="currently_playing">
                    当前list
                </div>
            </div>
        </div>
        <el-drawer title="我是标题" style="position:absolute;bottom:-55px;" size modal-append-to-body="false"   :visible.sync="drawer" :direction="direction" :before-close="handleClose">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>
<script>
import { songUrl } from '@/api/url/url'
export default {
    name: 'footers',
    data() {
        return {
            al: '', //歌曲数据(图片,歌曲名)
            ar: '',//歌曲数据(作者)
            audioList: '',  //根据id获取歌曲参数(url，mp3)
            direction:'btt',
            drawer:false
        }
    },
    created() {
    },
    methods: {
        getURl() {
            console.log('playlist', this.$store.state.user.playlist)
            const list = this.$store.state.user.playlist
            const urlId = list.id;
            this.al = list.al;  //歌曲数据(图片,歌曲名)
            this.ar = list.ar[0] //歌曲数据(作者)
            console.log(urlId)
            this.getPlayList(urlId)

        },
        getPlayList(id) {
            songUrl(id).then((res) => {
                console.log(res.data[0])
                this.audioList = res.data[0] //根据id获取歌曲参数(url，mp3)
            })
        },
        // 播放按钮
        getPlay() {
            console.log('播放')
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        }
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
            width: 60px;
            height: 60px;
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