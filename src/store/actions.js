export default {
    getCurrentMusicIsPlay({ state }, data) {
        state.player.createAudio(data);
        console.log('点击加载的数据', state.player)
    },
    drawerOpen({ state }) {
        return state.player.drawer = !state.player.drawer;
    }
}