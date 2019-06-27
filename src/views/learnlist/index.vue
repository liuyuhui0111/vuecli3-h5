<template>
  <div class="learnlist">


    <div class="empty" v-show="list.length<1 && isShowPage">
      <span class="icon-empty"></span>
      <p @click="routerReplace('/online')">还没有学习记录哦~ <br>
      <span class="active">现在去学习</span></p>
    </div>
    <div v-if="list.length>0" class="view-wrapper">
      <cube-scroll
          ref="learnlistScroll"
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
          <ClassCard @cardClick="cardClick"
          :item="item" page="list">
          <template slot-scope="props"
          slot="onlineIntro">
            <div class="line">
              <div class="linebox">
              <span class="activeline"
              :style="{width:props.item.proportion}"></span>
              </div>
              <span class="num" :title="props.item.title"
              :class="{active:props.item.proportion=='100%'}">{{props.item.proportion}}</span>
            </div>
          </template>
          </ClassCard>
        </div >

        </div>
        <div class="h80"></div>
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
  queryClassList,
} from '@/api/apis';
import ClassCard from '@/views/components/card.vue';

export default {
  name: 'learnlist',
  data() {
    return {
      list: [],
      isShowPage: false,
      pageNum: 1, // 页面
      pageSize: 10, // 每页条数
      total: 0, // 总条数
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '上拉加载',
      pullUpLoadNoMoreTxt: '已经到底了~',
      isShowBackTop: false, // 返回顶部

      params: {
        isComplete: '', // 查询全部
      },
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
  created() {
    this.init();
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
      this.$refs.learnlistScroll.scrollTo(0, 0);
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
      /*eslint-disable*/ 
      if (this.list.length >= this.total && t !== 'init') {
        this.$refs.learnlistScroll && this.$refs.learnlistScroll.forceUpdate();
        return;
      }
      let { pageNum } = this;
      let { pageSize } = this;
      // this.total = 0;
      queryClassList({
        pageNum,
        pageSize,
        ...this.params,
      }, opt).then((res) => {
        if (res.data.code === '0000') {
          this.isShowPage = true;
          this.pageNum += 1;
          if (res.data.list.length > 0) {
              res.data.list.forEach((item) => {
                item.pic = item.bannerUrl;
              });
             
            this.list = this.list.concat(res.data.list);

            if (this.list.length >= res.data.total && t !== 'init') {
              this.$refs.learnlistScroll && this.$refs.learnlistScroll.forceUpdate();
            }

            if (t === 'init') {
              // 初始化情况下  更新srcoll 滚动到顶部
              this.$refs.learnlistScroll && this.$refs.learnlistScroll.refresh();
            }
          } else {
            this.$refs.learnlistScroll && this.$refs.learnlistScroll.forceUpdate();
          }
           /* eslint-enable */
          this.total = res.data.total;
        }
      }).catch((err) => {
        console.log(err);
        this.$message('最近学习列表获取失败，请稍后再试');
      });
    },


  },
};
</script>
<style scoped>
.h80{
  height: 80px;
  display: block;
  position: relative;
  overflow: hidden;
}
.tips{
  display: block;
  width: 100%;
  color: #868686;
  text-align: center;
  font-size: 12px;
  padding: 30px 0;
  height: 20px;
  line-height: 20px;
  position: absolute;
  bottom: 0;
}
.line{
  position: relative;
  width: 100%;
  height: 17px;
  padding-right: 36px;
  box-sizing:border-box;
}
.line .linebox{
  position: relative;
  width: 100%;
  height: 17px;
}
.line .linebox:after{
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  top: 7px;
  background: #d4d4d4;
  z-index: 2;
}
.line .activeline{
  position: absolute;
  left: 0;
  height: 3px;
  top: 7px;
  background: #FB683C;
  z-index: 10;
}
.line .num{
  display: block;
  width: 36px;
  font-size: 12px;
  color: #444;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 17px;
  height: 17px;
  text-align: right;
}
.line .num.active{
  color: #FB683C;
}
.view-wrapper{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 50px;
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
