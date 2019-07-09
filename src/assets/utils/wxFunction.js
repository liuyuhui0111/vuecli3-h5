// 微信jsApi
import { replaceCode } from '@/assets/utils/util';
/*eslint-disable*/ 
export function wxConfig(data,shareData){
  /*
  *微信config配置
  *window.CONFIG.DEV
  */
  if(wx){
    wx.config({
      debug:false && process.env.NODE_ENV !== 'production',
      appId:data.appId,
      timestamp:data.timestamp,
      nonceStr:data.nonceStr,
      signature:data.signature,
      jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline","hideMenuItems"]
      // jsApiList: ["updateAppMessageShareData", "updateTimelineShareData","hideMenuItems"]
    });
    wx.ready(()=>{
      // alert("微信ready执行分享参数:"+JSON.stringify(shareData));
      shareStart(shareData);
      hideShare();
      
    });
    wx.error((res)=>{
      console.log(res);
      // alert("微信error执行报错信息："+ JSON.stringify(res))
    });
  }else{
    // alert("微信jssdk加载失败")
  }
}

export function shareStart(shareData){
  // 分享到朋友圈
  shareData.link = replaceCode(shareData.link);
  wx.onMenuShareTimeline({
    title: shareData.title, // 分享标题
    link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl:shareData.imgUrl, // 分享图标
    success: shareData.success,
    cancel: shareData.cancel
  });
  // wx.updateAppMessageShareData({
  //   title: shareData.title, // 分享标题
  //   link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //   imgUrl:shareData.imgUrl, // 分享图标
  //   success: shareData.success,
  //   cancel: shareData.cancel
  // });
  //分享给朋友
  
  wx.onMenuShareAppMessage(shareData);
  // wx.updateAppMessageShareData(shareData);
}
export function hideShare(){
  // 批量隐藏功能按钮接口
  wx.hideMenuItems({
    menuList: [
      "menuItem:copyUrl", //复制链接
      "menuItem:originPage",  //原网页
      "menuItem:openWithQQBrowser", //qq浏览器打开
      "menuItem:openWithSafari",    //safari浏览器打开
      "menuItem:share:email",       //邮件
      "menuItem:share:QZone",       //分享QQ空间
      "menuItem:share:facebook",      //分享到fb
      "menuItem:share:weiboApp",      //分享到微博
      "menuItem:share:qq",        //分享到QQ

    ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  });
}

