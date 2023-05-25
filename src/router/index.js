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
            component: () => import('@/views/discover/recommend'),
            // 个性推荐首页
          },
          {
            path: "/discover/customization",
            name: 'customization',
            component: () => import('@/views/discover/customization'),
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
          {
            path: "/discover/topsong",
            name: 'topSong',
            component: () => import('@/views/discover/topSong/')
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
      // 博客
      {
        path: 'private',
        component: () => import('@/views/private'),
        name: 'private'
      },
      // 私人fm
      {
        path: 'my',
        component: () => import('@/views/my'),
        name: 'my'
      },
      {
        path: '/recently',
        component: () => import('@/views/recently'),
        name: 'recently'
      },
      {
        path: 'search',
        component: () => import("@/views/search"),
        name: 'search',
        // 
      },
      // {
      //   path: '/login',
      //   component: () => import('@/views/login/login')
      // },
      {
        path: '/register',
        component: () => import('@/views/login/register')
      },
      {
        path: '/edit',
        component: () => import('@/views/user/edit')
      },
      {
        path: '/user/:uid',
        name: 'user',
        component: () => import("@/views/user/user")
        // 个性推荐详情页
      },
      {
        path: '/video/:name',
        component: () => import('@/views/videos'),
        name: 'video',
      },
    ]
  },
  // 视频
  {
    path: '/video',
    component: dashboard,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
      },
      {
        path: 'videoDetail/:id',
        component: () => import('@/views/videos/videoDetail'),
        name: 'videoDetail',
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
export default router;
