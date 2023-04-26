
// 音频元素对象池
const audioPool = {
    pool: [], // 对象池
    get() { // 获取音频元素对象
        if (this.pool.length > 0) { // 如果对象池中有元素，则返回第一个元素
            return this.pool.shift();
        } else { // 如果对象池中没有元素，则创建新元素
            return new Audio();
        }
    },
    release(audio) { // 释放音频元素对象
        audio.pause(); // 暂停音频播放
        audio.src = ''; // 清空音频地址
        this.pool.push(audio); // 将元素对象加入对象池中
    }
};
// 封装音频播放器类
class AudioPlayer {
    constructor() {
        this.audio = audioPool.get(); // 从对象池中获取音频元素对象
        this.volume = 1; // 设置默认音量max=1
        this.isPlaying = false; // 是否正在播放
        this.duration = 0; // 音频总时长
        this.currentTime = 0; // 当前播放时间
        // this.playList = playList;
        // 资源加载完成
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
        });
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
        });
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
        });
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
        });
        this.audio.addEventListener('ended', () => {
            console.log('ended');
            this.isPlaying = false;
            this.next();
        });
    }
    // 更新音乐src
    isPlayUrl(url) {
        if (!url) return;
        this.audio.src = url;
        this.audio.load();
        this.play();
    }
    // 开始播放
    play() {
        this.audio.play();
    }
    // 暂停播放
    pause() {
        this.audio.pause();
    }
    // 下一首
    next() {
        console.log('下一首')
    }
    prev() {
        console.log('上一首')
    }
    // 音量
    setVolume(volume) {
        this.audio.volume = volume;
        this.volume = volume;
    }
}
export default AudioPlayer