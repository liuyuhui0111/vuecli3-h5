<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  watch: {
    isShowLoading() {
      if (this.isShowLoading) {
        this.$loading();
      } else {
        this.$loading().close();
      }
    },
  },
  mounted() {
    // console.log(this.$route.meta.keepAlive);
  },

};
</script>

<style>

#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
