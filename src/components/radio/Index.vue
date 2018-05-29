<template>
	<div class="radio" :class="{disabled: disabled}">
		<div
			class="radio-item"
			:class="[
				{ 'wave': wave },
				{ 'disabled': itemDisabled.indexOf(index) > -1}
			]"
			v-for="(item, index) in options"
			@click="itemClick(item, index)"
		>
			{{item.label}}
			<transition :name="`slide-${direction}`">
				<span class="append" v-show="item.value === value || value.indexOf && value.indexOf(item.value) != -1">
					<slot>
						<div class="radio-item_icon s-icon inline-block selected_icon"></div>	
					</slot>
				</span>
			</transition>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'radio',
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			value: {
				type: [Number, String, Array],
				required: true
			},
			label: {
				type: String,
				default: null
			},
			options: {
				type: [Array, Object],
				default: () => {
					return []
				},
				required: true
			},
			multi: {
				type: Boolean,
				default: false
			},
			slideLeft: {
				type: Boolean,
				default: false
			},
			wave: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			disabledItem: {
				type: [Array],
				default: null
			}
		},
		directives: {
			dItemDisabled: {
				bind (el, {value}) {
					console.log(value)
				},
				componentUpdated (el, {value}) {
					console.log('dItemDisabled', this.disabledItems)
				}
			}
		},
		data: () => ({
			currentIndex: '',
			oldIndex: '',
			disabledItems: []
		}),
		computed:{
			direction () {
				if(this.slideLeft) {
					return 'left';
				}
				if(this.currentIndex < this.oldIndex) {
					return 'up';
				}
				if(this.currentIndex > this.oldIndex) {
					return 'down';
				}
			},
			itemDisabled () {
				return this.disabledItem;
			}
		},
		methods: {
			isItemDisabled (item, index) {
				if(this.disabledItem.indexOf(index) !== -1) {
					return true;
				}
				return false;
			},
			itemClick (item, index) {
				if(this.disabled || this.isItemDisabled(item, index)) {
					return;
				}
				this.oldIndex = this.currentIndex;
				this.currentIndex = index;
				let arr = [];
				if(this.multi) {
					if(Array.isArray(this.value)) {
						for(let i=0; i<this.value.length; i++) {
							arr[i] = this.value[i];
						}
					}
					let targetIndex = arr.indexOf(item.value);
					if(targetIndex !== -1) {
						arr.splice(targetIndex, 1);
					}
					if(targetIndex === -1) {
						arr.push(item.value);
					}
				}
				this.$emit('change', this.multi ? arr : item.value);
				this.$emit('item-click', item);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.radio {
		font-size: $base-font-size;
		border: $base-border;
		border-radius: $base-border-radius;
		&-item {
			padding: $base-padding;
		}
	}
	.append{
		display: inline-block;
		float: right;
	}
	.selected_icon {
		background-image: url('../../assets/gou.svg');
	}
	.radio-item_icon{
		$w: 30px;
		display: block;
		background-position: 50%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: $w;
		height: $w;
	}
	.slide-down-enter{
		transform: translateY(-150%);
		opacity: 0;
	}
	.slide-down-enter-to{
		transform: translateY(0);
		opacity: 1;
	}
	.slide-down-enter-active, .slide-down-leave-active {
		transition: transform .3s, opacity .3s;
	}
	.slide-down-enter-active{
		transition-delay: .2s;
	}
	.slide-down-leave-to{
		transform: translateY(150%);
		opacity: 0;	
	}

	.slide-up-enter{
		transform: translateY(150%);
		opacity: 0;
	}
	.slide-up-enter-to{
		transform: translateY(0);
		opacity: 1;
	}
	.slide-up-enter-active, .slide-up-leave-active{
		transition: transform .3s, opacity .15s;
	}
	.slide-up-enter-active{
		transition-delay: .2s;
	}
	.slide-up-leave-to{
		transform: translateY(-150%);
		opacity: 0;	
	}

	.slide-left-enter, .slide-left-leave-to{
		transform: translateX(50%);
		opacity: 0;
	}
	.slide-left-enter-to{
		transform: translateX(0);
		opacity: 1;
	}
	.slide-left-enter-active, .slide-left-leave-active {
		transition: transform .3s, opacity .15s;
	}
	.radio-item {
		box-sizing: border-box;
		&.disabled {
			text-decoration: line-through;
			opacity: .5;
		}
	}
</style>