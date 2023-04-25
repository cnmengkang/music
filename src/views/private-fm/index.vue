<template>
    <div>
        <audio ref="audio" @ended="next" :src="currentSong.url"></audio>
        <button @click="prev">上一首</button>
        <button @click="play">播放</button>
        <button @click="pause">暂停</button>
        <button @click="next">下一首</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            playlist: [
                { title: '歌曲 1', artist: '艺术家 1', url: 'http://m7.music.126.net/20230425181411/68ba0eb421ae834acead58971a93c1c1/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3' },
                { title: '歌曲 2', artist: '艺术家 2', url: 'http://m7.music.126.net/20230425181411/68ba0eb421ae834acead58971a93c1c1/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3' }
            ],
            currentIndex: 0,
            isPlaying: false
        };
    },
    computed: {
        currentSong() {
            return this.playlist[this.currentIndex];
        }
    },
    methods: {
        play() {
            this.$refs.audio.play();
            this.isPlaying = true;
        },
        pause() {
            this.$refs.audio.pause();
            this.isPlaying = false;
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
            this.play();
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
            this.play();
        }
    }
};
</script>
  