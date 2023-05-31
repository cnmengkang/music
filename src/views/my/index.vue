<template>
  <div class="my">
    Fm
    <ul>
      <li v-for="item in playlist" :key="item.id">
        {{ item.name }}--{{ item.id }}
      </li>
    </ul>
  </div>
</template>
<script>
import { userPlaylist } from '@/api/user/user';
export default {
  data() {
    return {
      list: [],
      id: 0,
      creator: {},
      playlist: '',
      params: {
        uid: this.$store.state.uid
      }
    };
  },
  mounted() {
    this.getUserPlaylist();
  },
  methods: {
    getUserPlaylist() {
      userPlaylist(this.params).then(res => {
        console.log(res.playlist)
        this.playlist = res.playlist
      })
    },
    getDetail(id) {
      this.$router.push({ name: 'detail', params: { id: ids } })
    },
  },
}
/*登录逻辑 
  1.用户扫码登录，true = 存储用户信息保存token userId
  2.根据userId 生成左侧菜单数据。
*/
</script>
<style lang="less" scoped></style>
