import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'
import Cookies from 'js-cookie'

import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;
Vue.use(Element)
new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
