<template>
  <div v-if="showList.length>0" class="index">
    <cube-scroll ref="indexScroll"
    :data="showList"
    :scrollEvents="['scroll']"
    @scroll="scroll">
    <!-- logo -->
    <div @click="initWxShareFn()" class="logo">
      <baseImg
      :width="135"
      :height="46"
      :src="COMMON_COMP_DATA.logoUrl">
      </baseImg>
    </div>
    <!-- banner -->
    <div v-if="bannerList.length>0" class="banner-box">
      <Banner :list="bannerList"></Banner>
    </div>

    <div class="content-bg">

      <!-- nav -->
      <div class="nav-box">
        <IndexNav @navclick="navclick"></IndexNav>
      </div>
      <!-- 线下公开课 -->
      <div v-if="showCourseOfflineList.length>0" class="card offline">
        <BaseTitle title="线下公开课"
        @moreclick="moreclick"
        moreurl="0"></BaseTitle>
        <div v-for="(item,index) in showCourseOfflineList"
        class="item"
        :key="index">
          <ClassCard @cardClick="cardClick" :item="item.courseOfflineEntity"></ClassCard>
        </div >
      </div>


      <!-- 大家都在学 -->
      <div v-if="showCourseOnlineList.length>0" class="card">
        <BaseTitle title="大家都在学"
        @moreclick="moreclick"
        moreurl="1"></BaseTitle>
        <div class="online-box">
          <div v-for="(item,index) in showCourseOnlineList"
          class="item"
          :key="index">
            <ClassCard @cardClick="cardClick" :item="item"
            typeClass="col"></ClassCard>
          </div >
        </div>
      </div>


      <!-- 新鲜出炉 -->
      <div v-if="getNewCourseListList.length>0" class="card">
        <BaseTitle title="新鲜出炉"
        @moreclick="moreclick"
        moreurl="2"></BaseTitle>
        <div class="online-box">
          <div v-for="(item,index) in getNewCourseListList"
          class="item"
          :key="index">
            <ClassCard @cardClick="cardClick" :item="item"
            typeClass="col"></ClassCard>
          </div >
        </div>
      </div>


      <!-- 优质课程推荐 -->
      <div v-if="getGroomCourseListList.length>0" class="card">
        <div class="class-title">
          优质课程推荐
        </div>
        <div class="online-box">
          <div v-for="(item,index) in getGroomCourseListList"
          class="item"
          :key="index">
            <ClassCard @cardClick="cardClick" :item="item"
            typeClass="col"></ClassCard>
          </div >
        </div>
      </div>


    </div>
  </cube-scroll>
  <!-- 返回顶部 -->
  <BackTop @backTop="scrollToTop"
  :isShowBackTop="isShowBackTop"></BackTop>
  </div>
</template>
<script>
import {
  showFoucusPic,
  showCourseOffline,
  showCourseOnline,
  // showTeacher,
  getNewCourseList,
  getGroomCourseList,
} from '@/api/apis';
import { initList } from '@/assets/utils/util';
import Banner from './banner.vue';
import IndexNav from './nav.vue';
import BaseTitle from '@/views/components/title.vue';
import ClassCard from '@/views/components/card.vue';


