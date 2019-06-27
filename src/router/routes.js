const routes = [{
  title: '首页',
  name: 'index',
  path: '/index',
  meta: {
    isHideQuickNav: true,
    keepAlive: true,
  },
  view: () => import(/* webpackChunkName: "group-index" */ '@/views/index/index.vue'),
}, {
  title: '会员介绍',
  name: 'vipInfo',
  path: '/vipInfo',
  meta: {
    keepAlive: true,
  },
  view: () => import(/* webpackChunkName: "group-detail" */ '@/views/vipInfo/vipInfo.vue'),
}, {
  title: '公开课详情',
  name: 'openCoursesDetails',
  path: '/openCoursesDetails',
  meta: {
    isHideShare: true, // 隐藏全局通用分享，自定义分享内容
  },
  view: () => import(/* webpackChunkName: "group-detail" */ '@/views/openCourses/openCoursesDetails.vue'),
}, {
  title: '线上课详情',
  name: 'lineOfCoursesDetails',
  path: '/lineOfCoursesDetails',
  meta: {
    isHideShare: true, // 隐藏全局通用分享，自定义分享内容
  },
  view: () => import(/* webpackChunkName: "group-detail" */ '@/views/lineOfCourses/lineOfCoursesDetails.vue'),
}, {
  title: '全部课程',
  name: 'online',
  path: '/online',
  meta: {
    isHideQuickNav: true,
    keepAlive: true,
    wxShareTitle: '优税学院-全部课程',
  },
  view: () => import(/* webpackChunkName: "group-index" */ '@/views/allclass/online.vue'),
}, {
  title: '全部课程',
  name: 'offline',
  path: '/offline',
  meta: {
    isHideQuickNav: true,
    keepAlive: true,
    wxShareTitle: '优税学院-全部课程',
  },
  view: () => import(/* webpackChunkName: "group-index" */ '@/views/allclass/offline.vue'),
}, {
  title: '在线报名',
  name: 'signup',
  path: '/signup',
  view: () => import(/* webpackChunkName: "group-detail" */ '@/views/openCourses/signup.vue'),
}, {
  title: '报名成功',
  name: 'success',
  path: '/success',
  view: () => import(/* webpackChunkName: "group-detail" */ '@/views/openCourses/success.vue'),
}, {
  title: '最近学习',
  name: 'learnlist',
  path: '/learnlist',
  meta: {
    isHideQuickNav: true,
    isNeedLogin: true, // 登录拦截
  },
  view: () => import(/* webpackChunkName: "group-index" */ '@/views/learnlist/index.vue'),
}, {
  title: '我的',
  name: 'my',
  path: '/my',
  meta: {
    isHideQuickNav: true,
    keepAlive: true,
  },
  view: () => import(/* webpackChunkName: "group-index" */ '@/views/mycenter/index.vue'),
}, {
  title: '我的订单',
  name: 'myorder',
  path: '/myorder',
  meta: {
    isNeedLogin: true, // 登录拦截
  },
  view: () => import(/* webpackChunkName: "group-my" */ '@/views/mycenter/myorder.vue'),
}, {
  title: '我的收藏',
  name: 'mycol',
  path: '/mycol',
  meta: {
    isNeedLogin: true, // 登录拦截
  },
  view: () => import(/* webpackChunkName: "group-my" */ '@/views/mycenter/mycol.vue'),
}, {
  title: '我的预约报名',
  name: 'mysigin',
  path: '/mysigin',
  meta: {
    isNeedLogin: true, // 登录拦截
  },
  view: () => import(/* webpackChunkName: "group-my" */ '@/views/mycenter/mysigin.vue'),
}];
export default routes;
