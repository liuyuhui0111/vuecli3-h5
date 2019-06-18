<template>
  <div class="learnlist">


    <div class="empty" v-show="list.length<1 && isShowPage">
      <span class="icon-empty"></span>
      <p @click="routerReplace('/online')">还没收藏记录哦~ <br>
      <span class="active">现在去收藏</span></p>
    </div>
    <div v-if="list.length>0" class="view-wrapper">
      <cube-scroll
          ref="colScroll"
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
            slot="title">
              <span :class="'classtype'+ props.item.type"
              >({{props.item.type==2?'公开课':'线上课'}})
              </span>
              {{props.item.title}}
            </template>
            <template slot-scope="props"
            slot="onlineIntro">
              <div class="col-box">
                <span class="money"
                :class="{free:props.item.price==0}">
                {{props.item.price==0?'免费':props.item.price}}</span>
                <span @click.stop="saveMyCollectionFn(props.item)" class="col">取消收藏</span>
              </div>
            </template>
            </ClassCard>
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
  queryMycollectionList,
  saveMyCollection,
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

      saveMyCollectionParam: { // 取消收藏参数
        courseId: '', // 课程id
        onOffType: '', // 线上线下0 : 线下课； 1 线上课
      },
      params: { // 我的收藏列表
        onOffType: '1', // 线上线下标识0 : 线下课； 1 线上课
        type: '1', // 线上课必填：课程类型 1 精品课 2专题课
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
  mounted() {
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
      this.$refs.colScroll.scrollTo(0, 0);
      this.isShowBackTop = false;
    },
    onPullingUp(t) {
      // 我的收藏
      let opt = { isHideLoading: true };
      if (t === 'init') {
        this.pageNum = 1;
        opt = {};
        this.list = [];
        this.isShowPage = false;
        this.isShowBackTop = false;
      }
      if (this.list.length >= this.total && t !== 'init') {
        this.$refs.colScroll.forceUpdate();
        return;
      }
      let { pageNum } = this;
      let { pageSize } = this;
      // this.total = 0;
      queryMycollectionList({
        pageNum,
        pageSize,
        ...this.params,
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
              this.$refs.colScroll.forceUpdate();
            }

            if (t === 'init') {
              // 初始化情况下  更新srcoll 滚动到顶部
              // this.$refs.colScroll && this.$refs.colScroll.refresh();
            }
          } else {
            this.$refs.colScroll && this.$refs.colScroll.forceUpdate();
          }
           /* eslint-enable */
          this.total = res.data.total;
        }
      }).catch((err) => {
        console.log(err);
        this.$message('线上课列表获取失败，请稍后再试');
      });
    },

    saveMyCollectionFn(item) {
      // 收藏 如果未登录  提示去登陆
      console.log(item);
      if (this.isCanRequest) {
        this.isCanRequest = false;
      } else {
        return;
      }
      this.saveMyCollectionParam.courseId = item.id;
      this.saveMyCollectionParam.onOffType = item.type;

      saveMyCollection(this.saveMyCollectionParam).then((res) => {
        this.isCanRequest = true;
        if (res.data.code === '0000') {
          this.init();
          this.$message('已取消收藏');
        } else if (res.data.code !== '0002') {
          this.$message('取消失败，请重新操作');
        }
      }).catch((err) => {
        this.isCanRequest = true;
        console.log(err);
        this.$message('取消失败，请重新操作');
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
