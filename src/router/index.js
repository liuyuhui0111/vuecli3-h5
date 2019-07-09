/* eslint-disable */
// 路由尽量与PC端保持一致  没有的新建 PC端有的要保持一致
// 路由尽量与PC端保持一致  没有的新建 PC端有的要保持一致
// 路由尽量与PC端保持一致  没有的新建 PC端有的要保持一致
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import childRoutes from '@/router/routes'
import {
  getToken,
  getUserInfo,
  goLogin,
  loginout,
} from '@/api/apis';
import {COMMON_REPLACE_URL,getUrlParam} from '@/assets/utils/util'
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
router.beforeEach(async (to, from, next) => {
  if(getUrlParam(COMMON_REPLACE_URL)){
    //COMMON
    replaceFn();
    return;
  }
  NProgress.start();
  store.commit('setFromRoute',from.path);
  if (getUrlParam('token')) {
    // 免密登录
    if(!store.getters.token){
      // 如果本地token 设置token
      store.commit('setToken',getUrlParam('token'));
      let res = await getUserInfo();  //获取用户信息
      if (res.data.code === '0000') {
        setUserFn(res);
      }
    }
    next();
    return;
  }

  if (to.meta.isNeedLogin && !store.getters.token) {
    // 是否需要登录 登录拦截
    if (!store.getters.token && !getUrlParam('code')) {
      // 如果需要登录 且没有code

      if (to.meta.loginBackPath) {
        // 如果配置了登录回退页，跳转到该页面 否则去登录页
        next({ path: to.meta.loginBackPath });
      } else {
        goLogin('login',to.fullPath);
      }
    } else if (!store.getters.token && getUrlParam('code')) {
      // 获取token  下一周期 执行init
      let res = await getToken({code:getUrlParam('code')});
      if(res.data.code === 0){
        let token = res.data.data['access_token'];
        store.commit('setToken',token);
        let userRes = await getUserInfo();  //获取用户信息
        if (userRes.data.code === '0000') {
          setUserFn(userRes);
          next();
        }
      }else{
        // 获取token失败直接去登录
        goLogin('login',to.fullPath);
      }
    }
    return;
  }
  next();
})

router.afterEach(async (to, from) => {
  if(document.title != to.meta.title){
    document.title = to.meta.title || ''
  }
  if (!to.meta.isHideShare) {
    // 如果不需要隐藏微信分享 调用微信分享
    vue.initWxShareFn();
  }
  NProgress.done();
})

function replaceFn(){
  // 登录回跳地址转换成hash路由
  let href = window.location.href.substring(0, window.location.href.length - 2);
    let host = href.split('?')[0];
    let queryList = href.split('?')[1].split('&');
    let query = '';
    let path = '';
    if(queryList.length>0){
      let i = -1;
      queryList.forEach((item,index)=>{
        if(item.indexOf(COMMON_REPLACE_URL)===0){
          // 
          path = decodeURIComponent(item.split('=')[1])
          i=index;
        }
      });
      if(i!=-1){
        queryList.splice(i,1);
      }
    }
    query = queryList.join('&');
    console.log(host+'#/'+path+'?'+query);
    if(query){
      window.location.href = host+'#/'+path+'?'+query;
    }else{
      window.location.href = host+'#/'+path
    }
}

function setUserFn(res){
  let user = res.data.leaguerList;
  store.commit('user/setUsers',user);
}

export default router