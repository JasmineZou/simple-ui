<template>
  <div class="cp-box">
    <div class="title" v-if="title">{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'cp-box',
    props: {
      title: String
    }
  }
</script>
<style lang="scss" scoped>
  .cp-box {
    width: 100%;
    border-bottom: 3px dashed #232323;
    padding: 20px;
  }
  .title {
    font-size: 36px;
    padding: 5px;
  }
</style>