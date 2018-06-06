<template>
	<SDialog
		v-bind="$attrs"
		v-model="dialogVisible"
	>
		<div class="s_alert">
			<div class="head">
				<slot name="head">{{title}}</slot>
			</div>
			<div class="body">
				<slot>{{msg}}</slot>
			</div>
			<div class="foot">
				<slot name="foot">
					<s-button @click="sureClicked">确定</s-button>
				</slot>
			</div>
		</div>
	</SDialog>
</template>
<script>
	import SDialog from '@/components/s-dialog/index.vue'
	import SButton from '@/components/s-button/index.vue'
	export default {
		name: 's-alert',
		model: {
			prop: 'visible',
			event: 'change'
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '标题(title)'
			},
			msg: {
				type: String,
				default: '内容(msg)'
			}
		},
		data: () => ({
			dialogVisible: false
		}),
		components: {
			SDialog,
			SButton
		},
		watch: {
			visible: function (val) {
				this.dialogVisible = val;
			},
			dialogVisible: function (val) {
				this.$emit('change', val);
				this.$emit('update:visible', val);
			}
		},
		methods: {
			sureClicked () {
				this.$emit('change', false);
				this.$emit('update:visible', false);
				this.$emit('clicked-sure');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.s_alert {
		width: 500px;
		border: 3px solid #232323;
		border-radius: 10px;
		display: inline-block;
		background-color: #FFFFFF;
		.head, .body, .foot{
			padding: 20px;
		}
	}
</style>