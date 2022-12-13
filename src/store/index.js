import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     name: '坤坤',
//     age: 2.5,
//     city: '中国',
//     count: 0
//   }, //数据 相当于data
//   mutations: {
//     addCount(state, num) {
//       state.count += state.count + num
//     },
//     reduce(state) {
//       state.count--
//     }
//   },//方法,操作state
//   actions: {
//     asyncAdd(context) {
//       setTimeout(() => {
//         context.commit('reduce')
//       }, 1000)
//     }
//   },//操作异步的
//   getter: {},//类似vue中的computed进行缓存，对store中的数据进行加工处理，形成新的数据
//   modules: {},
// });
const store = new Vuex.Store({
  modules:{
    user
  }
})

export default store
