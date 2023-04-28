import MusicPlayer from '@/utils/player'
const musicInfo = {
    state: {
        lyric: [],
        player: null,
        isOpen: false,
    },
    mutations: {
        IS_OPEN: (state, open) => {
            console.log(open)
            state.isOpen = open;
        },
        // 存储当前单曲信息
        SINGLE_DETAIL(state, name) {
            state.title = name
        },
        // 歌词列表
        SET_LYRIC: (state, lyric) => {
            state.lyric = lyric
        }
    },
    actions: {
        getCurrentMusicIsPlay({ state, commit }, data) {
            state.player.createAudio(data);
            console.log('点击加载的数据', state.player)
        },
        // 页面加载注册实例化对象;
        getLoadPlay({ state, dispatch, commit }) {
            state.player = new MusicPlayer();
        }
    }
}
export default musicInfo