<template>
  <div>
    {{label}}
    {{$_label}}
  </div>
</template>
<script>
  import {
    isArray,
    isString,
    isObject,
    isNumber
  } from '@/utils/isTypeOf'
  export default {
    name: 's-picker-item',
    props: {
      item: {
        type: [Object, String, Number],
        default: ''
      }
    },
    data: () => ({
      label: '',
      value: ''
    }),
    computed: {
      $_label: function () {
        let _self = this;
        if(isObject(this.item)) {
          return this.item.label;
        }
        return this.item;
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>