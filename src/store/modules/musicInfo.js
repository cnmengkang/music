import { songUrl, songDetail } from '@/api/music/music'
import { playTrack } from '@/api/discover/detail';
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
        // 歌曲列表
        songList: '',
        total: '',
        searchList: [],
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
        SEARCH_LIST: (state, list) => {
            state.total = list.total
            state.searchList = list.songs
        },
        // 全部播放按钮数据
        SONG_LIST: (state, list) => {
            console.log('全部播放按钮数据', list)
        }
    },
    actions: {
        /*
            获取当前播放歌曲信息
            详情页面list双击传过来单首歌曲信息
            存储到state里面,发送请求获取歌曲的播放链接进行播放;
        */
        async getCurrentMusicUrl({ commit }, id) {
            console.log(id)
            const res = await songUrl(id);
            commit('MUSIC_URL',res.data[0])
            console.log('url', res)
        },
        // 获取当前音乐的详细信息
        async getCurrentMusicDetail({ dispatch, commit }, ids) {
            console.log('ids', ids)
            const detail = await songDetail(ids);
            const songs = detail.songs[0];
            const privileges = detail.privileges
            dispatch('getCurrentMusicUrl', ids)
            commit('SINGLE_DETAIL', songs)
        },
        // 点击播放全部按钮进行顺序播放音乐
        getPlayAll({ commit }, id) {
            console.log('id', id)
            return new Promise((resolve, reject) => {
                playTrack({ id }).then(res => {
                    commit('SONG_LIST', res.songs)
                })
            })
        },
    }
}
export default musicInfo