<template>
    <div class="vipInfo_outer">
        <!-- nav start -->
        <div class="nav_outer">
            <ul>
                <li
                        @click="tavsClick(index)"
                        v-for="(v,index) in vipTypeList"
                        :key="index"
                        :class="{active:tabsActive==index}"
                >
                    <span>{{ v.name }}</span>
                    <div class="dbb-link"></div>
                </li>
            </ul>
        </div>
        <!-- nav end -->
        <div class="link"></div>
        <!-- main start -->
        <div class="content_outer">
            <div class="title_outer">
                <span>会员尊享特权</span>
                <br>
                <span class="red">￥{{ vipInfoData.fee }}</span>
            </div>
            <div class="coutent_info">
                <div :key="index" v-for="(v,index) in vipInfoData.equityDtoList" class="list_outer">
                    <span v-if="v.tickType==1"><img src="./img/duigou.png" alt=""></span>
                    <span v-else><img src="./img/error.png" alt=""></span>
                    <span>{{ v.name }}</span>
                </div>
            </div>
            <div class="btn_outer">
                <img @click="showBtn" src="./img/分组.png" alt>
                <!-- <span>立即咨询</span> -->
            </div>
        </div>
        <!-- main end -->
    </div>
</template>
<script>
import { queryList } from '@/api/apis';

export default {
  name: 'vipInfo',
  data() {
    return {
      vipTypeList: [], // nav  tabs
      tabsActive: 0,
      vipInfoData: {},
    };
  },
  mounted() {
    this.queryListFn();
  },
  methods: {
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
    queryListFn() {
      // const that = this;
      // 查询会员权益列表
      queryList().then((res) => {
        if (res.data.code === '0000') {
          this.vipTypeList = res.data.list;
          if (res.data.list.length > 0) {
            /*eslint-disable*/
                            this.vipInfoData = this.vipTypeList[0];
                            /* eslint-enable */
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 点击tabs
    tavsClick(index) {
      this.tabsActive = index;
      this.vipInfoData = this.vipTypeList[index];
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
            border-bottom: 1px solid #d4d4d4;
            span {
                display: inline-block;
                font-size: 17px;
                color: #444;
                padding: 10px;
            }
        }
        .nav_outer {
            /*width: 100%;*/
            height: 40px;
            background-color: #fff;
            overflow-x: auto;
            overflow-y: hidden;
            &::-webkit-scrollbar {
                display: none
            }
            ul {
                display: flex;
                height: 40px;

                li {
                    float: left;
                    /*flex: 1;*/
                    height: 100%;
                    /*text-align: center;*/
                    line-height: 40px;
                    padding: 0 12px;
                    position: relative;
                    box-sizing: border-box;
                    &.active {
                        /*border-bottom: 3px solid #fb683c;*/
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
                            padding: 0 5px;
                            color: #fb683c;
                            white-space: nowrap;
                        }
                    }

                    span {
                        padding: 0 5px;
                        font-size: 14px;
                        white-space: nowrap;
                    }
                }
            }
        }
        .link {
            background-color: rgb(241, 241, 241);
            height: 7px;
            width: 100%;
        }
        .content_outer {
            background-color: #fff;
            .title_outer {
                text-align: center;
                span {
                    display: inline-block;
                    padding: 10px 0;
                    font-size: 17px;
                    color: #444444;
                    font-weight: 600;
                    font-family: "PingFangSC-Medium";
                }
                .red {
                    color: #f91e1e;
                    padding: 0;
                }
            }
            .coutent_info {
                width: 100%;
                margin-top: 10px;
                .list_outer {
                    margin-top: 20px;
                    margin-left: 24%;
                    font-size: 14px;
                    color: #444;
                    span {
                        margin-left: 16px;
                        color: #444;
                        img {
                            width: 13.2px;
                            height: 10.5px;
                        }
                    }
                }
            }
            .btn_outer {
                width: 100%;
                margin-top: 50px;
                text-align: center;
                img {
                    width: 193px;
                    height: 40px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
