<template>
	<SDialog
		v-bind="$attrs"
		v-model="sDialogVisible"
	>
		<Snipper></Snipper>
	</SDialog>
</template>
<script>
	import SDialog from '@/components/s-dialog'
	import Snipper from '@/components/snipper'
	export default {
		name: 's-loading',
		model: {
			prop: 'visible',
			event: 'change'
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			sDialogVisible: false
		}),
		components: {
			SDialog,
			Snipper
		},
		watch: {
			visible: function (val) {
				this.sDialogVisible = this.visible;
			},
			sDialogVisible: function (val) {
				this.$emit('change', val);
				this.$emit('update:visible', val);
			}
		}
	}
</script>
<style scoped>
	
</style>