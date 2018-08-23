<template>
  <div class="s-picker">
    <div class="s-picker-value" @click.self="visible = true">
      {{currentValue||'请选择'}} <span class="cha" @click.self.prevent="clear"></span>
    </div>
    <s-popover v-bind="$attrs" :bottom="bottom" :visible.sync="visible">
      <div class="s-picker-panel">
        <div class="toolbar" v-if="showCurrentValue && currentValue">
          <span class="toolbar_value">{{currentValue}}</span>
        </div>
        <div class="labels">
          <div class="label" v-for="label in labels" :style="[wrapperStyle]">
            {{label}}
          </div>
        </div>
        <div ref="wrapper" class="wrapper" v-for="data in pickerData" :style="[wrapperStyle]">
          <div class="content wheel-scroll">
            <s-picker-item :key="index" class="wheel-item cus_item" v-for="(item, index) in data" :item="item"></s-picker-item>
          </div>
          <div class="panel"></div>
        </div>
        <div class="btn_wrapper">
          <s-button @click="cancel" class="block">取消</s-button>
          <s-button @click="clear" class="block">重置</s-button>
          <s-button @click="confirm" class="block">确定</s-button>
        </div>
      </div>
    </s-popover>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import SPickerItem from './SPickerItem.vue'
  import SPopover from '@/components/s-popover'
  import SButton from '@/components/s-button'
  import {
    isObject,
    isNumber,
    isString,
    isArray
  } from '@/utils/isTypeOf.js'
  export default {
    name: 's-picker',
    model: {
      prop: 'value',
      event: 'confirm'
    },
    props: {
      value: {
        type: null
      },
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
      },
      splitor: {
        type: String,
        default: ','
      },
      labels: {
        type: Array,
        default: () => []
      },
      bottom: {
        type: Boolean,
        default: true
      },
      showCurrentValue: Boolean,
      autoSelect: Boolean
    },
    components: {
      SPickerItem,
      SPopover,
      SButton
    },
    data: () => ({
      currentValue: this.value,
      currentValueArr: [],
      scrolls: [],
      visible: false
    }),
    methods: {
      clear() {
        this.currentValue = "";
        this.$emit('confirm', '')
      },
      cancel() {
        this.visible = false;
      },
      confirm (option = {close: true}) {
        let results = [];
        if(this.scrolls.length > 0) {
          for(let i=0; i<this.scrolls.length; i++) {
            let val = this.scrolls[i].getSelectedIndex();
            let target = this.pickerData[i][val];
            results.push(target);
          }
        }
        this.currentValueArr = results;
        this.currentValue = results.map(item => {
          if(isObject(item)){
            item = JSON.stringify(item);
          }
          return item;
        }).join(this.splitor);
        this.$emit('confirm', results)
        // this.$emit('change', this.currentValue);
        if(option.close) {
          this.visible = false;
        }
      },
      refill () {
        let
          pickerDataLen,
          defaultValueIndexLen,
          defaultValueColumnLen,
          len
        ;
        pickerDataLen = this.pickerData.length;

        /*如果*/
        if(this.currentValueArr.length > 0) {
          for (let i=0; i<this.currentValueArr.length; i++) {
            let index = this.pickerData[i].indexOf(this.currentValueArr[i]);
            index > -1 && this.scrolls[i].wheelTo(index);
          }
          this.$emit('confirm', this.currentValueArr);
          return;  
        }

        if (!pickerDataLen) return;

        defaultValueIndexLen = this.defaultValueIndex.length;
        defaultValueColumnLen = this.defaultValue.length;
        if(defaultValueIndexLen > 0) {
          len = Math.min(defaultValueIndexLen, pickerDataLen);
          let valueResultArr = [];
          for (let i=0; i<len; i++) {
            let index = this.defaultValueIndex[i];
            if(index<0) {
              index = 0;
            }
            if(index > this.pickerData[i].length) {
              index = this.pickerData[i].length - 1;
            }
            this.scrolls[i].wheelTo(index);
            valueResultArr.push(this.pickerData[i][index]);
          }
          this.$emit('confirm', valueResultArr)
          return;
        }

        if(defaultValueColumnLen > 0) {
          len = Math.min(defaultValueColumnLen, pickerDataLen);
          let indexArr = [];
          let valueResultArr = [];
          for (let i=0; i<len; i++) {
            let index = this.pickerData[i].indexOf(this.defaultValue[i]);
            index > -1 && this.scrolls[i].wheelTo(index);
            valueResultArr.push(this.defaultValue[i]);
          }
          this.$emit('confirm', valueResultArr);
          return;
        }
      },
      initScrolls () {
        let wrappers = this.$refs.wrapper;
        if(wrappers && wrappers.length > 0) {
          for (let i=0; i<wrappers.length; i++) {
            let instance = new BScroll(wrappers[i], {
              wheel: {
                selectedIndex: 0,
                rotate: 30,
                adjustTime: 0,
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item'
              }
            });
            if(this.autoSelect) {
              instance.on('scrollEnd', () => {
                this.confirm({
                  close: false
                });
              });
            }
            this.scrolls.push(instance);
          }
        }
        if(this.defaultValue.length > 0) {
          this.refill();
        }
      },
      destroyScrolls() {
        if(this.scrolls.length > 0) {
          this.scrolls.forEach((item) => {
            item.destroy();
            item = null;
          })
          this.scrolls = [];
        }
      }
    },
    mounted() {
      let
        iLen = this.defaultValueIndex.length,
        iArr = this.defaultValueIndex,
        vLen = this.defaultValue.length,
        vArr = this.defaultValue,
        pLen = this.pickerData.length,
        minLen = iLen ? (Math.min(iLen, pLen)) : (Math.min(vLen, pLen)),
        resultArr = []
      ;

      /*defaultValueIndex 根据默认选中值下标来选取默认值*/
      if(iLen && minLen) {
        for(let i=0; i<minLen; i++) {
          /*iArr[i]是pickerData[i]的元素下标*/
          /*
            iArr: [2, 1]

            pickerData: [
              [1, 2, 3],
              ['a', 'b', 'c']
            ]

            pickerData[1][iArr[1]] => pickerData[1][1] => 'b'
          */
          resultArr.push(this.pickerData[i][iArr[i]]);
        }
        this.$emit('confirm', resultArr)
        this.currentValue = resultArr.map(item => {
          if(isObject(item)){
            item = JSON.stringify(item);
          }
          return item;
        }).join(this.splitor);
        return;
      }

      /*defaultValue 根据默认选中值的值来选取默认值*/
      if(vLen && minLen) {
        for(let i=0; i<minLen; i++) {
          let index = this.pickerData[i].indexOf(this.defaultValue[i]);
          if(index > -1) {
            resultArr.push(this.defaultValue[i]);  
          } else {
            resultArr.push('');
          }
        }
        this.$emit('confirm', resultArr);
        this.currentValue = resultArr.map().join(this.splitor);
      }
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
    },
    watch: {
      visible: function (val) {
        if(val) {
          this.$nextTick(() => {
            this.initScrolls();
          })
        } else {
          this.destroyScrolls();
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $baseHeight: 350px;
  $baseGup: 40px;
  $baseMargin: $baseHeight / 2 - $baseGup;


  .s-picker-value {
    border: $base-border;
    border-radius: $base-border-radius;
    padding: $base-padding;
  }

  .s-picker-panel {
    display: flex;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: $base-bc-color;
    border: $base-border;
    border-radius: $base-border-radius;
    padding: $base-padding;
  }
  .toolbar {
    width: 100%;
    margin-bottom: $base-padding;
    display: flex;
    justify-content: center;
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
  .labels {
    width: 100%;
    display: flex;
    .label {
      padding: $base-padding;
    }
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

  .btn_wrapper {
    padding-top: $base-padding;
    display: flex;
    width: 100%;
    justify-content: space-between;
    .s-button {
      width: 33%;
    }
  }

  .cha {
    @include baseIcon();
    background-image: url(../../assets/cha.svg);
    float: right;
  }
</style>