import { songDetail, lyric, songUrl, checkMusic } from '@/api/music/music';
// 音频元素对象池
const audioPool = {
    pool: [], // 对象池
    get() { // 获取音频元素对象
        if (this.pool.length > 0) {
            return this.pool.shift();
        } else {
            console.log('new Audio success')
            return new Audio();
        }
    },
    release(audio) { // 释放音频元素对象
        console.log('audio', audio)
        audio.pause();
        audio.src = '';
        this.pool.push(audio);
    }
}
export default class MusicPlayer {
    constructor() {
        this.audio = audioPool.get();
        this.playlist = [];
        this.index = 0;
        this.currentTime = 0;
        this.duration = 0;
        this.isPlaying = false;
        this.drawer = false;
        this.params = { id: 0, level: 'exhigh' }
        this.lyric = [];
        this.singer = {
            authorName: '',
            authorAvatar: '',
            songName: '',
            authorAli: ''
        };
        this.isFooterShow = false;
        this.audio.addEventListener("ended", () => {
            console.log('当前播放结束，自动播放下一首');
            this.getPrevNext('next');
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
        this.playlist = options.data
        this.params.id = this.playlist[this.index].id;
        this.getCheckMusic();
    }
    // 播放
    isPlay(url) {
        if (!url) return;
        this.audio.src = url;
        this.audio.load();
        this.play();
    }
    getPrevNext(player) {
        player == 'prev' ? this.index-- : this.index++;
        if (this.index == -1 || this.index == this.playlist.length) this.index = 0;
        this.params.id = this.playlist[this.index].id;
        this.getAllIsPlayInfo();
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
        this.isOpen = isOpen;
    }
    // 获取当前播放歌曲url
    async getCurrentMusicUrl() {
        const { data } = await songUrl(this.params);
        this.isPlay(data[0].url);
    }
    // 歌词
    async getCurrentMusicLyric() {
        const { lrc } = await lyric(this.params.id);
        this.lyric = lrc.lyric;
    }
    // 左侧歌曲信息
    async getCurrentMusicDetail() {
        const { songs } = await songDetail(this.params.id);
        this.singer.songName = songs[0].name;
        this.singer.authorAvatar = songs[0].al.picUrl;
        this.singer.authorName = songs[0].ar;
        this.singer.authorAli = songs[0].alia[0];
    }
    // 获取当前所有音乐播放信息
    getAllIsPlayInfo() {
        this.getCurrentMusicDetail();  //左侧歌曲信息
        this.getCurrentMusicLyric();  //歌词
        this.getCurrentMusicUrl();  //url
    }
    // 检测歌曲是否可播放
    // 检查音乐是否可用
    async getCheckMusic() {
        const { data } = await checkMusic(this.params.id);
        if (!data.success) console.log('无版权!');
        this.getAllIsPlayInfo();
    }
}
