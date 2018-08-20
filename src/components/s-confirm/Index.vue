<template>
  <s-dialog v-model="sDialogVisible" :hide-on-click-mask="hideOnClickMask">
    <div class="s-dialog">
      <div class="s-dialog_header">{{title}}</div>
      <div class="s-dialog_body">{{msg}}</div>
      <div class="s-dialog_footer"><s-button inline-block @click="close">关闭</s-button><s-button inline-block @click="handleClick">取消</s-button></div>
    </div>
  </s-dialog>
</template>
<script>
  import SDialog from '@/components/s-dialog';
  import SButton from '@/components/s-button';
  export default {
    name: 's-confirm',
    components: {
      SDialog,
      SButton
    },
    model: {
      prop: 'visible',
      event: 'change'
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      hideOnClickMask: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '弹出框'
      },
      msg: {
        type: String,
        default: '是否关闭？'
      }
    },
    methods: {
      close () {
        this.$emit('change', false);
        this.$emit('update:visible', false);
      },
      handleClick () {
        this.$emit('click');
        this.close();
      }
    },
    computed: {
      sDialogVisible: {
        get () {
          return this.visible;
        },
        set (val) {
          console.log(val)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>