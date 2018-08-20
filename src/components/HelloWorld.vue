<template>
  <div class="helloworld">
    <cp-box title="s-input">
      <s-input
        label="密码"
        placeholder="密码"
        :label-width="50"
        v-model="value"
        type="password"
        @input="sayHello"
      />
      {{value}}
    </cp-box>

    
    <cp-box title="s-select">
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
    </cp-box>


    <cp-box title="s-button">
      <s-button
        @click="handleClick"
      >
        按钮
      </s-button>
    </cp-box>

    <cp-box title="radio">
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
    </cp-box>

    <cp-box title="s-switch">
      <s-switch
        v-model="value4"
        @open="switchOpen"
        @close="switchClose"
      />
      {{value4}}
    </cp-box>


    
    <cp-box title="s-dialog">
      <s-dialog
        :visible.sync="sDialogVisible"
        hide-on-click-mask>
        <div class="s-dialog">
          <div class="s-dialog_header">弹出框</div>
          <div class="s-dialog_body">是否关闭？</div>
          <div class="s-dialog_footer"><s-button inline-block @click="sDialogVisible = false">关闭</s-button><s-button inline-block @click="handleClick">取消</s-button></div>
        </div>
      </s-dialog>
      <s-switch
        v-model="sDialogVisible"
      />
      sDialogVisible:{{sDialogVisible}}
    </cp-box>

    <cp-box title="s-confirm">
      <s-confirm
        :visible.sync="sConfirmVisible"
        hide-on-click-mask
      ></s-confirm>
      <s-switch
        v-model="sConfirmVisible"
      />
      sConfirmVisible:{{sConfirmVisible}}
    </cp-box>

    <cp-box title="s-alert">
      <s-alert
        :visible.sync="sAlertVisible"
        hide-on-click-mask
        title="this is a title"
        msg="this is a msg"
      ></s-alert>
      <s-switch
        v-model="sAlertVisible"
      />
      sAlertVisible:{{sAlertVisible}}
    </cp-box>

    <cp-box title="s-loading">
      <s-loading  :visible.sync="sLoadingVisible"></s-loading>
      <s-switch
        v-model="sLoadingVisible"
        @click="closeLoadingAfterTime(2000)"
      />
      sLoadingVisible:{{sLoadingVisible}}
    </cp-box>

    <cp-box title="s-scroll">
      <s-scroll
        empty-msg="啥也没有 o(╯□╰)o"
        :scroll-click="true">
        <s-button
          style="margin-bottom: 5px;"
          v-for="({label, value}, index) in selectOptions"
          :key="value"
          @click="handleClick">
          {{label}}
        </s-button>
      </s-scroll>
    </cp-box>

    <cp-box title="s-popover">
      <s-popover
        :visible.sync="sPopoverVisible"
        hide-on-click-mask
        bottom
        :width="100"
        >
        <div style="background-color: #FFFFFF; box-shadow: 0 0 3px 3px rgba(0, 0, 0, .5); margin: 10px;">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, similique. Dolorem molestiae sequi fugiat repellendus qui voluptatem, magni dicta asperiores a, excepturi. Voluptate reprehenderit praesentium quo sunt, illo ab alias.
        </div>
      </s-popover>
      <s-switch
        v-model="sPopoverVisible"
      />
    </cp-box>
  </div>
</template>

<script>
import CpBox from '@/components/CpBox.vue';
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
import SPopover from '@/components/s-popover';
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
    SConfirm,
    CpBox,
    SPopover
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
      sLoadingVisible: false,
      sPopoverVisible: false
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
</style>
