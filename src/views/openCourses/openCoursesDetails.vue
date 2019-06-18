<template>
    <div class="vipInfo_outer">
        <!--banner start-->
        <div class="banner_outer">
            <img :src="detailData.pic" alt="">
        </div>
        <!--banner end-->
        <!--title start-->
        <div class="title_outer">
            <div class="tit-left">
                <span>{{ detailData.title }}</span>
                <span class="red">￥{{ detailData.price }}</span>
            </div>
            <div class="tit-right">
                <div class="collect_box" @click="collectFn">
                    <i v-if="!isColl" class="icon-dark"></i>
                    <i v-else class="icon-bright"></i>
                    <span v-if="!isColl">收藏</span>
                    <!--bright-->
                    <span v-else style="color:#FB683C;">已收藏</span>
                </div>

            </div>
        </div>
        <!--title end-->
        <div class="link"></div>
        <!-- nav start -->
        <div class="nav_outer">
            <ul>
                <li
                        @click="tavsClick(index)"
                        v-for="(v,index) in vipTypeList"
                        :key="index"
                        :class="{active:tabsActive==index}"
                >
                    <span>{{ v }}</span>
                    <div class="dbb-link"></div>
                </li>
            </ul>
        </div>
        <!-- nav end -->

        <!-- 课程信息 start -->
        <course-info :detailData="detailData" ref="child"></course-info>
        <!-- 课程信息 end -->

        <!--footer start-->
        <div class="footer_outer">
            <div class="footer-left">
                <div @click="onlineSignFn">
                    <i class="icon-user"></i>
                    <span>报名</span>
                </div>
                <div @click="showBtn">
                    <i class="icon-zixun"></i>
                    <span>咨询</span>
                </div>
            </div>
            <div class="footer-right">
                <span @click="goVip">开通会员免费学</span>
            </div>
        </div>
        <!--footer end-->

    </div>
</template>
<script>
// showCourseOffline,
//     offlineCourseSignUp,
//     saveMyCollection,
import courseInfo from '@/views/components/courseInfo.vue';
import { findOfflineCourseById, saveMyCollection } from '@/api/apis';


