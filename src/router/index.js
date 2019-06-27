/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import childRoutes from '@/router/routes'
import {COMMON_REPLACE_URL} from '@/assets/utils/util'
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
  mode: 'hash',
  // base:process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_PATH,
  routes: routes
});
router.beforeEach((to, from, next) => {
  
   if(window.location.href.indexOf(COMMON_REPLACE_URL) !== -1){

    let href = window.location.href.substring(0, window.location.href.length - 2);
    let host = href.split('?')[0];
    let queryList = href.split('?')[1].split('&');
    let query = '';
    let path = '';
    if(queryList.length>0){
      let i = -1;
      queryList.forEach((item,index)=>{
        if(item.indexOf(COMMON_REPLACE_URL)===0){
          path = decodeURIComponent(item.split('=')[1])
          i=index;
        }
      });
      if(i!=-1){
        queryList.splice(i,1);
      }
    }
      query = queryList.join('&');
      // debugger
      console.log(host+'#/'+path+'?'+query);
      if(from.name){
        query = query + '&f=' + from.name
      }
    if(query){
      window.location.href = host+'#/'+path+'?'+query;
    }else{
      window.location.href = host+'#/'+path
    }
    
  }else{
    document.title = to.meta.title || '加载中...'
    NProgress.start();
    next();
  }
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router