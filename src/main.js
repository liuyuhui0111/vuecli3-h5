

import Vue from 'vue';
import './cube-ui';
import store from './store';
import router from './router';
import './axios';
import mixin from './mixin';

import App from './App.vue';
// swiper 样式文件
/* eslint-disable */
import '@/plugins/swiper/swiper.css';

import COMMON_ENV from '@/config/env';
import VueLazyload from 'vue-lazyload';
import 'amfe-flexible'
/* eslint-enable */
// 全局公共样式文件,element-ui,swiper 样式调整文件
require('@/assets/styles/common.css');
require('@/assets/styles/reset-swiper.css');

/* eslint-disable */
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/imgs/error.png'),
    loading: require('./assets/imgs/loadding.png'),
    attempt: 1,
});

/* eslint-enable */
Vue.use(mixin);

Vue.config.productionTip = false;
window.vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

window.COMMON_ENV = COMMON_ENV;
