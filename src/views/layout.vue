<template>
  <div class="layout">
    <router-view></router-view>
    <!-- 首页底部导航 -->
    <FootNav></FootNav>

    <!-- 返回顶部 -->
    <BackTop></BackTop>

    <!-- 网络连接出错 -->
    <div v-if="netWorkError" class="network-error">
      <i class="icon-neterror"></i>
      网络连接出错
    </div>
    <!-- 请求loadding -->
    <div v-if="requestLoading" class="request-loading">
      <div class="loading-box">
        <cube-loading :size="40"></cube-loading>
      </div>
    </div>
    <!-- 快捷导航 -->
    <quickNav></quickNav>

  </div>
</template>
<script>
import FootNav from '@/views/components/foot-nav.vue';
import {
  getSourceData,
} from '@/api/apis';
import quickNav from '@/views/components/quickNav.vue';

export default {
  name: 'index',
  data() {
    return {
      name: 'common-layout',
      showFootNavPath: ['/index'], // 显示底部导航的路由

    };
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log('layout beforeRouteEnter', to, from);
  //   next();
  // },
  components: {
    FootNav,
    quickNav,
  },
  watch: {
    $route() {
      if (!this.$route.meta.isHideShare) {
        this.initWxShareFn();
      }
    },
    isShowLoading() {
      // 全局loadding
      if (this.isShowLoading) {
        this.$loading();
      } else {
        this.$loading().close();
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      /*eslint-disable*/
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoibWFkZSBieSBoZWF2ZW4iLCJ1c2VyX25hbWUiOiJsaXV5dWh1aUBlbGUtY2xvdWQuY29tIiwic2NvcGUiOlsic2VydmVyIl0sImV4cCI6MTU2MDUxNTE4MiwidXNlcklkIjoxMzcyLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiY2RhM2QwM2ItZDEwYy00ZDU5LWIzMmMtNTExY2QzYmM3Yzg5IiwiY2xpZW50X2lkIjoiZmF0YyJ9.fIp3qjIvaDfnrI9kRChr3sHOjWVVLB7H-jvYffkVw2Q';
      // this.setToken(token);
      /* eslint-enable */
      if (!this.$route.meta.isHideShare) {
        this.initWxShareFn();
      }
      // 获取公司主体信息
      if (!this.COMMON_COMP_DATA.tel && !this.COMMON_COMP_DATA.qq) {
        this.getSourceDataFn();
      }
    },
    initWxShareFn() {
      this.wxShareTitle = this.$route.meta.wxShareTitle
  || this.$route.meta.title || '优税学院';
      // this.wxShareDesc = this.$route.meta.wxShareDesc || '默认描述信息';
      this.wxShareDesc = this.$route.path || '默认描述信息';
      this.wxShareUrl = window.location.href;
      this.wxShareImage = `${window.location.origin + this.publicPath}logo.png`;
      this.wxShareFn();
    },
    // getTokenByCode(){
    //   // 重写该方法  防止重复调用
    // },
    getSourceDataFn() {
      // 获取公司主体信息
      getSourceData().then((res) => {
        this.isCanRequest = true;
        if (res.data.code === '0000') {
          // 获取成功
          this.setCopData(res.data.sourceData);
        }
      }).catch((err) => {
        this.isCanRequest = true;
        console.log(err);
        // 获取token 失败  退出登录 提示重新登录
      });
    },

  },
};
</script>
<style scoped>
/*页面过渡效果*/
  .network-error{
    display: block;
    position: fixed;
    width: 136px;
    height: 86px;
    background: rgba(0,0,0,0.79);
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    letter-spacing: -0.68px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .network-error .icon-neterror{
    background: url('./imgs/network-error.png') no-repeat center center;
    background-size: 100% 100%;
    display: block;
    width: 41px;
    height: 41px;
    margin:10px auto 5px auto;
  }
  .request-loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0,0,0,0);
  }
  .loading-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
  }
</style>
