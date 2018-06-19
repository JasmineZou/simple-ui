<template>
	<div style="position: relative;">
		<transition name="fade">
			<div class="s-mask" v-show="visible" @click="hide"></div>
		</transition>
		<transition name="fade-scale">
			<div class="s-dialog-content" v-show="visible" @click="hide">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		name: 's-dialog',
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
			}
		},
		methods: {
			hide () {
				if(this.hideOnClickMask) {
					this.$emit('change', false)
					this.$emit('update:visible', false)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.s-mask {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(255, 255, 255, .8);
		z-index: 1000;
	}
	.s-dialog-content {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: table;
		margin: auto;
		width: 100%;
		text-align: center;
		overflow: hidden;
		z-index: 5000;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
	.fade-enter-to, .fade-leave{
		opacity: 1;
	}
	.fade-enter-active, .fade-leave-active{
		transition: opacity .3s;
	}
	.fade-scale-enter {
		opacity: 0;
		transform: scale3d(1.5, 1.5, 1.5);
	}
	.fade-scale-leave-to {
		opacity: 0;
		transform: scale3d(0.5, 0.5, 0.5);
	}
	.fade-scale-enter-to, .fade-scale-leave{
		opacity: 1;
		transform: scale3d(1, 1, 1);
	}
	.fade-scale-enter-active, .fade-scale-leave-active{
		transition: opacity .3s, transform .3s;
	}
</style>