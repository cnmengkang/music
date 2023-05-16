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
            state.title = name;
        },
        // 歌词列表
        SET_LYRIC: (state, lyric) => {
            state.lyric = lyric;
        },
    },
    actions: {
        getCurrentMusicIsPlay({ state, dispatch }, data) {
            state.player.createAudio(data);
            console.log('点击加载的数据', state.player)
        },
    }
}
export default musicInfo;