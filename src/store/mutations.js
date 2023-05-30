export default {
    SEARCH_LIST: (state, data) => {
        state.searchList = data;
    },
    SONG_COUNT: (state, count) => {
        state.songCount = count;
    },
    SEARCH_TITLE: (state, title) => {
        state.title = title;
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
}