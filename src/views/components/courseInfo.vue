<template>
    <div class="courseInfo_outer common-components-courseInfo">
        <div class="head_outer">
            <div class="head-left">
                <!--<img :src="detailData.headPic || detailData.teacherAvatar">-->
                <base-img :src="detailData.teacherAvatar || detailData.headPic"
                          :defaultSrc="defaultPhotoUrl"
                          :alt="detailData.teacherName"></base-img>
            </div>
            <div class="head-right">
                <span class="tit">{{ detailData.teacherName }}</span>
                <span v-html="detailData.teacherIntroduction || detailData.teacherBrief"></span>

            </div>
        </div>
        <!--课程信息tit start -->
        <div v-if="detailData.teacherIntroduction" id="content0" class="tit_outer">
            <div class="tit_content">
                <b></b>
                <span>课程信息</span>
            </div>
        </div>
        <!--课程信息tit end -->
        <div v-if="detailData.teacherIntroduction" class="information_outer">
            <span>课程天数: {{ getDay }}天</span>
            <span>课程价格: {{ detailData.price }}元</span>
            <span>培训对象: {{ detailData.trainObject }}</span>
            <span>课程时间: {{ getTime }}</span>
            <span>培训地点: {{ detailData.address }}{{ detailData.city }}{{ detailData.county }}</span>
            <span>咨询电话: {{ detailData.hotline }}</span>
        </div>
        <template v-if="detailData.introduce || detailData. courseBrief">
        <!-- 课程介绍 -->
        <div id="content1" class="tit_outer">
            <div class="tit_content">
                <b></b>
                <span>课程介绍</span>
            </div>
        </div>
        <div id="shareDesc" class="introduce_outer">
            <span v-html="detailData.introduce || detailData. courseBrief">
            </span>
        </div>
    </template>
        <template v-if="detailData.outline || detailData.courseIncome">
        <!-- 课程收益 -->
        <div v-if="!detailData.teacherIntroduction" class="tit_outer">
            <div class="tit_content">
                <b></b>
                <span>课程收益</span>
            </div>
        </div>
        <div v-if="!detailData.teacherIntroduction" class="introduce_outer">
            <span
                    v-html="detailData.outline || detailData.courseIncome">

            </span>
        </div>
        </template>

        <template v-if="detailData.outline || detailData.courseOutline">
        <!-- 课程大纲 -->
            <div id="content2" class="tit_outer">
                <div class="tit_content">
                    <b></b>
                    <span>课程大纲</span>
                </div>
            </div>
            <div class="introduce_outer">
                <span
                        v-html="detailData.outline || detailData.courseOutline">
                </span>
            </div>
        </template>
        <template v-if="detailData.plan">
        <!-- 课程计划 -->
        <div v-if="detailData.teacherIntroduction" id="content3" class="tit_outer">
            <div class="tit_content">
                <b></b>
                <span>课程计划</span>
            </div>
        </div>
        <div v-if="detailData.teacherIntroduction" class="introduce_outer">
            <span v-html="detailData.plan"></span>
        </div>
        </template>

    </div>
</template>

<script>
import { formatDate } from '@/assets/utils/timefn';
import { setScrollTop } from '@/assets/utils/util';

const defaultPhotoUrl = require('@/views/imgs/default.png');

export default {
  // 接受父组件的值
  props: ['detailData'],
  name: 'courseInfo',
  data() {
    return {
      defaultPhotoUrl,
    };
  },
  computed: {
    getDay() {
      let day = (this.detailData.endTime - this.detailData.startTime) / (24 * 60 * 60 * 1000);
      return parseInt(day, 10) + 1;
    },
    getTime() {
      return `${formatDate(this.detailData.startTime, 'true')} ~ ${formatDate(this.detailData.endTime, 'true')}`;
    },
  },
  methods: {
    // aClick(id) {
    //   let a = document.createElement('a');
    //   let href = `#content${id}`;
    //   a.setAttribute('href', href);
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();
    // },
    // 滚动条滚动到指定元素位置
    scrollToDom(id) {
      console.log(id);
      const obj = document.getElementById(`content${id}`);
      if (obj) {
        const top = obj.offsetTop;
        setScrollTop(top);
      }
    },
  },
};
</script>
<style>
    .common-components-courseInfo img{
        width: 100%;
    }
    .common-components-courseInfo p{
        line-height: 1.5;
    }
</style>

<style lang="less" scoped>
    .courseInfo_outer {
        width: 100%;
        height: 100%;
        position: relative;
        padding-bottom: 58px;
        div {
            box-sizing: border-box;
        }
        .head_outer {
            width: 100%;
            /*display: flex;*/
            padding: 10px 15px;
            .head-left {
                width: 60px;
                height: 60px;
                max-width: 60px;
                float: left;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 60px;
                    height: 60px;
                    max-width: 60px;
                }
            }
            .head-right {
                width: calc(100% - 70px);
                margin-left: 70px;
                font-size: 14px;
                span {
                    display: block;
                    color: #444;
                    line-height: 20px;
                    word-wrap: break-word;
                }
                .tit {
                    font-weight: 600;
                    margin-bottom: 10px;
                }
            }
        }
        .tit_outer {
            margin-top: 10px;
            width: 100%;
            padding: 0 15px;
            .tit_content {
                width: 100%;
                padding-bottom: 7px;
                border-bottom: 1px solid #d4d4d4;
                display: flex;
                align-items: center;
                b {
                    width: 3px;
                    height: 14.5px;
                    display: inline-block;
                    background-color: #FB683C;
                    border-radius: 100px;
                }
                span {
                    font-size: 12px;
                    color: #444;
                    margin-left: 5px;
                }
            }

        }
        .information_outer {
            width: 100%;
            padding: 0 15px;
            span {
                margin-top: 10px;
                font-size: 14px;
                display: block;
                color: #444;
            }
        }
        .introduce_outer {
            width: 100%;
            padding: 10px 15px;
            span {
                line-height: 1.5;
                font-size: 14px;
                color: #444;
                p {
                    line-height: 20px;
                }
            }
        }
    }
</style>
