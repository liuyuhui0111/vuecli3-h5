<template>
  <div class="class-card">
    <div class="card-box"
    @click="emit('cardClick',item)"
    :class="[typeClass,page]">
      <!-- 首页线下课 -->
      <template v-if="item">
        <div class="img-box">
          <baseImg
            :width="310"
            :height="184"
            :src="item.pic">
          </baseImg>
          <!-- 线下课已过期 已截止标识 -->
          <template v-if="item.state==1">
            <span class="siginstop">报名已截止</span>
          </template>
          <template v-if="item.state==2">
            <span class="classstop">已结束</span>
          </template>
          <template v-if="item.price && item.price!='0' &&
          item.leaguerFreeFlag!=0
          && item.type == '1'">
            <span class="classstop">会员免费</span>
          </template>
        </div>
        <div class="intro">

          <div
          :class="{onlinelist:item.type == '1'}"
          class="title ellipsis2">
            <slot name="title" :item="item">
              {{item.title}}
            </slot>
          </div>
          <!-- 线下课展示信息 -->
          <template v-if="item.type == '2'">
            <slot name="onlineIntro" :item="item">
            <div class="teacher ellipsis">
              <span v-if="item.teacherName">主讲：{{
              (item.teacherName && item.teacherName.length>3)
                ? item.teacherName.substr(0,3)+'...'
                : item.teacherName
              }}</span>
              <span class="address">
                {{item.address + item.city}}
              </span>
            </div>
            <div class="time">
              {{getTime()}}
            </div>
            <div class="price" v-if="page=='list'">
              <!-- 课程列表页 -->
              <span class="money"
              :class="{free:item.price==0}">{{item.price==0?'免费':'￥'+item.price}}</span>
            </div>
            </slot>
          </template>

          <!-- 线上课数据 -->
          <template v-if="item.type == '1'">
            <slot name="onlineIntro" :item="item">
              <div class="price">
                <span class="money"
              v-if="item.leaguerFreeFlag==0 || item.price==0"
              :class="{free:item.price==0}">{{item.price==0?'免费':'￥'+item.price}}</span>
              <span class="money vipfree"
              v-if="item.leaguerFreeFlag!=0 && item.price!=0"
              >{{'￥'+item.price}}</span>
                <span class="learnNum">{{item.learnNum}}人已学</span>
              </div>
            </slot>
          </template>

        </div>
      </template>

      <!-- 首页大家都在学 -->
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/assets/utils/timefn';

export default {
  name: 'ClassCard',
  data() {
    return {
      name: '课程组件',
    };
  },
  props: {
    item: { // 课程对象
      type: Object,
      default: () => null,
    },
    typeClass: { // 排列样式
      type: String,
      default: () => 'row',
    },
    page: { // 页面
      type: String,
      default: () => '',
    },
  },
  methods: {
    getTime() {
      let { item } = this;
      return `${formatDate(item.startTime)}-${formatDate(item.endTime)}`;
    },
  },
};
</script>
<style scoped>
.class-card{
  display: block;
  width: 100%;
}
.vipfree i{
  font-style: normal;
  display: inline-block;
  background: #FF7700;
border-radius: 4px;
border-radius: 4px;
width: 50px;
height: 18px;
line-height: 18px;
text-align: center;
font-size: 10px;
color:#fff;
margin-left: 5px;
}
.card-box{
  position: relative;
  width: 100%;
  box-sizing:border-box;
  min-height: 92px;
  overflow: hidden;
}
.card-box .img-box{
  width: 155px;
  float: left;
  position: relative;
}
.card-box.list .img-box{
  width: 170px;
}
.card-box .img-box .siginstop,
.card-box .img-box .classstop{
  position: absolute;
  display: block;
  width: 100%;
  text-align: center;
  height: 25px;
  line-height: 25px;
  background: rgba(0,0,0,0.49);
  font-size: 12px;
  color: #fff;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-weight: bold;
}
.card-box .img-box .siginstop{
  color: #F91E1E;
}
.card-box .intro{
  float: right;
  width: 160px;
  color: #868686;
  font-size: 12px;
  padding-top: 5px;
}
.card-box.list .intro{
  padding-top: 0;
}
.title{
  width: 100%;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  font-size: 14px;
  color: #444;
}
.time,
.teacher{
  margin-top: 5px;
  height: 17px;
  line-height: 17px;
  font-size: 14px;
}
.address{
  margin-left: 8px;
  padding-left: 10px;
  background: url('./imgs/icon-address.png') no-repeat left center;
  background-size: 10px auto;
}

.col .intro,
.col .img-box{
  float: none;
  width: 100%;
}
.col .title{
  margin-top: 10px;
  margin-bottom: 5px;
}
.intro .price,
.card-box.list .price{
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  font-size: 0;
}
.card-box.list .onlinelist{
  margin-bottom: 45px;
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
.learnNum{
  color: #868686;
  float: right;
  font-size: 12px;
}
</style>
