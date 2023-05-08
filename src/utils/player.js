import { songDetail, lyric, songUrl, checkMusic } from '@/api/music/music';
// 音频元素对象池
const audioPool = {
    pool: [], // 对象池
    get() { // 获取音频元素对象
        if (this.pool.length > 0) { // 如果对象池中有元素，则返回第一个元素
            return this.pool.shift();
        } else { // 如果对象池中没有元素，则创建新元素
            console.log('new Audio success')
            return new Audio();
        }
    },
    release(audio) { // 释放音频元素对象
        console.log('audio',audio)
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
        this.params = { id: 0, level: 'exhigh' }
        this.lyric = [];
        this.singer = null;
        this.isFooterShow = false;
        this.audio.addEventListener("ended", () => {
            console.log('当前播放结束');
            this.nextTrack();
        })
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.isFooterShow = true;
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
    // 创建音频
    createAudio(options) {
        this.index = options.index;
        this.playlist = options.playList;
        this.params.id = options.id;
        this.getCheckMusic();
    }
    // 播放
    isPlay(url) {
        if (!url) return;
        this.audio.src = url;
        this.audio.load();
        this.play();
    }
    // 下一首
    nextTrack() {
        this.index = this.index + 1;
        if (this.index == this.playlist.length) {
            console.log('=====')
            this.index = 0;
            this.params.id = this.playlist[this.index].id;
            this.getAllIsPlayInfo();
        } else {
            this.params.id = this.playlist[this.index].id;
            this.getAllIsPlayInfo();
        }
    }
    // 上一首
    prevTrack() {
        this.index = this.index - 1;
        if (this.index == -1) {
            this.index = 0;
            this.params.id = this.playlist[this.index].id;
        } else {
            this.params.id = this.playlist[this.index].id;
            this.getAllIsPlayInfo();
        }
    }
    // 设置当前播放时间
    setCurrentTime(seconds) {
        this.audio.currentTime = seconds;
    }
    // 设置音量
    setVolume(volume) {
        this.audio.volume = volume;
    }
    // 弹出层歌曲
    isOpen(isOpen) {
        this.isOpen = isOpen
    }
    // 获取当前播放歌曲url
    getCurrentMusicUrl() {
        songUrl(this.params).then(res => {
            const url = res.data[0].url;
            this.isPlay(url)
        })
    }
    // 歌词
    getCurrentMusicLyric() {
        lyric(this.params.id).then((res) => {
            // console.log(res)
            this.lyric = res.lrc.lyric
        })
    }
    // 左侧歌曲信息
    getCurrentMusicDetail() {
        songDetail(this.params.id).then((res) => {
            this.singer = res.songs[0];
        })
    }
    // 获取当前所有音乐播放信息
    getAllIsPlayInfo() {
        this.getCurrentMusicDetail();  //左侧歌曲信息
        this.getCurrentMusicLyric();  //歌词
        this.getCurrentMusicUrl();  //歌词
    }
    // 检测歌曲是否可播放
    // 检查音乐是否可用
    getCheckMusic() {
        checkMusic(this.params.id).then(res => {
            if (res.data.success) {
                console.log('音乐可用')
                this.getAllIsPlayInfo();
            } else {
                alert('无版权！')
            }
        })
    }
}
