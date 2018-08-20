<template>
  <div class="helloworld">
    <p>
      <s-input
        label="密码"
        placeholder="密码"
        :label-width="50"
        v-model="value"
        type="password"
        @input="sayHello"
      />
      {{value}}
    </p>

    
    <p>
      <s-select
        label="单选下拉列表"
        placeholder="这是一个单选列表"
        v-model="value2"
        @change="selectChanged"
        :options="selectOptions"
        hide-after-selected
        skin="label"
      ></s-select>
      {{value2}}
    </p>


    <p>
      <s-button
        @click="handleClick"
      >
        按钮
      </s-button>
    </p>

    <p>
      <radio
        :options="options"
        v-model="value3"
        @change="selectChanged"
        @click-item="handleClick"
        :disabled-item="[1, 2, 3]"
        slide-left
        wave
        multi
      ></radio>
      {{value3}}
    </p>

    <p>
      <s-switch
        v-model="value4"
        @open="switchOpen"
        @close="switchClose"
      />
      {{value4}}
    </p>


    
    <p>
      s-dialog
      <s-dialog v-model="sDialogVisible" hide-on-click-mask>
        <div class="s-dialog">
          <div class="s-dialog_header">弹出框</div>
          <div class="s-dialog_body">是否关闭？</div>
          <div class="s-dialog_footer"><s-button inline-block @click="sDialogVisible = false">关闭</s-button><s-button inline-block @click="handleClick">取消</s-button></div>
        </div>
      </s-dialog>
      <s-switch
        v-model="sDialogVisible"
      />
      {{sDialogVisible}}
    </p>

    <p>
      s-confirm
      <s-confirm
        v-model="sConfirmVisible"
      ></s-confirm>
      <s-switch
        v-model="sConfirmVisible"
      />
    </p>

    <p>
      <s-alert  :visible.sync="sAlertVisible" hide-on-click-mask></s-alert>
      <s-switch
        v-model="sAlertVisible"
      />
      {{sAlertVisible}}
    </p>

    <p>
      <s-loading  :visible.sync="sLoadingVisible"></s-loading>
      <s-switch
        v-model="sLoadingVisible"
        @click="closeLoadingAfterTime(3000)"
      />
      {{sLoadingVisible}}
    </p>

    <p>
      <s-scroll empty-msg="啥也没有 o(╯□╰)o">
        <!-- <div v-for="i in selectOptions">{{i}}</div> -->
      </s-scroll>
    </p>
  </div>
</template>

<script>
import SInput from '@/components/s-input';
import SSelect from '@/components/s-select';
import SButton from '@/components/s-button';
import Radio from '@/components/radio';
import SSwitch from '@/components/s-switch';
import SDialog from '@/components/s-dialog';
import SConfirm from '@/components/s-confirm';
import SAlert from '@/components/s-alert';
import SLoading from '@/components/s-loading';
import SScroll from '@/components/s-scroll';
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
    SSwitch,
    SDialog,
    SAlert,
    SLoading,
    SScroll,
    SConfirm
  },
  data () {
    return {
      value: 'helloworld',
      value2: 'value2',
      selectOptions: selectOptions,
      options: options,
      value3: 'value3',
      value4: false,
      sDialogVisible: false,
      sConfirmVisible: false,
      sAlertVisible: false,
      sLoadingVisible: false
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
    },
    closeLoadingAfterTime (time) {
      setTimeout(() => {
        this.sLoadingVisible = false;
      }, time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body{
    overflow: hidden;
  }
  
  .helloworld>p{
    border-bottom: 3px dashed #232323;
    padding: 20px;
  }
</style>
