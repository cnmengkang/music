class AudioPlayer {
    constructor(src) {
        this.src = src;
        this.audio = new Audio(src);
        this.isPlaying = true;  //播放状态，默认不播放
        this.currentTime = 0;  //当前播放时长
        this.duration = 0; //总时长
        // 监听播放状态
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
        });
        // 监听播放状态暂停
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
        });
        // 当前音频播放时间
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
        });
        // 当前播放结束ended
        this.audio.addEventListener('ended', () => {
            console.log('ended')
        });
        // 浏览器准备好之后触发
        this.audio.addEventListener('canplay', () => {
            this.duration = this.audio.duration;
            console.log('准备完成');
        });
        this.audio.addEventListener('loadedmetadata',()=>{
            console.log('数据加载完成')
        })
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
}
export default AudioPlayer
