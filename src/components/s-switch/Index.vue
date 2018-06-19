<template>
	<div
		class="s-switch"
		:class="[
			{ 'close': value },
			{ 'disabled': disabled}
		]"
		@click="clicked"
	>
		<div class="s-switch_inner_back"></div>
		<div class="s-switch_inner-btn">{{!stateText ? '' : value ? '开' : '关'}}</div>
	</div>
</template>
<script>
	export default {
		name: 's-switch',
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			value: {
				type: Boolean,
				required: true
			},
			disabled: {
				type: Boolean,
				default: false	
			},
			stateText: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			clicked () {
				this.$emit('click')
				!this.disabled && this.$emit('change', !this.value)
				!this.value && this.$emit('open')
				this.value && this.$emit('close')
			}
		},
	}
</script>
<style lang="scss" scoped>
	$switchHeight: 50px;
	$switchWidth: 80px;
	$innerBtnWidth: $switchHeight;
	.s-switch {
		display: inline-block;
		font-size: $base-font-size;
		border-radius: $base-border-radius;
		border: $base-border;
		background-color: $base-bc-color;
		height: $switchHeight;
		width: $switchWidth;
		position: relative;
	}
	.s-switch_inner-btn {
		$w: 40px;
		width: $w;
		height: $w;
		background-color: #232323;
		border-radius: $base-border-radius;
		position: absolute;
		top: 3px;
		left: 4px;
		transition: left .3s, background-color .5s;
		font-size: $base-font-size;
		color: #FFFFFF;
		line-height: $w;
		text-align: center;
	}
	.s-switch_inner_back {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: #232323;
		transform: scale(0);
		opacity: 0;
		transition: transform .3s, opacity .5s;
	}
	.close {
		.s-switch_inner-btn {
			left: 32px;
			background-color: #FFFFFF;
			color: #232323;
		}
		.s-switch_inner_back {
			transform: scale(1);
			opacity: 1;
		}
	}
	.disabled {
		@include disabled;
	}
</style>