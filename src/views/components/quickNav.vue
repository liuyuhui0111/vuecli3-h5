<template>
    <div v-show="!$route.meta.isHideQuickNav" class="quick_nav">
        <div :class="{'quick_nav_outer':true,active:showActive}">
            <div @click="showClick" class="icon-head"></div>
            <div class="item_list">
                <div @click="itemClick(v)" :key="index" v-for="(v,index) in itemData" class="item">
                    <i :class="v.icon"></i>
                    <span>{{ v.tit }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'quickNav',
  data() {
    return {
      showActive: false,
      itemData: [
        {
          icon: 'icon-home',
          tit: '首页',
          path: '/index',
        }, {
          icon: 'icon-all',
          tit: '全部课程',
          path: '/offline',
        }, {
          icon: 'icon-me',
          tit: '我的',
          path: '/my',
        },
      ],
    };
  },
  watch: {
    $route() {
      this.showActive = false;
    },
  },
  methods: {
    showClick() {
      this.showActive = !this.showActive;
    },
    // 点击导航
    itemClick(data) {
      this.$router.push({ path: data.path });
    },
  },
};
</script>
<style lang="less" scoped>
.quick_nav{
    position: fixed;
    top: 59%;
    right: 5px;
    z-index: 9999;
    transition: all .2s cubic-bezier(.645,.045,.355,1);
    div {
        box-sizing: border-box;
    }
    .quick_nav_outer{
        width: 30px;
        height: 30px;
        transition: all .2s cubic-bezier(.645,.045,.355,1);
        position: relative;
        background-color: rgba(0,0,0,.8);

        /*background: url("imgs/juxing2121213.png");*/
        /*-webkit-background-size: 100% 100%;*/
        /*background-size: 100% 100%;*/

        border-radius: 100px;
        overflow: hidden;
        &.active{
            width: 136px;
            transition: all .2s cubic-bezier(.645,.045,.355,1);

            /*border-radius: 0;*/
            /*overflow: visible;*/
            .item_list{
                padding-left: 10px;
            }
        }
        .icon-head{
            width: 30px;
            height: 30px;
            background: url("imgs/fenzu754545454545.png");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 0;
        }

        .item_list{
            width: 100%;
            padding-right: 30px;
            padding-left: 30px;
            color: #fff;
            display: flex;
            overflow: hidden;
            transition: all .2s cubic-bezier(.645,.045,.355,1);
            .item{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                &:nth-child(2){
                    width: 40px;
                }
                i{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                }
                .icon-home{
                    background: url("imgs/fenzu78787767.png") no-repeat center;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                }
                .icon-all{
                    background: url("imgs/fenzu32323234.png") no-repeat center;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                }
                .icon-me{
                    background: url("imgs/fenzu·2·2·2·1.png") no-repeat center;
                    -webkit-background-size: 100%;
                    background-size: 100%;
                }
                span{
                    font-size:12px;
                    -webkit-text-size-adjust:none;
                    white-space: nowrap;
                    transform: scale(0.7);
                }
            }
        }
    }
}
</style>
