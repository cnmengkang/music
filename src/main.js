import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'
import Cookies from 'js-cookie'
import '@/static/icon/icon.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/static/styles/style.css'
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
