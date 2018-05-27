<template>
	<div>
		<div
			v-if="label"
			class="s_input_label"
			:style="[
				c_labelWidth,
				c_labelPosition
			]"
		>
			{{label}}
		</div>
		<div :style="[c_wrapperStyle]">
			<input
				class="s_input"
				:class="[{'lines': c_styleType}]"
				v-bind="$attrs"
				:value="value"
				v-on="inputListeners">
		</div>
		
	</div>
</template>
<script>
	import getVw from '@/utils/px2vw.js'
	import {getVh} from '@/utils/px2vw.js'
	export default {
		name: 's-input',
		props: {
			value: {
				type: [String, Number],
				default: null
			},
			label: {
				type: String,
				default: null
			},
			labelWidth: {
				type: [String, Number],
				default: null
			},
			labelPosition: {
				type: String,
				default: null
			},
			labelAlign: {
				type: String,
				default: null
			},
			styleType: {
				type: String,
				default: null
			}
		},
		computed: {
			c_labelWidth: function () {
				let styleObj = {};
				if( typeof this.labelWidth === 'number') {
					styleObj.width = `${this.labelWidth}px`;
					// let vw = getVw(this.labelWidth);
					// styleObj.width = vw;
				}
				if( typeof this.labelWidth === 'string' && /px$/.test(this.labelWidth)) {
					styleObj.width = `${this.labelWidth}`;
				}
				return styleObj;
			},
			c_labelPosition: function () {
				let styleObj = {};
				switch(this.labelPosition) {
					case 'left':
						styleObj.float = 'left'
					break;
					case 'right':
						styleObj.float = 'right'
					break;
					case 'top':
					break;
					case 'bottom':
					break;
				}
				styleObj.textAlign = this.labelAlign;
				return styleObj;
			},
			c_wrapperStyle: function () {
				let styleObj = {};
				switch(this.labelPosition) {
					case 'left':
						styleObj.paddingLeft = this.c_labelWidth.width
					break;
					case 'right':
						styleObj.paddingRight = this.c_labelWidth.width
					break;
					case 'top':
					break;
					case 'bottom':
					break;
				}
				return styleObj;
			},
			c_styleType: function () {
				if(this.styleType === 'lines') {
					return true;
				}
			},
			inputListeners: function () {
	      var vm = this
	      return Object.assign({},
	        this.$listeners,
	        {
	          input: function (event) {
	            vm.$emit('input', event.target.value)
	          }
	        }
	      )
	    }
		}
	}
</script>
<style scoped lang="scss">
	.s_input {
		@include input-mixin
		&.lines {
			border: none;
		}
	}
	.s_input_label{
		@include label
	}
</style>