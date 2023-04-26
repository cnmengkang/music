import { songUrl } from '@/api/music/music';
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
export default class MusicPlayer {
    constructor(options) {
        console.log(options)
        this.playlist = Object.assign(options.playList);
        this.audio = audioPool.get();
        this.currentTrackIndex = options.index;
        this.id = options.id
        this.audio.addEventListener("ended", () => {
            this.nextTrack();
        });
        this.currentForId(this.playlist, this.id)
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }

    loadTrack(url) {
        if (!url) return;
        this.audio.src = null;
        this.audio.src = url
        this.audio.load();
        this.play();
    }

    nextTrack() {
        this.currentTrackIndex =
            (this.currentTrackIndex + 1) % this.options.playlist.length;
        this.loadTrack(this.currentTrackIndex);
        this.play();
    }

    prevTrack() {
        this.currentTrackIndex =
            (this.currentTrackIndex - 1 + this.options.playlist.length) %
            this.options.playlist.length;
        this.loadTrack(this.currentTrackIndex);
        this.play();
    }

    setCurrentTime(seconds) {
        this.audio.currentTime = seconds;
    }

    setVolume(volume) {
        this.audio.volume = volume;
    }
    getCurrentMusicUrl(id) {
        songUrl(id).then(res => {
            const url = res.data[0].url;
            if (url) {
                this.loadTrack(url)
            }
        })
    }
    currentForId(options, id) {
        if (options) {
            for (let i = 0; i < options.length; i++) {
                const forId = this.playlist[i].id;
                if (forId == id) {
                    this.getCurrentMusicUrl(id);
                }
            }
        }
    }
}