export default {
  name: 'index',
  data() {
    return {
      name: 'index',
      bannerList: [], // 轮播图
      showCourseOfflineList: [], // 线下公开课
      showCourseOnlineList: [], // 大家都在学
      getNewCourseListList: [], // 新鲜出炉
      getGroomCourseListList: [], // 推荐课程
      isShowBackTop: false, // 返回顶部
      showList: [],
    };
  },
  mounted() {
    this.init();
  },
  components: {
    Banner,
    IndexNav,
    BaseTitle,
    ClassCard,
  },
  activated() {
    this.$nextTick(() => {
      /*eslint-disable*/ 
      this.$refs.indexScroll && this.$refs.indexScroll.refresh();
      /* eslint-enable */
    });
  },
  methods: {
    init() {
      // 获取轮播图
      this.showFoucusPicFn();
      // 获取线下公开课
      this.showCourseOfflineFn();
      // // 首页大家都在学
      this.showCourseOnlineFn();
      // // 首页新鲜出炉列表
      this.getNewCourseListFn();
      // // 首页推荐课程列表
      this.getGroomCourseListFn();
    },
    scroll(pos) {
      if (pos.y < -this.scrollInitHeight) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    scrollToTop() {
      this.$refs.indexScroll.scrollTo(0, 0);
      this.isShowBackTop = false;
    },

    moreclick(moreurl) {
      // 查看更多
      let moreData = [{ path: '/open-class' },
        { path: '/online-class', query: { hot: 1 } },
        { path: '/online-class' },
      ];
      this.routerGo(moreData[moreurl].path, moreData[moreurl].query);
    },
    navclick(item) {
      this.routerGo(item.path);
    },
    showFoucusPicFn() {
      // 获取轮播图
      showFoucusPic({ type: '0' }).then((res) => {
        this.showList.push(true);
        if (res.data.list) {
          /*eslint-disable*/ 
          res.data.list.forEach((item)=>{
            item.image = item.pic;
          })
          /* eslint-enable */
          this.bannerList = res.data.list;
        }
      }).catch((err) => {
        this.showList.push(true);
        console.log(err);
      });
    },
    showCourseOfflineFn() {
      // 线下公开课
      showCourseOffline({ pageSize: 2 }).then((res) => {
        this.showList.push(true);
        if (res.data.list) {
          /*eslint-disable*/ 
          res.data.list.forEach((item)=>{
              item.courseOfflineEntity.teacherName = item.teacherName;
              item.courseOfflineEntity.type = item.type;
          })
          /* eslint-enable */
          this.showCourseOfflineList = res.data.list.slice(0, 2);
        }
      }).catch((err) => {
        this.showList.push(true);
        console.log(err);
      });
    },
    showCourseOnlineFn() {
      // 大家都在学
      showCourseOnline({ pageSize: 6 }).then((res) => {
        this.showList.push(true);
        if (res.data.list) {
          /*eslint-disable*/ 
          res.data.list.forEach((item)=>{
              item.pic = item.bannerUrl;
          })
          /* eslint-enable */
          this.showCourseOnlineList = initList(res.data.list, 2).slice(0, 6);
        }
      }).catch((err) => {
        this.showList.push(true);
        console.log(err);
      });
    },

    getNewCourseListFn() {
      // 新鲜出炉
      getNewCourseList({ pageSize: 2 }).then((res) => {
        this.showList.push(true);
        if (res.data.list) {
          let { list } = res.data;
          /*eslint-disable*/ 
          list.forEach((item) => {
              item.pic = item.bannerUrl;
          });
          /* eslint-enable */
          this.getNewCourseListList = res.data.list.slice(0, 2);
        }
      }).catch((err) => {
        this.showList.push(true);
        console.log(err);
      });
    },

    getGroomCourseListFn() {
      // 推荐课程
      getGroomCourseList({ pageSize: 4 }).then((res) => {
        this.showList.push(true);
        let { list } = res.data;
        if (res.data.list) {
          /*eslint-disable*/ 
          list.forEach((item) => {
              item.pic = item.bannerUrl;
          });
          /* eslint-enable */
          this.getGroomCourseListList = initList(res.data.list, 4).slice(0, 4);
        }
      }).catch((err) => {
        this.showList.push(true);
        console.log(err);
      });
    },


  },
};
</script>
<style scoped>
  .index{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-sizing:border-box;
  }
  .index:after{
    content: "";
    display: block;
    width: 100%;
    position: fixed;
    bottom: 0px;
    height: 200px;
    background: #f1f1f1;
  }
  .logo{
    display: block;
    width: 100px;
    margin: 8px auto;
  }
  .banner-box{
    background: #fff;
  }
  .content-bg{
    display: block;
    box-sizing:border-box;
    padding: 0 15px;
    background: #f1f1f1;
    min-height: 100%;
    padding-bottom: 58px;
  }
  .nav-box{
    position: relative;
    background: #fff;
    width: 100%;
    /*自动编译为rem 可以写0.5px*/
    border: 0.5px solid #D4D4D4;
    border-radius: 4px;
    top: -5px;
    z-index: 10;
  }
  .card{
    background: #FFFFFF;
    border: 0.5px solid #D4D4D4;
    border-radius: 4px;
    margin-bottom: 7px;
  }
  .class-title{
    text-align: center;
    border-bottom: 0.5px solid #D4D4D4;
    font-size: 12px;
    line-height: 30px;
    font-weight: bold;
  }
  .item{
    padding: 10px 10px 0 10px;
  }
  .online-box{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 10px 0 10px;
  }
  .online-box .item{
    padding: 0;
    width: 155px;
    margin-bottom: 15px;
  }
  .offline{
    padding-bottom: 10px;
  }
</style>
