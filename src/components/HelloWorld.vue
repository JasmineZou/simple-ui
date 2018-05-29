<template>
  <div class="helloworld">
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
    <s-button
      @click="handleClick"
    >
      按钮
    </s-button>
    <radio
      :options="options"
      v-model="value3"
      @change="selectChanged"
      slide-left
      wave
      multi
    ></radio>
    <p>{{value3}}</p>
    <s-switch
      v-model="value4"
      @open="switchOpen"
      @close="switchClose"
    />
    <p>{{value4}}</p>
  </div>
</template>

<script>
import SInput from '@/components/s-input';
import SSelect from '@/components/s-select';
import SButton from '@/components/s-button';
import Radio from '@/components/radio';
import SSwitch from '@/components/s-switch';
let selectOptions = [];
while(selectOptions.length <50) {
  selectOptions.push({
    label: `label-${selectOptions.length}`,
    value: `value-${selectOptions.length}`
  });
}

let options = [];
while(options.length < 5) {
  options.push({
    label: `label-${options.length}`,
    value: `value-${options.length}`
  });
}

export default {
  name: 'HelloWorld',
  components: {
    SInput,
    SSelect,
    SButton,
    Radio,
    SSwitch
  },
  data () {
    return {
      value: 'helloworld',
      value2: 'value2',
      selectOptions: selectOptions,
      options: options,
      value3: 'value3',
      value4: false
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    },
    selectChanged () {
      console.log('selectChanged')
    },
    switchOpen () {
      console.log('打开')
    },
    switchClose () {
      console.log('关闭')
    },
    handleClick () {
      console.log('点击了')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body{
    overflow: hidden;
  }
  .helloworld>div, .helloworld>p{
    margin-bottom: 20px;
  }
</style>
