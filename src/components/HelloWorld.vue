<template>
  <div>
    <s-input
      label="密码"
      placeholder="密码"
      :label-width="50"
      v-model="value"
      type="password"
      @input="sayHello"
    />
    <p>{{value}}</p>
    <s-select
      label="单选下拉列表"
      placeholder="这是一个单选列表"
      v-model="value2"
      @change="selectChanged"
      :options="selectOptions"
      hide-after-selected
      skin="label"
    ></s-select>
    <p>{{value2}}</p>
  </div>
</template>

<script>
import SInput from '@/components/s-input';
import SSelect from '@/components/s-select';
let selectOptions = [];
while(selectOptions.length <50) {
  selectOptions.push({
    label: `label-${selectOptions.length}`,
    value: `value-${selectOptions.length}`
  });
}
export default {
  name: 'HelloWorld',
  components: {
    SInput,
    SSelect
  },
  data () {
    return {
      value: 'helloworld',
      value2: 'value2',
      selectOptions: selectOptions
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    },
    selectChanged () {
      console.log('selectChanged')

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
