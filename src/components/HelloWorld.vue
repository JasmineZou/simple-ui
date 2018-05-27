<template>
  <div>
    <s-input
      placeholder="密码"
      label="密码:"
      :label-width="50"
      label-position="left"
      label-align="right"
      v-model="value"
    />
    {{value}}
  </div>
</template>

<script>
import SInput from '@/components/s-input';
export default {
  name: 'HelloWorld',
  components: {
    SInput
  },
  data () {
    return {
      value: 'helloworld'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
