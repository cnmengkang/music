import { cloudsearch } from "@/api/search/search";
import { loginStatus, registerAnonimous, userPlaylist } from "@/api/user/user";
import { setUsername, setUserAvatar, setUserId } from "@/utils/auth";
export default {
  // 获取当前播放的音乐
  getCurrentMusicIsPlay({ state }, data) {
    state.player.createAudio(data);
  },
  // 音乐左下角头像点击弹框打开关闭
  drawerOpen({ commit, state }) {
    commit("DRAWER_OPEN", !state.drawer);
  },
  // 搜索结果
  async getCloudSearch({ commit }, data) {
    commit("SEARCH_TITLE", data.keywords);
    const { result } = await cloudsearch(data);
    commit("SONG_COUNT", result.songCount);
    commit("SEARCH_LIST", result.songs);
  },
  // 获取登录状态
  getLoginStatus({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      loginStatus().then((res) => {
        // 0登录成功
        if (res.data.account.status != 0) return;
        let result = res.data;
        setUsername(result.profile.nickname);
        setUserAvatar(result.profile.avatarUrl);
        setUserId(result.profile.userId);
        commit("USER_NAME", result.profile.nickname);
        commit("USER_AVATAR", result.profile.avatarUrl);
        commit("USER_UID", result.profile.userId);
        commit("SET_IS_LOGIN", true);
        dispatch("getLeftUserNav");
      });
    });
  },
  // 游客模式
  getRegisterAnonimous({ commit }) {
    return new Promise((resolve, reject) => {
      registerAnonimous().then((res) => {
        console.log(res);
      });
    });
  },
  // 左侧菜单动态渲染
  getLeftUserNav({ commit, state }) {
    userPlaylist(state.uid).then((res) => {
      commit('SET_LEFT_MENU',res.playlist)
    });
  },
};
