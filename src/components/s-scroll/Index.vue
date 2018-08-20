<template>
  <div class="s-scroll">
    <div ref="wrapper" class="wrapper" :style="[{height: wrapperHeight}]">
      <div class="content">
        <slot>{{emptyMsg}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
  import {getVh} from '@/utils/px2vw.js';
  import BScroll from 'better-scroll';
  export default {
    name: 's-scroll',
    props: {
      height: {
        type: Number,
        default: 100
      },
      emptyMsg: {
        type: String,
        default: 'empty-msg: empty'
      },
      scrollClick: {
        type: Boolean
      }
    },
    data: () => ({
      scroll: '',
      domShow: false
    }),
    computed: {
      wrapperHeight: function () {
        if(this.height) {
          let vh = getVh(this.height);
          return vh
        } else {
          return 'auto';
        }
      }
    },
    methods: {
      initScroll () {
        if(this.scroll) {
          return;
        }
        this.$nextTick(() => {
          let wrapperDom = this.$refs.wrapper;
          this.scroll = new BScroll(wrapperDom, {
            click: this.scrollClick
          })
        })
      }
    },
    mounted () {
      this.initScroll();
    },
    destroy() {
      if(this.scroll) {
        this.scroll.destroy();
      }
      this.scroll = null;
    }
  }
</script>
<style lang="scss" scoped>
.s-scroll {
  border: $base-border;
  border-radius: $base-border-radius;
  padding: $base-padding;
}
.wrapper {
  overflow: hidden;
}
.content {
}
</style>