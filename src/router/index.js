import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// layout
import Layout from '@/layout'
import dashboard from '@/views/dashboard'
const routes = [
  {
    path: '',
    component: Layout,
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: () => import('@/views/discover'),
        name: 'discover',
        children: [
          {
            path: "/discover",
            name: 'recommend',
            component: () => import('@/views/discover/discover-recommend'),
            meta: { keepAlive: true }
            // 个性推荐首页
          },
          {
            path: "/discover/custom-made",
            name: 'custom-made',
            component: () => import('@/views/discover/custom-made'),
            meta: { keepAlive: true }
            // 专属定制
          },
          {
            path: '/discover/playlist',
            name: 'playlist',
            component: () => import("@/views/playlist")
            // 歌单
          },
          {
            path: "/discover/toplist",
            name: 'topList',
            component: () => import('@/views/discover/topList/')
            // 排行榜
          },
        ]
      },
      {
        path: '/recommend/detail/:id',
        name: 'detail',
        component: () => import("@/views/discover/detail")
        // 个性推荐详情页
      },
      {
        path: 'daysong',
        name: 'daysong',
        component: () => import("@/views/discover/daysong"),
        // 每日歌曲推荐
      },
      // 发现音乐
      {
        path: 'podcast',
        component: () => import('@/views/podcast'),
        name: 'podcast'
      },
      {
        path: 'video',
        component: () => import('@/views/videos'),
        name: 'video'
      },
      // 视频
      {
        path: 'friend',
        component: () => import('@/views/friend'),
        name: 'friend'
      },

      // 关注
      {
        path: 'live-streaming',
        component: () => import('@/views/live-streaming'),
        name: 'live-streaming'
      },
      // 直播
      {
        path: 'private',
        component: () => import('@/views/private-fm'),
        name: 'private'
      },
      // 私人fm
      {
        path: 'like-music',
        component: () => import('@/views/like-music'),
        name: 'like-music'
      },
      {
        path: 'search',
        component: () => import("@/views/search"),
        name: 'search',
        // 
      },
    ]
  },
  {
    path: '/video',
    component: dashboard,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard'
      },
      {
        path: 'videoPlay/:id',
        component: () => import('@/views/videos/video-play'),
        name: 'videoPlay'
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
  {
    path: '/qrCode',
    component: () => import('@/views/login/qrCode')
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
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
 
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
export default router;
