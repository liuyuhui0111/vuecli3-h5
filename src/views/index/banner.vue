<template>
  <div class="banner common-index-banner">
    <div class="swiper-container swiper-banner">
      <template v-if="list.length==1">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
          v-for="(item,index) in list"
           :index="index"
          :key="index">
                <baseImg
                :width="960"
                :height="304"
                :lazy="lazy"
                @click="swiperClick(item)"
                :src="item.pic?item.pic:defaultUrl"
                :alt="item.title">
              </baseImg>
          </div>
        </div>
      </template>
      <template v-if="list.length>1">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
          v-for="(item,index) in list"
           :index="index"
          :key="index">
                <baseImg
                :width="960"
                :height="304"
                :lazy="lazy"
                @click="swiperClick(item)"
                :src="item.pic?item.pic:defaultUrl"
                :alt="item.title">
              </baseImg>
          </div>
        </div>
        <div class="swiper-pagination"  slot="pagination">
            <span v-for="(item,index) in list"
            :key="index"></span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
require('@/plugins/swiper/swiper.min');

export default {
  name: 'banner',
  data() {
    return {
      name: 'banner',
      defaultUrl: '',
      lazy: false,
      swiperOption: {
        autoplay: {
          delay: 3000,
          // disableOnInteraction: false,
        }, // 自动播放
        loop: true, // 循环播放
        pagination: { // 分页
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  props: {
    list: { // 轮播图数据
      type: Array,
      default: () => [],
    },
  },
  methods: {
    init() {
      this.defaultUrl = `${this.publicPath}banner.png`;
      this.$nextTick(() => {
        /*eslint-disable*/ 
        if(this.list.length>1){
          this.mySwiper = new Swiper('.swiper-banner', this.swiperOption);
        }
      });
    },
    swiperClick(swiperItem) {
      if (swiperItem.url) {
        // 如果存在href 跳转
        window.location.href = swiperItem.url;
      }
    },
  },
};
</script>
<style scoped>

</style>
