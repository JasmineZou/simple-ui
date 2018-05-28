<template>
	<div class="s-button" :class="[c_waveClass]">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 's-button',
		props: {
			wave: {
				type: Boolean,
				default: true
			},
			outWave: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			c_waveClass: function () {
				if(this.outWave) {
					return 'out-wave';
				}
				if(this.wave) {
					return 'wave';
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.s-button {
		padding: $base-padding;
		border: $base-border;
		font-size: $base-button-font-size;
		text-align: center;
		border-radius: $base-border-radius;
	}
	.wave {
		position: relative;
		overflow: hidden;
		&:after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			background-image: radial-gradient(circle, rgba(0, 0, 0, .5) 10%, transparent 10.1%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition: transform .3s, opacity .5s;
		}
		&:active:after{
			opacity: .3;
			transform: scale(0, 0);
			transition: 0s;
		}
	}
	.out-wave {
		position: relative;
		overflow: visible;
		&:focus{
			outline: none;
		}
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: -10px;
			right: -10px;
			bottom: -10px;
			left: -10px;
			pointer-events: none;
			box-shadow: 0 0 5px 1px rgba(0, 0, 0, 1);
			border-radius: $base-border-radius;
			background-repeat: no-repeat;
			background-position: 50%;
			opacity: 0;
			transition: all .3s;
		}
		&:active:after {
			content: '';
			opacity: 1;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transition: 0s;
		}
	}
</style>