import { songUrl, lyric } from '@/api/music/music'
const musicInfo = {
    state: {
        // 单曲音乐信息
        musicUrl: '', //音乐url
        musicLevel: '', //音乐音质
        musicMd5: '', //音乐加密
        musicType: '', //音乐类型
        musicTime: '',//音乐总时长
        // 底部战术信息
        name: '', //作者名
        avatar: '', //作者头像
        title: '', //歌名
        id: '',//当前音乐id
        // 单曲作者信息
        singerName: '',
        singerAvatar: '',
        // 歌词
        lyric: [],
        isPlay: false
    },
    mutations: {
        // 歌手姓名
        SET_NAME: (state, name) => {
            state.name = name
        },
        // 歌手头像
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        // 歌曲名
        SET_SONG_TITLE: (state, title) => {
            state.title = title
        },
        // 存储播放音乐的url信息
        MUSIC_URL: (state, musicUrl) => {
            state.musicUrl = musicUrl.url
            state.musicType = musicUrl.encodeType
            state.musicMd5 = musicUrl.md5
            state.musicLevel = musicUrl.level
            state.id = musicUrl.id
            state.musicTime = musicUrl.time
        },
        SINGER_INFO: (state, singer) => {
            state.singerName = singer.name
            state.singerAvatar = singer.al.picUrl
            state.singerAuthor = singer.ar
        },
        MUSIC_LYRIC: (state, lyric) => {
            state.lyric = lyric.lyric
        },
        // 播放状态
        iSPLAY: (state, isPlay) => {
            state.isPlay= isPlay
        }
    },
    actions: {
        /*
            获取当前播放歌曲信息
            详情页面list双击传过来单首歌曲信息
            存储到sate里面,发送请求获取歌曲的播放连接进行播放;
        */
        getSongInfo({ commit }, musicInfo) {
            const id = musicInfo.id;
            commit('SINGER_INFO', musicInfo)
            return new Promise((resolve, reject) => {
                songUrl(id).then((res) => {
                    console.log('songUrl', res)
                    commit('MUSIC_URL', res.data[0])
                    resolve()
                })
                lyric(id).then(res => {
                    console.log('lyric', res)
                    commit('MUSIC_LYRIC', res.lrc)
                })
            })
        },
    }
}
export default musicInfo