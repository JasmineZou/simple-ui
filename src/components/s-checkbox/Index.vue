<template>
	<div class="s-checkbox" :class="{active: disabled}" @click="hanleCheck(value)">
		 <span v-if="isDefault"><i class="iconfont" v-if="check">&#xe62d;</i> <i v-else class="iconfont" >&#xe61a;</i></span>
		 <span v-else><slot></slot></span>
		 <span class="title">{{title}}</span>
	</div>
</template>
<script>
	export default {
		name: 's-checkbox',
		props: {
			disabled: {
				type: Boolean,
				default: () => false
			},
			isDefault: {
				type: Boolean,
				default: () => true
			},
			title: {
				type: String,
				default: () => "复选框一"
			},
			checked: {
				type: Boolean,
				default: () => true
			},
			value: [Number, String, Object],
			onChange: {
				type: Function,
				default: (value) => {
					console.log(value)
				}
			},
		},
		data: function () {
			return {
				check: this.checked
			}
		},
		methods: {
			hanleCheck: function(e){
				if (this.disabled) {
					return;
				}
				this.check = !this.check;
				this.onChange(e);
			}
		}
	}
</script>
<style lang="scss" scoped>
  .s-checkbox.active{
		color: #999;
	}
	.s-checkbox .iconfont{
		font-size: 40px;
		vertical-align: bottom;
	}
	.iconfont.active {

	}
	.s-checkbox .title {
		padding-left: 5px;
	}

</style>