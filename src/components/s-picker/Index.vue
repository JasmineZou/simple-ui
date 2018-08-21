<template>
  <div>
    <div ref="wrapper" class="wrapper">
      <div class="content wheel-scroll">
        <div class="wheel-item cus_item" v-for="item in items">{{item}}</div>
      </div>
      <div class="panel"></div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 's-picker',
    data: () => ({
      items: [],
      pickerData: []
    }),
    created () {
      let i;
      for( i = 0;  i < 100; i++) {
        this.items.push(i);
      }
    },
    mounted() {
      let wrapper = this.$refs.wrapper;
      this.scroll = new BScroll(wrapper, {
        wheel: {
          selectedIndex: 0,
          rotate: 30,
          adjustTime: 200,
          wheelWrapperClass: 'wheel-scroll',
          wheelItemClass: 'wheel-item'
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  $baseHeight: 350px;
  $baseGup: 40px;
  $baseMargin: $baseHeight / 2 - $baseGup;
  .wrapper {
    height: $baseHeight;
    border: $base-border;
    border-radius: $base-border-radius;
    overflow: hidden;
    position: relative;
  }
  .content {
    position: relative;
    margin-top: $baseMargin;
    margin-bottom: $baseMargin;
    text-align: center;
  }
  .panel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &:before{
      content: '';
      display: block;
      width: 100%;
      height: $baseMargin;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      border-bottom: 1px solid #ddd;
    }
    &:after{
      content: '';
      display: block;
      width: 100%;
      height: $baseMargin;
      position: absolute;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      border-top: 1px solid #ddd;
    }
  }
  .cus_item {
    padding: 20px;
    font-size: 36px;
  }
</style>