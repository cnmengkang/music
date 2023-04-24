import { songUrl, songDetail ,lyric} from '@/api/music/music';
const musicInfo = {
    state: {
        // 单曲音乐信息
        musicUrl: '', //音乐url
        musicLevel: '', //音乐音质
        musicMd5: '', //音乐加密
        musicType: '', //音乐类型
        musicTime: '',//音乐总时长
        // 底部展示信息
        name: '', //作者名
        avatar: '', //作者头像
        title: '', //歌名
        alia: '',
        id: '',//当前音乐id
        // 控制底部显示隐藏
        footerShow: false,
    },
    mutations: {
        // 存储当前单曲信息
        SINGLE_DETAIL(state, single) {
            state.title = single.al.name
            state.avatar = single.al.picUrl
            state.alia = single.alia
            state.name = single.ar
            state.id = single.id
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
        // 底部显示隐藏
        FOOTER_SHOW: (state, show) => {
            state.footerShow = show
        },
        // 歌词列表
        SET_LYRIC: (state, lyric) => {
            state.lyric = lyric
        }
    },
    actions: {
        // 获取当前音乐的播放地址并存储到state里面。
        async getCurrentMusicUrl({ commit }, id) {
            // console.log(id)
            const res = await songUrl(id);
            // console.log('url', res)
            commit('MUSIC_URL', res.data[0])
        },
        // 获取当前音乐的详细信息，并存储到state里面,供底部使用数据
        async getCurrentMusicDetail({ dispatch, commit }, ids) {
            // console.log('ids', ids)
            if (!ids) return;
            commit('FOOTER_SHOW', true)
            const detail = await songDetail(ids);
            const songs = detail.songs[0];
            const privileges = detail.privileges
            dispatch('getCurrentMusicUrl', ids)
            dispatch('getCurrentMusicLyric', ids)
            commit('SINGLE_DETAIL', songs)
        },
        // // 获取当前音乐的歌词
        getCurrentMusicLyric({ commit }, id) {
            return new Promise((resolve, reject) => {
                lyric(id).then(res => {
                    resolve()
                })
            })
        }
    }
}
export default musicInfo