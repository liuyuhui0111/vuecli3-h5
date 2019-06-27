/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters'
import {getTokenFn, setTokenFn} from '@/assets/utils/util'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		netWorkError:false,			//网络连接失败提示
		requestLoading:false,			//请求LOADING
		token:getTokenFn() ? getTokenFn() : '',		//token
		COMMON_COMP_DATA:{},
		fromRoute:'',			//来源路由path
	},
	getters: {},
	actions: {},
	mutations: {
	  setCopData(state,data){
	  	state.COMMON_COMP_DATA = JSON.parse(JSON.stringify(data));
	  },
	  setNetWork(state,flag){
	  	state.netWorkError = flag;
	  },
	  setLoading(state,flag){
	  	state.requestLoading = flag;
	  },
	  setFromRoute(state,path){
	  	state.fromRoute = path || '';
	  },
	  setToken(state,token) {
	  	// 设置token  同步到cookie 有效期默认7天
	  	//如果token不存在 默认清空token
	  	setTokenFn(token);
	    state.token = token;
	  },
	},
    modules: {
        user,
    },
    getters
});
