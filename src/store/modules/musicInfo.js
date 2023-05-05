import MusicPlayer from '@/utils/player';
import { checkMusic } from '@/api/music/music'
const musicInfo = {
    state: {
        lyric: [],
        player: null,
        isOpen: false,
        check: true
    },
    mutations: {
        IS_OPEN: (state, open) => {
            state.isOpen = open;
        },
        // 存储当前单曲信息
        SINGLE_DETAIL(state, name) {
            state.title = name
        },
        // 歌词列表
        SET_LYRIC: (state, lyric) => {
            state.lyric = lyric
        },
        CHECK_MUSIC_TRUE: (state, isTrue) => {
            state.check = isTrue
        }
    },
    actions: {
        getCurrentMusicIsPlay({ state,dispatch }, data) {
            state.player.createAudio(data);
            console.log('点击加载的数据', state.player)
        },
        // 页面加载注册实例化对象;
        getLoadPlay({ state }) {
            state.player = new MusicPlayer();
        },
    }
}
export default musicInfo