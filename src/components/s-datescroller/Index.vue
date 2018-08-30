<template>
  <div class="s-datescroller">
    <div class="selected_value">
      <div></div>
    </div>
    <div class="field_label_wrapper">
      <div class="field_label">年</div>
      <div class="field_label">月</div>
      <div class="field_label">日</div>
    </div>
    <s-scroll
      ref="scroller-year"
      :height="height"
      class="scroller"
      show-overflow
      >
      <div
        ref="doms-year"
        class="base_item"
        :id="`year-${item}`"
        :key="item"
        v-for="item in yearArr">
        {{item}}
      </div>
    </s-scroll>
    <s-scroll
      ref="scroller-month"
      :height="height"
      class="scroller"
      show-overflow
      >
      <div
        ref="doms-month"
        class="base_item"
        v-for="item in monthArr"
        :id="`month-${item}`"
        :key="item">
        {{item}}
      </div>
    </s-scroll>
    <s-scroll
      ref="scroller-date"
      :height="height"
      class="scroller"
      showOverflow
      >
      <div
        ref="doms-date"
        class="base_item"
        :id="`date-${item}`"
        :key="item"
        v-for="item in dateArr">
        {{item}}
      </div>
    </s-scroll>
  </div>
</template>
<script>
  import SScroll from '@/components/s-scroll';

  const SMALL_MONTH = 30;
  const BIG_MONTH = 31;
  const SMALL_SPECILE_MONTH = 28;
  const BIG_SPECILE_MONTH = 29;

  function isLeapYear(year) {
    year = parseInt(year, 10);
    let flag1 = year % 4 === 0 && year % 100 !== 0;
    let falg2 = year % 100 === 0 && year % 400 === 0;
    if(flag1 || falg2) {
      return true;
    }
    return false;
  }

  export default {
    name: 's-datescroller',
    props: {
      year: [String, Number],
      height: {
        type: Number,
        default: 300
      },
      rotate: Boolean
    },
    data: () => ({
      scroll: '',
      selected: {
        year: '',
        month: '',
        date: ''
      },
      yearArr: [],
      monthArr: [],
      dateArr: []
    }),
    components: {
      SScroll
    },
    methods: {
      init() {
        let originDate = new Date();
        let y = originDate.getFullYear();
        let m = originDate.getMonth() + 1;
        let d = originDate.getDate();
        let maxOriginDate = new Date();
        let minOriginDate = new Date();

        minOriginDate.setMonth(-12 * 30 + 7);
        minOriginDate.setDate(1);

        maxOriginDate.setMonth(12 * 30 + 8);
        maxOriginDate.setDate(0);

        let startYear = minOriginDate.getFullYear();
        let endYear = maxOriginDate.getFullYear();
        for(let i = startYear; i<=endYear; i++) {
          this.yearArr.push(i)
        }

        for(let i=1; i<=12; i++) {
          // this.monthArr.push(i < 10 ? `0${i}` : `${i}`);
          this.monthArr.push(i);
        }

        for(let i=1; i<=30; i++) {
          // this.dateArr.push(i < 10 ? `0${i}` : `${i}`);
          this.dateArr.push(i);
        }
      },
      scrollToItem(type, value) {
        let targetDoms = this.$refs[`doms-${type}`];
        if(!targetDoms) return;

        let target = targetDoms.find((item) => {
          if(item.getAttribute('id') === `${type}-${value}`) {
            return item;
          }
        })
        if(!target) return;
        let distance = 0 - target.offsetTop;
        
        if(!this.$refs[`scroller-${type}`].scroll) return;
        this.$refs[`scroller-${type}`].scroll.scrollTo(0, distance, 700);
      }
    },
    mounted () {
      this.init();
      // this.$nextTick(() => {
        
      // });
      // this.scrollToItem('year', 2018);
      // this.scrollToItem('month', 12);
      // this.scrollToItem('date', 20);
    }
  }
</script>
<style lang="scss" scoped>
  .s-datescroller {
    border: $base-border;
    border-radius: $base-border-radius;
    display: flex;
    align-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .scroller {
    width: 30%;
    text-align: center;
    border: none;
    padding: 0;
  }
  .base_item {
    padding: 10px;
    font-size: 36px;
  }
  .selected_value {
    width: 100%;
    height: 60px;
    background-color: pink;
  }
  .field_label_wrapper {
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: space-between;
  }
  .field_label {
    width: 30%;
    text-align: center;
    font-size: 36px;
  }
</style>