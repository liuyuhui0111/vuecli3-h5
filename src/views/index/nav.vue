<template>
  <div class="nav">
    <div class="item"
    v-for="(item,index) in navlist"
    @click="emit('navclick',item)"
    :key="index">
    <span :class="item.icon"></span>
    <p>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexNav',
  data() {
    return {
      navlist: [
        {
          icon: 'icon-online',
          title: '在线课程',
          path: '/online',
        },
        {
          icon: 'icon-offline',
          title: '财税公开课',
          path: '/offline',
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    },
  },
};
</script>
<style scoped>
  .nav{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 15px;
  }
  .item{
    width: 50%;
    text-align: center;
    display: block;
    float: left;
    font-size: 14px;
  }
  .item>span{
    display: block;
    width: 55px;
    height: 55px;
    background: url('./imgs/icon-online.png') no-repeat center center;
    background-size: 55px 55px;
    margin: 15px auto 5px auto;
  }
</style>
