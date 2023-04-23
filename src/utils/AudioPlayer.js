class AudioPlayer {
    constructor(src) {
        this.audio = new Audio();
        this.currentTime = 0;  //当前播放时长
        this.volume = 0.5; //音频声音
        this.duration = 0;
        // 当前音频播放时间
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
        });

        // 浏览器准备好之后触发
        this.audio.addEventListener('canplay', () => {
            this.duration = this.audio.duration
            console.log('浏览器加载完成');
        });
        this.audio.addEventListener('loadedmetadata', () => {
            console.log('数据加载完成');
            this.src = src
            this.play();
        });
        // 当前播放结束ended
        this.audio.addEventListener('ended', () => {
            console.log('播放结束')
        });
    }
    // 播放
    play(url) {
        console.log('124')
        this.audio.src = url;
        this.audio.play();
    }
    // 暂停
    pause() {
        this.audio.pause();
    }
    // 获取当前播放时间
    getCurrentTime() {
        return this.audio.currentTime;
    }
    // 获取总时长
    getDuration() {
        return this.duration;
    }
}

export default AudioPlayer
