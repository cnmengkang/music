export default {
    SEARCH_LIST: (state, data) => {
        state.searchList = data;
    },
    SONG_COUNT: (state, count) => {
        state.songCount = count;
    },
    SEARCH_TITLE: (state, title) => {
        state.title = title
    },
    // video
    setSignerMv(state, userinfo) {
        state.name = userinfo.artists[0].name
        state.avatar = userinfo.artists[0].img1v1Url
        state.duration = userinfo.duration
    },
    setSignerVideo(state, video) {
        state.name = video.creator.nickname
        state.avatar = video.creator.avatarUrl
        state.duration = video.durationms
    },
    setUrl(state, url) {
        state.url = url
    },
}