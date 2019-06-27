<template>
  <div class="mycenter">
    <div class="login-box">
      <div class="photo"></div>
      <div v-if="!token" @click="login"
      class="nologin">登录/注册</div>
      <div v-if="token && commonUserData" class="user">
        <span class="username ellipsis">{{commonUserData.userName}}</span>
        <span class="level"
        @click="routerGo('/vipInfo')"
        v-if="(commonUserData.leaguerList &&
        commonUserData.leaguerList.effective==0)">
          您的会员已到期，去续费
        </span>
        <span class="level"
        @click="routerGo('/vipInfo')"
        v-else-if="!commonUserData.leaguerLevelName">您尚未开通会员，去开通</span>
        <span class="level" v-else>{{commonUserData.leaguerLevelName}}</span>
      </div>
    </div>

    <div class="list">
      <div v-for="(item,index) in list"
      class="item"
      :class="item.iconClass"
      @click="itemClick(item)"
      :key="index">
      {{item.text}}
      </div>
    </div>
    <div v-if="token" class="loginout">
      <span @click="loginoutFn" class="active">
        退出登录
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mycenter',
  data() {
    return {
      list: [
        // {
        //   iconClass:'icon-order',
        //   text:'我的订单',
        //   path:'/myorder',
        // },
        {
          iconClass: 'icon-sigin',
          text: '我的预约报名',
          path: '/mysigin',
        }, {
          iconClass: 'icon-col',
          text: '我的收藏',
          path: '/mycol',
        },
      ],
    };
  },
  methods: {

    itemClick(item) {
      this.routerGo(item.path);
    },
  },
};
</script>
<style scoped>
.mycenter{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
}
.login-box{
  display: block;
  padding: 10px 15px 10px 90px;
  height: 60px;
  font-size: 0;
  border-bottom: 7px solid #f1f1f1;
  overflow: hidden;
  position: relative;
}
.photo{
  display: block;
  position: absolute;
  left: 15px;
  width: 60px;
  height: 60px;
  background: url('./imgs/default.png') no-repeat center center;
  background-size: 59px 59px;
}
.nologin{
  display: block;
  font-size: 17px;
  color: #444;
  line-height:60px;
}
.user{
  font-size: 17px;
  color: #444;
  display: block;
  text-align: left;
  overflow: hidden;
  padding-top: 10px;
}
.username{
  height: 14px;
  line-height: 14px;
}
.level{
  height: 19px;
  line-height: 19px;
  font-size: 14px;
  color: #FB683C;
  display: block;
  padding-top: 5px;
}
.list{
  padding-left: 15px;
  box-sizing:border-box;
  width: 100%;
  border-bottom: 0.5px solid #d4d4d4;
  font-size: 14px;
  color: #444;
}
.list .item{
  display: block;
  position: relative;
  background: url('./imgs/icon-order.png') no-repeat left center;
  background-size: 24px 24px;
  padding: 10px 15px 10px 34px;
  box-sizing:border-box;
  height: 44px;
  line-height: 24px;
  border-bottom: 0.5px solid #d4d4d4;
}
.list .item.icon-sigin{
  background-image: url('./imgs/icon-sigin.png');
}
.list .item.icon-col{
  background-image: url('./imgs/icon-col.png');
  border:none;
}
.loginout{
  position: fixed;
  bottom:120px;
  text-align: center;
  display: block;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.loginout .active{
  font-weight: bold;
}
</style>
