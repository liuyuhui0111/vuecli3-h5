/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import childRoutes from '@/router/routes'
import {
  goLogin,
} from '@/api/apis';

Vue.use(Router);


NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

const routeConfs = [
  {
    title: '404', name: '404', path: '*', view: () => import('@/views/404.vue'),
  },
  {
    title: '优税学院', name: 'default', path: '/', redirect: '/index',
  },
  {
    title: '优税学院', name: 'layout', path: '/layout', 
    view: () => import('@/views/layout.vue'),
    children:childRoutes
  },
  
];

function initRoutes(routers){
  let arr = [];
  routers.forEach(item => {
    let router = {
      path: item.path,
      name: item.name,
      redirect: item.redirect || '',
      children: item.children && item.children.length>0 ? initRoutes(item.children) : [],
       meta: { 
          title: item.title,
          ...item.meta
      }, 
      component: item.view
    }
    arr.push(router)
  })
  return arr
}

let routes = initRoutes(routeConfs);


let router = new Router({
  mode: 'history',
  base:process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_PATH,
  routes: routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '加载中...'
  NProgress.start();
  next();
})

router.afterEach((to, from) => {
  NProgress.done();
  // ...
})

export default router