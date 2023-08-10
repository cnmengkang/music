import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Layout from "@/layout";
import dashboard from "@/views/dashboard";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "discover",
    children: [
      {
        path: "/discover",
        name: "Discover",
        component: () => import("@/views/discover"),
        meta: { label: "发现音乐" },
        children: [
          {
            path: "/discover",
            component: () => import("@/views/discover/recommend"),
            meta: { label: "个性推荐" },
          },
          {
            path: "/discover/daysong",
            name: "playlist",
            component: () => import("@/views/discover/daysong"),
            meta: { label: "每日推荐" },
          },
          {
            path: "/discover/playlist",
            name: "playlist",
            component: () => import("@/views/playlist"),
            meta: { label: "歌单" },
          },
          {
            path: "/discover/toplist",
            name: "topList",
            component: () => import("@/views/discover/topList/"),
            meta: { label: "排行榜" },
          },
          {
            path: "/discover/topsong",
            name: "TopSong",
            component: () => import("@/views/discover/topSong/"),
            meta: { label: "最新音乐" },
          },
        ],
      },
      {
        path: "/daysong",
        name: "DaySong",
        component: () => import("@/views/discover/daysong"),
        // 每日歌曲推荐
      },
      {
        path: "/detail/:id",
        name: "detail",
        component: () => import("@/views/discover/detail"),
      },
      // 发现音乐
      {
        path: "private",
        component: () => import("@/views/private"),
        name: "private",
      },
      // 私人fm
      {
        path: "my",
        component: () => import("@/views/my"),
        name: "my",
      },
      {
        path: "/recently",
        component: () => import("@/views/recently"),
        name: "recently",
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/search"),
      },
      {
        path: "/login",
        component: () => import("@/views/login/login"),
      },
      {
        path: "/edit",
        name: "edit",
        component: () => import("@/views/user/edit"),
      },
      {
        path: "/user/:uid",
        name: "user",
        component: () => import("@/views/user/user"),
        // 个性推荐详情页
      },
      {
        path: "/video/:name",
        component: () => import("@/views/videos"),
        name: "Video",
      },
    ],
  },
  // 视频
  {
    path: "/video",
    component: dashboard,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
      },
      {
        path: "videoDetail/:id",
        component: () => import("@/views/videos/videoDetail"),
        name: "videoDetail",
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
