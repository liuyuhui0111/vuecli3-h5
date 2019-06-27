import Vue from 'vue';
import Axios from 'axios';
// import qs from 'qs';
import store from './store';
import {
  replaceCode,
} from '@/assets/utils/util';
import COMMON_ENV from '@/config/env';

const axios = Axios.create({
  timeout: 1000 * 60, // 超时时间60s
  // baseURL: '',
  withCredentials: false, // 跨域请求时，允许其他域设置自身站点下的cookie
  cache: false,
});

let COMMON_LOADING = null;
let requestList = [];
/* eslint-disable */
/**
      * 全局请求拦截器
*/
axios.interceptors.request.use(
    (config) => {
      if(!navigator.onLine && !store.getters.netWorkError){
       // 网络中断  切不在提示状态的时候
         store.commit('setNetWork',true);
         clearTimeout(timer);
         let timer = setTimeout(()=>{
            store.commit('setNetWork',false);
         },2000);
         return;
      }
        config.headers.Authorization = store.getters.token ? store.getters.token : '-1';
        config.headers.httpHost = window.location.host || '';
        if(process.env.NODE_ENV === 'development'){
          config.headers.httpHost = process.env.VUE_APP_HOST;
        }

        // config.headers.httpHost = "test.5ifapiao.com:8888";
        if(!config.isHideLoading && config.method !== 'get'){
          // 如果不为true 请求提示loadding
          requestList.push(config.url);
          if(!COMMON_LOADING){
            COMMON_LOADING = true;
            store.commit('setLoading',true);
          }
        }else{

        }
        // 添加headers "application/x-www-form-urlencoded"
        //如果是formdata格式 自动格式化数据
        if(config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {

          if(window.FormData){
            const formData = new FormData();
            let data = config.data
            for(let key in data){
              formData.append(key,data[key])
            }
            config.data = formData
            // config.data = qs.stringify(config.data);
          }else{
            // config.headers['Content-Type'] === 'application/json';
            console.log('不支持formdata')
          }
        }

        return config;
    }, (error) => {
        if (process.env.NODE_ENV === 'development') {
            return Promise.reject(error)
        }else{
            return Promise.reject('请求出错，请稍后再试')
        }
    },
);

/**
      * 全局响应拦截器
*/
axios.interceptors.response.use(
    (response) => {
            if(COMMON_LOADING){

              requestList.forEach((item,index)=>{
                if(item === response.config.url){
                  requestList.splice(index,1);
                }
              })
              if(requestList.length<1){
                store.commit('setLoading',false);
                COMMON_LOADING = null;
              }

            }
            // console.log('token::::::::',store.getters.token,'code::::::::',response.data.code)
            if(response.data.code === '0002' && store.getters.token){
              // 登录过期
              store.commit('setToken','');
              // 退出登录
              const REDIRECT_URI = encodeURIComponent(replaceCode());
              window.localStorage.setItem('REDIRECT_URI', replaceCode());
              const url = `/course_authentication/h5/logout?redirect_uri=${REDIRECT_URI}`;
              window.location.replace(COMMON_ENV.SSO_URL + url);
            }
            return response;
    },
    (error) => {
      console.log(error)
          if(COMMON_LOADING){
              requestList.forEach((item,index)=>{
                if(item === error.config.url){
                  requestList.splice(index,1);
                }
              })
              if(requestList.length<1){
                store.commit('setLoading',false);
                COMMON_LOADING = null;
              }
            }
        if (process.env.NODE_ENV === 'development') {
          return Promise.reject(error);
        }else{
          return Promise.reject('请求出错，请稍后再试');
        }

    },
);
/* eslint-enable */
Vue.prototype.$http = axios;
// window.$http = axios
export default axios;
