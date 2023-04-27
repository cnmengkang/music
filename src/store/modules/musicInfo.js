import { songDetail, lyric } from '@/api/music/music';
import MusicPlayer from '@/utils/player'
const musicInfo = {
    state: {
        // 单曲音乐信息
        musicUrl: '', //音乐url
        level: 'exhigh', //音乐音质
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
        lyric: [],
        player: null,
    },
    mutations: {
        // 存储当前单曲信息
        SINGLE_DETAIL(state, single) {
            console.log(single)
            // state.title = single.name
            // state.avatar = single.al.picUrl
            // state.alia = single.alia
            // state.name = single.ar
            // state.id = single.id
        },
        // 歌词列表
        SET_LYRIC: (state, lyric) => {
            state.lyric = lyric
        }
    },
    actions: {
        getCurrentMusicIsPlay({ state, commit }, data) {
            state.player.loadTrack(data);
            console.log('点击加载的数据', state.player)
            commit('SET_LYRIC', state.player.lyric);
            console.log(state.player.singer)
        },

        // 页面加载注册实例化对象;
        getLoadPlay({ state, dispatch, commit }) {
            state.player = new MusicPlayer();
        }
    }
}
export default musicInfo