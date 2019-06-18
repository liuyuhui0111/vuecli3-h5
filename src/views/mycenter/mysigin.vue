<template>
  <div class="learnlist">


    <div class="empty" v-show="list.length<1 && isShowPage">
      <span class="icon-empty"></span>
      <p @click="routerReplace('/offline')">还没有报名公开课哦~ <br>
      <span class="active">现在去报名</span></p>
    </div>
    <div v-if="list.length>0" class="view-wrapper">
      <cube-scroll
          ref="siginScroll"
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
          <div class="tel">
            2019-06-17 08:53 预约手机号：13354445555
          </div>
          <ClassCard @cardClick="cardClick"
          :item="item" page="list">
          <template slot-scope="props"
          slot="onlineIntro">
            <div class="col-box">
              <span class="money"
              :class="{free:props.item.price==0}">
              {{props.item.price==0?'免费':props.item.price}}</span>
              <!-- <span class="col">取消收藏</span> -->
            </div>
          </template>
          </ClassCard>

          <div class="time">
            上课时间：2019-12-12 12:00 ~2019-12-13 12:00
          </div>
          <div class="address">
            上课地点：北京市海淀区数码大厦A座9层
          </div>
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
  getCourseList,
} from '@/api/apis';
import ClassCard from '@/views/components/card.vue';

export default {
  name: 'learnlist',
  data() {
    return {
      list: [],
      isShowPage: false,
      pageNum: 1, // 页面
      pageSize: 15, // 每页条数
      total: 0, // 总条数
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '上拉加载',
      pullUpLoadNoMoreTxt: '已经到底了~',
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
  mounted() {
    this.init();
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true,
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
  methods: {
    init() {
      this.pageNum = 1;
      this.total = 0;
      this.isShowPage = false;
      this.list = [];
      // 获取在线课程导航
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
      this.$refs.siginScroll.scrollTo(0, 0);
      this.isShowBackTop = false;
    },
    onPullingUp(t) {
      let opt = { isHideLoading: true };
      if (t === 'init') {
        this.pageNum = 1;
        opt = {};
        this.list = [];
        this.isShowPage = false;
        this.isShowBackTop = false;
      }
      if (this.list.length >= this.total && t !== 'init') {
        this.$refs.siginScroll.forceUpdate();
        return;
      }
      let { pageNum } = this;
      let { pageSize } = this;
      // this.total = 0;
      getCourseList({
        pageNum,
        pageSize,
      }, opt).then((res) => {
        if (res.data.code === '0000') {
          this.isShowPage = true;
          this.pageNum += 1;
          if (res.data.list.length > 0) {
            /*eslint-disable*/ 
              res.data.list.forEach((item) => {
                item.pic = item.bannerUrl;
              });
             
            this.list = this.list.concat(res.data.list);

            if (this.list.length >= res.data.total && t !== 'init') {
              this.$refs.siginScroll.forceUpdate();
            }

            if (t === 'init') {
              // 初始化情况下  更新srcoll 滚动到顶部
              this.$refs.siginScroll && this.$refs.siginScroll.refresh();
            }
          } else {
            this.$refs.siginScroll && this.$refs.siginScroll.forceUpdate();
          }
           /* eslint-enable */
          this.total = res.data.total;
        }
      }).catch((err) => {
        console.log(err);
        this.$message('我的报名列表获取失败，请稍后再试');
      });
    },


  },
};
</script>
<style scoped>
.tips{
  display: block;
  width: 100%;
  color: #868686;
  text-align: center;
  font-size: 12px;
  padding: 30px 0;
}
.time,
.address,
.tel{
  font-size: 12px;
  padding: 5px 0;
}
.time,
.address{
  color: #868686;
}
.classtype2,
.classtype1{
  color: #FB683C;
  margin-right: 3px;
  font-weight: bold;
}
.classtype2{
  color: #659FE3;
}
.col-box .col{
  float: right;
}
.money{
  color: #F91E1E;
  font-size: 12px;
  font-weight: bold;
  float: left;
}
.money.free{
  color: #2DAF53;
}
.view-wrapper{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
  .empty p .active{
    color: #FB683C;
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
</style>
