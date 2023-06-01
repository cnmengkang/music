import { songDetail, lyric, songUrlV1, checkMusic, playTrackAll } from '@/api/music/music';
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
        this.playSong = '';
        this.params = { id: 0, level: 'exhigh' }
        this.lyric = [];
        this.isFooterShow = false;
        this.singer = {
            authorName: '',
            authorAvatar: '',
            songName: '',
            authorAli: ''
        };
        this.audio.addEventListener("ended", () => {
            console.log('当前播放结束，自动播放下一首');
            this.getPrevNext('next');
        })
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.isPlaying = true;
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
        console.log(options)
        this.index = options.index;
        this.params.id = options.ids;
        if (options.play) {
            this.getPlayTrackAll()
        } else {
            this.playlist = options.playlist
            this.params.id = this.playlist[this.index].id;
            this.getCheckMusic();
        }
    }
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
        this.getCheckMusic();
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
    getCurrentMusicPlayDetail() {
        songDetail(this.params.id).then(res => {
            const songs = res.songs;
            this.singer.songName = songs[0].name;
            this.singer.authorAvatar = songs[0].al.picUrl;
            this.singer.authorName = songs[0].ar;
            this.singer.authorAli = songs[0].alia[0];
        })
        // 左侧歌曲信息
        songUrlV1(this.params).then(res => {
            this.isPlay(res.data[0].url)
        })
        // 获取当前播放歌曲url
        lyric(this.params.id).then(res => {
            this.lyric = res.lrc.lyric;
        })
        // 歌词
    }
    // 检查音乐是否可用
    async getCheckMusic() {
        const res = await checkMusic(this.params.id);
        if (!res.success) {
            console.log('无版权!自动跳到下一首')
            this.getPrevNext('next');
        } else {
            this.getCurrentMusicPlayDetail();
        }
    }
    // 获取当前播放歌曲id
    getPlayTrackAll() {
        playTrackAll(this.params).then(res => {
            this.playlist = res.songs
            this.params.id = this.playlist[this.index].id;
            console.log(res)
            this.getCheckMusic();
        })

    }
}
