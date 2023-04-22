<template>
    <div id="private-fm">
        私人fm
        <button @click="play">开始</button>
        <button @click="pause">暂停</button>
        <button @click="getClick">点击触发播放音乐功能</button>
        {{ player }}
        <div></div>
        <button v-if="player != null">{{ formatCurrentTime(player.currentTime) || "00:00" }}</button>
        <el-slider v-model="value" :format-tooltip="formatTooltip"></el-slider>
        <button v-if="player != null">{{ formatCurrentTime(player.duration) }}</button>
    </div>
</template>
<script>
import AudioPlayer from '@/utils/AudioPlayer'
export default {
    data() {
        return {
            player: null,
            currentTime: 0,
            src: 'http://m701.music.126.net/20230422165700/ce6691cb1b926772da9b07e8897e3d47/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/26289292769/6130/de88/5186/f0f6cd315f8ba2dc56e2ab145957e17a.flac'
        }
    },
    mounted() {
        
    },
    methods: {
        // 点击触发
        getClick() {
            this.player = new AudioPlayer(this.src);
        },
        play() {
            this.player.play();
        },
        pause() {
            this.player.pause();
        },
        // 格式化
        formatTooltip(val) {
            console.log(val)
            const date = new Date(val * 1000);
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            const seconds = date.getUTCSeconds().toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
    },
    computed: {
        value: {
            get() {
                return this.player != null ? this.player.currentTime : this.currentTime
            },
            set() {

            }
        }
    }
}
</script>

