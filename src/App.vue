<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .ignore {
    margin: 10px; background-color: red;
  }
  .box {
    width: 180px; height: 300px;
  }
  .hairlines {
    border-bottom: 0.5px solid red;
  }
</style>
