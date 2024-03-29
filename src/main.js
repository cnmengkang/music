import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'
import Cookies from 'js-cookie'
import '@/static/icon/icon.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import '@/static/styles/style.css'
import '@/static/styles/reset.css'
import { Message } from 'element-ui';
// 全局css样式表
import { formatTime, playCount } from '@/utils/formdate'
// 中间件
// 全局方法挂载
// 时间日期格式化
Vue.prototype.$formatTime = formatTime
Vue.prototype.$playCount = playCount
Vue.prototype.$message = Message;
// 播放总量
Vue.config.productionTip = false;
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})
Vue.use(Element)
new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
