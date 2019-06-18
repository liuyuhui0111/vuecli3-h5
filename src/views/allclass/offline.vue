<template>
  <div v-if="isShowPage" class="allclass common-allclass-index">

    <!-- 顶部导航 -->
    <div class="nav">
      <div v-for="(item,index) in navlist"
      class="item"
      @click="routerReplace(item.path)"
      :class="{active:item.type == '2'}"
      :key="index">
        <span>{{item.text}}</span>
      </div>
    </div>
      <!-- 公开课 -->
      <div class="empty" v-if="list.length<1 && isShowPage">
        <span class="icon-empty"></span>
        <template>
          <p @click="routerReplace('/online')">暂无线上公开课~ <br>先去学习一下线上课程吧！</p>
        </template>
      </div>
      <div v-if="list.length>0" class="view-wrapper">
        <cube-scroll
            ref="scroll"
            :data="list"
            :options="options"
            :scrollEvents="['scroll']"
            @scroll="scroll"
            @pulling-up="onPullingUp">
          <!-- 上拉加载 -->
          <!-- 展示区域 -->
          <div class="list">
          <div v-for="(item,index) in list" class="item"
          :key="index">
            <ClassCard  @cardClick="cardClick"
            :item="item" page="list"></ClassCard>
          </div >
          </div>
          <template slot="pullup" slot-scope="props">
        <div v-if="props.isPullUpLoad" class="tips">
          加载中...
        </div>
        <div v-else class="tips">
          已经到底了~
        </div>
        </template>
        </cube-scroll>
        <!-- 返回顶部 -->
  <BackTop @backTop="scrollToTop"
  :isShowBackTop="isShowBackTop"></BackTop>
      </div>

  </div>
</template>
<script>
import {
  offlineCourseList,
} from '@/api/apis';
import ClassCard from '@/views/components/card.vue';

export default {
  name: 'allclass',
  data() {
    return {
      tips: '已经到底了~',
      infinite: true,
      type: '2', // 1线上课 2线下公开课
      offset: 200,
      navlist: [
        {
          text: '线下公开课',
          type: '2',
          path: '/offline',
        },
        {
          text: '线上录播课',
          type: '1',
          path: '/online',
        },
      ],
      list: [], // 课程列表  公开课 线上课共用
      pageNum: 1, // 页面
      pageSize: 15, // 每页条数
      total: 0, // 总条数
      isShowPage: false, // 是否展示页面
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '上拉加载',
      pullUpLoadNoMoreTxt: '已经到底了~',
      customPullDown: false,
      isShowBackTop: false, // 返回顶部
    };
  },
  components: {
    ClassCard,
  },
  watch: {
    $route() {
      this.init();
    },
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: false,
      };
    },
    pullUpLoadObj() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold, 10),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt,
        },
      } : false;
    },
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pageNum = 1;
      this.total = 0;
      this.isShowPage = false;
      this.list = [];
      this.onPullingUp('init');
    },
    scroll(pos) {
      if (pos.y < -this.scrollInitHeight) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    scrollToTop() {
      this.$refs.scroll.scrollTo(0, 0);
      this.isShowBackTop = false;
    },
    onPullingUp(t) {
      // 公开课列表
      let opt = { isHideLoading: true };
      if (t === 'init') {
        this.pageNum = 1;
        this.list = [];
        this.pullUpLoad = true;
        opt = {};
      }
      if (this.list.length >= this.total && t !== 'init') {
        this.$refs.scroll.forceUpdate();
        return;
      }
      let { pageNum } = this;
      let { pageSize } = this;
      offlineCourseList({ pageNum, pageSize }, opt).then((res) => {
        if (res.data.list.length > 0) {
          /*eslint-disable*/ 
              res.data.list.forEach((item)=>{
                item.type='2';
              })
             
          this.list = this.list.concat(res.data.list);
          this.pageNum += 1;
          if (this.list.length >= res.data.total && t !== 'init') {
            this.$refs.scroll && this.$refs.scroll.forceUpdate();
          }
        } else {
          this.$refs.scroll && this.$refs.scroll.forceUpdate();
        }
        this.total = res.data.total;
        this.isShowPage = true;
         /* eslint-enable */
      }).catch((err) => {
        console.log(err);
      });
    },

  },
};
</script>
<style>
  .common-allclass-index .cube-pullup-wrapper .before-trigger{
    color: #868686;
    font-size: 12px;
    text-align: center;
  }
</style>
<style scoped>
.tips{
  display: block;
  width: 100%;
  color: #868686;
  text-align: center;
  font-size: 12px;
  padding: 30px 0;
}
  .allclass{
    padding-bottom: 50px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing:border-box;
  }
  .nav{
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 7px solid #f1f1f1;
  }
  .nav .item{
    width: 50%;
    text-align: center;
    font-size: 0;
  }
  .nav .item span{
    font-size: 14px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .nav .active span{
    color: #FB683C;
  }
  .nav .active span:after{
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 3px;
    background: #FB683C;
    border-radius: 100px;
    bottom: 0;
    left: 0;
  }
  .empty{
    padding-top: 103px;
    font-size: 17px;
    color: #868686;
    text-align: center;
  }
  .icon-empty{
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin: 0 auto;
    background: url('./imgs/icon-empty.png') no-repeat center center;
    background-size: 50px 50px;
  }
  .empty p{
    line-height: 24px;
    margin-top: 15px;
  }
  .list{
    border-bottom: 0.5px solid #d4d4d4;
    padding-left: 15px;
    display: block;
    width: 100%;
    box-sizing:border-box;
  }
  .list .item{
    width: 100%;
    padding: 15px 15px 15px 0;
    border-bottom: 0.5px solid #d4d4d4;
    box-sizing:border-box;
  }
  .list .item:nth-last-child(1){
    border-bottom: none;
  }
  .view-wrapper{
    position: fixed;
    top: 47px;
    bottom: 50px;
    width: 100%;
  }
  .list-box{
    display: block;
    position: relative;
    width: 100%;
    min-height: 100%;
  }
</style>
