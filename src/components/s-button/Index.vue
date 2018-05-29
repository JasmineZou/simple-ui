<template>
	<div class="s-button" :class="[c_waveClass, {'inline': inline, 'inline-block': inlineBlock}]">
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
			},
			inline: {
				type: Boolean,
				default: false
			},
			inlineBlock: {
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
	
</style>