import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// layout
import Layout from '@/layout'
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
            // 个性推荐首页
          },
          {
            path: "/discover/custom-made",
            name: 'custom-made',
            component: () => import('@/views/discover/custom-made')
            // 专属定制
          },
          {
            path: "/discover/toplist",
            name: 'topList',
            component: () => import('@/views/discover/topList/')
            // 排行榜
          }
        ]
      },
      {
        path: '/recommend/detail/:id',
        name: 'detail',
        component: () => import("@/views/discover/detail")
        // 个性推荐详情页
      },
      // 发现音乐
      {
        path: 'blog',
        component: () => import('@/views/blog'),
        name: 'blog'
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
export default router;
