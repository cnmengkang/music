import { songDetail, lyric, songUrl } from '@/api/music/music';
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
}
export default class MusicPlayer {
    constructor() {
        this.audio = audioPool.get();
        this.playlist = [];
        this.index = 0;
        this.currentTrackIndex = 0;
        this.currentTime = 0;
        this.duration = 0;
        this.isPlaying = false;
        this.volume = 1;
        this.params = { id: 0, level: 'exhigh' }
        this.lyric = [];
        this.singer = [];
        this.audio.addEventListener("ended", () => {
            this.nextTrack();
        })
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
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    loadTrack(options) {
        console.log('player', options)
        this.playlist = options.playList;
        this.params.id = options.id;
        this.index = options.index;
        this.getAllIsPlayInfo();
    }
    isPlay(url) {
        if (!url) return;
        this.audio.src = url;
        this.audio.load();
        this.play();
    }
    nextTrack() {
        this.index = this.index + 1;
        this.params.id = this.playlist[this.index].id;
        this.getAllIsPlayInfo();
    }
    prevTrack() {
        this.index = this.index - 1;
        this.params.id = this.playlist[this.index].id;
        this.getAllIsPlayInfo();
    }
    setCurrentTime(seconds) {
        this.audio.currentTime = seconds;
    }
    setVolume(volume) {
        this.audio.volume = volume;
    }
    // 获取当前播放歌曲url
    getCurrentMusicUrl() {
        songUrl(this.params).then(res => {
            const url = res.data[0].url;
            console.log('url Success')
            this.isPlay(url);
        })
    }
    // 歌词
    getCurrentMusicLyric() {
        lyric(this.params.id).then((res) => {
            this.lyric = res.lrc.lyric
        })
    }
    // 左侧歌曲信息
    getCurrentMusicDetail() {
        songDetail(this.params.id).then((res) => {
            this.singer = res.songs;
        })
    }
    getAllIsPlayInfo() {
        this.getCurrentMusicDetail();  //左侧歌曲信息
        this.getCurrentMusicLyric();  //歌词
        this.getCurrentMusicUrl();  //歌词
    }
}
