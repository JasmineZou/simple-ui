<template>
  <div style="position: relative;">
    <transition name="fade">
      <div class="s-mask" v-if="visible" @click="hide"></div>
    </transition>
    <transition :name="transitionName">
      <div
        class="s-popover-content"
        :class="[{left: left, right: right, bottom: bottom, top: top}]"
        v-if="visible"
        :style="contentStyle"
        >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  import { getVw, getVh } from '@/utils/px2vw.js';
  export default {
    name: 's-popover',
    model: {
      prop: 'visible',
      event: 'change'
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      hideOnClickMask: {
        type: Boolean,
        default: false
      },
      left: Boolean,
      top: Boolean,
      right: Boolean,
      bottom: Boolean,
      width: [Number, String],
      height: [Number, String]
    },
    methods: {
      hide () {
        if(this.hideOnClickMask) {
          this.$emit('change', false)
          this.$emit('update:visible', false)
        }
      }
    },
    computed: {
      contentStyle: function () {
        let styleObj = {};
        if(this.height) {
          if(typeof this.height === 'string') {
            styleObj.height = this.height;
          } else {
            styleObj.height = getVh(this.height);
          }
        }
        if(this.width) {
          if(typeof this.width === 'string') {
            styleObj.width = this.width;
          } else {
            styleObj.width = getVh(this.width);
          }
        }
        return styleObj;
      },
      transitionName: function () {
        if(this.left) return 'slide-from-left';
        if(this.right) return 'slide-from-right';
        if(this.top) return 'slide-from-top';
        if(this.bottom) return 'slide-from-bottom';
        return 'fade-scale';
      }
    }
  }
</script>
<style lang="scss" scoped>
  .s-mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, .8);
    z-index: 1000;
  }
  .s-popover-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: table;
    margin: auto;
    width: 100%;
    text-align: center;
    overflow: hidden;
    z-index: 5000;
    @mixin pos ($top, $right, $bottom, $left) {
      top: $top;
      right: $right;
      bottom: $bottom;
      left: $left;
    }
    &.left {
      @include pos(0, auto, 0, 0);
      width: auto;
    }
    &.right {
      @include pos(0, 0, 0, auto);
      width: auto;
    }
    &.top {
      @include pos(0, 0, auto, 0);
      height: auto;
    }
    &.bottom {
      @include pos(auto, 0, 0, 0);
      height: auto;
    }
  }

  /* fade */
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-to, .fade-leave{
    opacity: 1;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade-scale-enter {
    opacity: 0;
    transform: scale3d(1.5, 1.5, 1.5);
  }
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
  }
  .fade-scale-enter-to, .fade-scale-leave{
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  .fade-scale-enter-active, .fade-scale-leave-active{
    transition: opacity .3s, transform .3s;
  }

  /* slide */
  @mixin slide-from ($position) {
    .slide-from-#{$position}-enter {
      opacity: 0;
      @if $position == 'left' {
        transform: translateX(-100%);
      }
      @if $position == 'right' {
        transform: translateX(100%);
      }
      @if $position == 'top' {
        transform: translateY(-100%);
      }
      @if $position == 'bottom' {
        transform: translateY(100%);
      }
    }
    .slide-from-#{$position}-leave-to {
      opacity: 0;
      @if $position == 'left' {
        transform: translateX(-100%);
      }
      @if $position == 'right' {
        transform: translateX(100%);
      }
      @if $position == 'top' {
        transform: translateY(-100%);
      }
      @if $position == 'bottom' {
        transform: translateY(100%);
      }
    }
    .slide-from-#{$position}-enter-to, .slide-from-#{$position}-leave{
      opacity: 1;
      transform: translate(1);
    }
    .slide-from-#{$position}-enter-active, .slide-from-#{$position}-leave-active{
      transition: opacity .3s, transform .3s;
    }
  }
  @include slide-from ('left');
  @include slide-from ('right');
  @include slide-from ('top');
  @include slide-from ('bottom');
</style>