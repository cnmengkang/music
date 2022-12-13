import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// layout
import Layout from '@/layout'
const routes = [
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'index'
      },
      {
        path: 'discover',
        component: () => import('@/views/discoverMusic'),
        name: 'discover'
      },
      // 发现音乐
      {
        path: 'blog',
        component: () => import('@/views/blog'),
        name: 'blog'
      },
      {
        path: 'videos',
        component: () => import('@/views/videos'),
        name: 'videos'
      },
      // 视频
      {
        path: 'focus',
        component: () => import('@/views/focusOn'),
        name: 'focus'
      },
      // 关注
      {
        path: 'live',
        component: () => import('@/views/liveStreaming'),
        name: 'live'
      },
      // 直播
      {
        path: 'private',
        component: () => import('@/views/privateFM'),
        name: 'private'
      },
      // 私人fm
      {
        path: 'lovemusic',
        component: () => import('@/views/loveMusic'),
        name: 'lovemusic'
      },
      {
        path: "/about",
        name: 'about',
        component: () => import("@/views/About")
      },
      {
        path: "/home",
        name: 'home',
        component: () => import('@/views/Home')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/register',
    component: () => import('@/views/login/register')
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('token');
//     console.log(token)
//     if (token === 'null' || token === '') {
//       next('/login')
//     } else {
//       next();
//     }
//   }
// })
export default router;
