import { songUrl } from '@/api/music/music'
const musicInfo = {
    state: {
        musicUrl: '', //音乐url
        musicLevel: '', //音乐音质
        musicMd5: '', //音乐加密
        musicType: '', //音乐类型
        // 底部战术信息
        name: '', //作者名
        avatar: '', //作者头像
        title: '', //歌名
        songInfo:'',
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
        // 存储播放音乐信息
        MUSIC_INFO: (state, musicInfo) => {
            state.musicUrl = musicInfo.url
            state.musicType = musicInfo.encodeType
            state.musicMd5 = musicInfo.md5
            state.musicLevel = musicInfo.level

        },
        SINGER_INFO:(state,singerInfo)=>{
            state.songInfo = singerInfo
        }
    },
    actions: {
        getSongUrl({ commit }, musicInfo) {
            console.log(musicInfo)
            const id = musicInfo.id;
            commit('SET_NAME',musicInfo.name)
            commit('SET_AVATAR',musicInfo.al.picUrl)
            commit('SET_SONG_TITLE',musicInfo.ar[0].name)
            return new Promise((resolve, reject) => {
                songUrl(id).then((res) => {
                    console.log(res);
                    commit('MUSIC_INFO', res.data[0])
                    resolve()
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
            })
        }
    }
}
export default musicInfo