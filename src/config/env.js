
/* eslint-disable */
let COMMON_ENV = {
  SSO_URL: 'http://test.5ifapiao.com:8888', // 单点登录相关地址
};

if (process.env.VUE_APP_ENV === 'production') {
	// 生产环境
  COMMON_ENV.SSO_URL = 'https://sso.ele-cloud.com';

} else if (process.env.VUE_APP_ENV === 'development') {
	// 开发环境
  // COMMON_ENV.SSO_URL = 'http://ysxy.5ifapiao.com:8888';
  COMMON_ENV.SSO_URL = 'http://test.5ifapiao.com:8888';
  
} else if (process.env.VUE_APP_ENV === 'test') {
	// 测试环境
	// COMMON_ENV.SSO_URL = 'http://apptest.5ifapiao.com';
	COMMON_ENV.SSO_URL = 'http://test.5ifapiao.com:8888';
}else if (process.env.VUE_APP_ENV === 'pre') {
	// 预发环境
	// COMMON_ENV.SSO_URL = 'http://apptest.5ifapiao.com';
	COMMON_ENV.SSO_URL = 'https://sso-pre.ele-cloud.com';
}

export default COMMON_ENV;
