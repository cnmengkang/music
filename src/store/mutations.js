export default {
    SEARCH_LIST: (state, data) => {
        state.cloudsearch.searchList = data;
    },
    SONG_COUNT: (state, count) => {
        state.cloudsearch.songCount = count;
    },
    SEARCH_TITLE: (state, title) => {
        state.cloudsearch.title = title;
    },
    USER_NAME(state, name) {
        state.nickName = name;
    },
    USER_AVATAR(state, avatar) {
        state.avatar = avatar;
    },
    USER_UID(state, userId) {
        state.uid = userId;
    },
    setIsLogin(state, data) {
        state.isLogin = data;
    },
    CLEAR_USER_INFO(state) {
        state.nickName = null
        state.avatar = null
        state.uid = null
        state.token = null
        state.isLogin = false;
    }
}