export default {
  name: 'vipInfo',
  data() {
    return {
      vipTypeList: ['课程信息', '课程介绍', '课程大纲', '课程计划'], // nav  tabs
      tabsActive: 0,
      imgUrl: 'http://pic14.nipic.com/20110529/7570613_004640647181_2.jpg',
      courseId: '',
      detailData: '',
      isColl: '', // 是否收藏
      saveMyCollectionParam: { // 收藏参数
        courseId: '', // 课程id
        onOffType: '1', // 线上线下0 : 线下课； 1 线上课
      },
    };
  },
  components: {
    courseInfo,
  },
  created() {

  },
  mounted() {
    this.init();
  },
  computed: {

  },
  methods: {
    // 报名
    onlineSignFn() {
      if (this.detailData.state !== '0') {
        this.$message('课程已结束');
        return;
      }

      if (!this.token) {
        console.log('未登录');
        this.confirmLogin();
        return;
      }
      this.$router.push({ path: '/signup' });
    },
    // 收藏
    collectFn() {
      // 点击收藏
      this.saveMyCollectionParam.courseId = this.courseId;
      this.saveMyCollectionFn();
    },
    initWxShareFn() {
      this.wxShareTitle = this.$route.meta.title;
      // this.wxShareDesc = this.$route.meta.wxShareDesc || '默认描述信息';
      this.wxShareDesc = this.detailData.title;
      this.wxShareUrl = window.location.href;
      this.wxShareImage = this.detailData.pic;
      this.wxShareFn();
    },
    saveMyCollectionFn() {
      // 收藏 如果未登录  提示去登陆
      if (!this.token) {
        console.log('未登录');
        this.confirmLogin();
        return;
      }

      saveMyCollection(this.saveMyCollectionParam).then((res) => {
        if (res.data.code === '0000') {
          this.isColl = !this.isColl;
          if (this.isColl) {
            this.toast('已收藏');
          }
        } else {
          this.$message(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
        this.$message('服务器错误，请稍后再试');
      });
    },
    // 跳转会员介绍
    goVip() {
      this.$router.push({ path: '/vipInfo' });
    },
    // 拨打电话弹框
    showBtn() {
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: `确定拨打电话: ${this.COMMON_COMP_DATA.phone} 吗?`,
        confirmBtn: {
          text: '呼叫',
          active: true,
          disabled: false,
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
        },
        onConfirm: () => {
          // 点击确定
          let a = document.createElement('a');
          let href = 'tel:15114291511';
          a.setAttribute('href', href);
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
        onCancel: () => {
          // 点击取消
        },
      }).show();
    },
    init() {
      this.courseId = parseInt(this.$route.query.cid, 10);
      // 获取详情
      findOfflineCourseById({ id: this.courseId }).then((res) => {
        if (res.data.code === '0000' && res.data.data) {
          this.isColl = res.data.isFavorite && res.data.isFavorite.code === '8888';
          this.detailData = res.data.data;
          // 自定义分享
          this.initWxShareFn();
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 点击tabs
    tavsClick(index) {
      this.tabsActive = index;
      this.$refs.child.aClick(index);
    },
  },
};
</script>
<style lang="less" scoped>
    .vipInfo_outer {
        width: 100%;
        height: 100%;
        position: relative;
        div {
            box-sizing: border-box;
        }
        .header_outer {
            width: 100%;
            text-align: center;
            background-color: #fff;

            span {
                display: inline-block;
                font-size: 17px;
                color: #444;
                padding: 10px;
            }
        }
        .banner_outer {
            width: 100%;
            height: 173px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title_outer {
            width: 100%;
            height: 75px;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            .tit-left {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                span {
                    font-size: 14px;
                    color: #444;
                }
                .red {
                    color: #F91E1E;
                }
            }
            .tit-right {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .collect_box{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                span {
                    font-size: 11px;
                    color: #868686;
                    margin-top: 5px;
                }
                i {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                }
                .icon-dark {
                    background: url("img/shoucang545454545.png");
                    background-size: 100% 100%;
                }
                .icon-bright {
                    background: url("img/shoucang54545.png");
                    background-size: 100% 100%;
                }
            }
        }
        .nav_outer {
            width: 100%;
            height: 40px;
            background-color: #fff;
            border-bottom: 1px solid #d4d4d4;
            ul {
                display: flex;
                height: 100%;
                li {
                    flex: 1;
                    height: 100%;
                    text-align: center;
                    line-height: 40px;
                    padding: 0 12px;
                    position: relative;
                    cursor: pointer;
                    &.active {
                        .dbb-link {
                            position: absolute;
                            bottom: 0;
                            left: 12px;
                            width: calc(100% - 24px);
                            height: 3px;
                            background-color: #fb683c;
                            border-radius: 4px;
                            //   border-bottom: 3px solid #fb683c;
                        }
                        span {
                            color: #fb683c;
                            white-space: nowrap;
                        }
                    }

                    span {
                        font-size: 14px;
                        white-space: nowrap;
                    }
                }
            }
        }
        .footer_outer {
            width: 100%;
            height: 48px;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #fff;
            display: flex;
            .footer-left {
                flex: 1;
                display: flex;
                div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: 8.5px;
                        color: #444;
                        margin-top: 3px;
                    }
                    i {
                        display: inline-block;
                        width: 25px;
                        height: 25px;
                    }
                    .icon-user {
                        background: url("img/fenzu654545454.png");
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    .icon-zixun {
                        background: url("img/zixun165655655.png");
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                }
            }
            .footer-right {
                flex: 1;

                span {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 48px;
                    background-color: #FB683C;
                    display: block;
                    font-size: 17px;
                    color: #fff;
                    font-weight: 600;
                    &:active{
                        background-color: #d85a34;
                    }
                }
            }
        }
        .link {
            background-color: rgb(241, 241, 241);
            height: 7px;
            width: 100%;
        }
    }
</style>
