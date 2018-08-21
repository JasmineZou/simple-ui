<template>
  <div class="s-picker">
    <div ref="wrapper" class="wrapper" v-for="data in pickerData">
      <div class="content wheel-scroll">
        <!-- <div class="wheel-item cus_item" v-for="item in data">{{item}}</div> -->
        <s-picker-item class="wheel-item cus_item" v-for="item in data" :item="item"></s-picker-item>
      </div>
      <div class="panel"></div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import SPickerItem from './SPickerItem.vue'
  export default {
    name: 's-picker',
    props: {
      pickerData: {
        type: Array,
        default: () => []
      }
    },
    components: {
      SPickerItem
    },
    data: () => ({
    }),
    mounted() {
      let wrappers = this.$refs.wrapper;
      if(wrappers && wrappers.length > 0) {
        for (let i=0; i<wrappers.length; i++) {
          this.scroll = new BScroll(wrappers[i], {
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
    },
    computed: {

    }
  }
</script>
<style lang="scss" scoped>
  $baseHeight: 350px;
  $baseGup: 40px;
  $baseMargin: $baseHeight / 2 - $baseGup;
  .s-picker {
    display: flex;
    align-content: center;
    justify-content: space-around;
  }
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