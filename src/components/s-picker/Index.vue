<template>
  <div class="s-picker">
    <div class="toolbar">
      <span class="toolbar_btn">取消</span>
      <span class="toolbar_value">{{currentValue}}</span>
      <span class="toolbar_btn" @click="confirm">确定</span>
    </div>
    <div ref="wrapper" class="wrapper" v-for="data in pickerData" :style="[wrapperStyle]">
      <div class="content wheel-scroll">
        <!-- <div class="wheel-item cus_item" v-for="item in data">{{item}}</div> -->
        <s-picker-item :key="index" class="wheel-item cus_item" v-for="(item, index) in data" :item="item"></s-picker-item>
      </div>
      <div class="panel"></div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import SPickerItem from './SPickerItem.vue'
  import {
    isObject,
    isNumber,
    isString,
    isArray
  } from '@/utils/isTypeOf.js'
  export default {
    name: 's-picker',
    props: {
      pickerData: {
        type: Array,
        default: () => []
      },
      defaultValue: {
        type: Array,
        default: () => []
      },
      defaultValueIndex: {
        type: Array,
        default: () => []
      }
    },
    components: {
      SPickerItem
    },
    data: () => ({
      currentValue: '',
      scrolls: []
    }),
    methods: {
      confirm () {
        let results = [];
        if(this.scrolls.length > 0) {
          for(let i=0; i<this.scrolls.length; i++) {
            let val = this.scrolls[i].getSelectedIndex();
            let target = this.pickerData[i][val];
            results.push(target);
          }
        }
        
        this.currentValue = results.map(item => {
          if(isObject(item)){
            item = JSON.stringify(item);
          }
          return item;
        }).join(',');

        this.$emit('confirm', results)
      },
      refill () {
        let
          pickerDataLen,
          defaultValueIndexLen,
          defaultValueColumnLen,
          len
        ;
        pickerDataLen = this.pickerData.length;
        if (!pickerDataLen) return;

        defaultValueIndexLen = this.defaultValueIndex.length;
        defaultValueColumnLen = this.defaultValue.length;
        if(defaultValueIndexLen > 0) {
          len = Math.min(defaultValueIndexLen, pickerDataLen);
          for (let i=0; i<len; i++) {
            let index = this.defaultValueIndex[i];
            if(index<0) {
              index = 0;
            }
            if(index > this.pickerData[i].length) {
              index = this.pickerData[i].length - 1;
            }
            this.scrolls[i].wheelTo(index);
          }
          return;
        }

        if(defaultValueColumnLen > 0) {
          len = Math.min(defaultValueColumnLen, pickerDataLen);
          let indexArr = [];
          for (let i=0; i<len; i++) {
            let index = this.pickerData[i].indexOf(this.defaultValue[i]);
            index > -1 && this.scrolls[i].wheelTo(this.pickerData[i].indexOf(this.defaultValue[i]));
          }
          return;
        }
      },
      initScrolls () {
        let wrappers = this.$refs.wrapper;
        if(wrappers && wrappers.length > 0) {
          for (let i=0; i<wrappers.length; i++) {
            this.scrolls.push(new BScroll(wrappers[i], {
              wheel: {
                selectedIndex: 0,
                rotate: 30,
                adjustTime: 200,
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item'
              }
            }));
          }
        }
        if(this.defaultValue.length > 0) {
          this.refill();
        }
      }
    },
    mounted() {
      this.initScrolls();
    },
    computed: {
      wrapperStyle: function () {
        let width = 0;
        if(this.pickerData.length) {
          width = Math.floor (100 / this.pickerData.length)
        }
        return {
          width: `${width}%`
        }
      }
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
    flex-wrap: wrap;

    border: $base-border;
    border-radius: $base-border-radius;
    padding: $base-padding;
  }
  .toolbar {
    width: 100%;
    margin-bottom: $base-padding;
    display: flex;
    justify-content: space-between;
  }
  .toolbar_btn {
    display: inline-block;
    padding: $base-padding;
    border: $base-border;
    border-radius: $base-border-radius;
  }
  .toolbar_value {
    width: auto;
    padding: $base-padding;
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