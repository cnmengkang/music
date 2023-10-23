export default {
  // 搜索歌曲列表
  SEARCH_LIST: (state, data) => {
    state.cloudsearch.searchList = data;
  },
  // 搜送歌曲数量
  SONG_COUNT: (state, count) => {
    state.cloudsearch.songCount = count;
  },
  // 搜送歌曲标题
  SEARCH_TITLE: (state, title) => {
    state.cloudsearch.title = title;
  },
  // 用户名
  USER_NAME(state, name) {
    state.nickName = name;
  },
  // 用户头像
  USER_AVATAR(state, avatar) {
    state.avatar = avatar;
  },
  // 用户uid
  USER_UID(state, userId) {
    state.uid = userId;
  },
  // 是否登录
  SET_IS_LOGIN(state, data) {
    state.isLogin = data;
  },
  // 清除本地存储
  CLEAR_USER_INFO(state) {
    state.nickName = null;
    state.avatar = null;
    state.uid = null;
    state.token = null;
    state.isLogin = false;
  },
  // 扫码弹框
  SET_QR_LOGIN(state, data) {
    state.qrLogin = data;
  },
  DRAWER_OPEN(state, flag) {
    state.drawer = flag;
  },
  SET_LEFT_MENU(state,data){
    state.playList = data;
  }
};
