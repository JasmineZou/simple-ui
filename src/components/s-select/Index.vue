<template>
	<div class="s-select" v-click-outside="onClickOutside">
		<s-input
			v-bind="$attrs"
			:value="c_inputValue"
			@input="currentValueChangedHandler($event)"
			@click="optionsVisible = !optionsVisible"
		></s-input>
		<transition name="fade">
			<div v-show="optionsVisible" ref="scroller" :style="[c_scrollerStyle]" class="s-select-ui_wrapper">
				<div class="no_options" v-if="options.length == 0">
					{{emptyMsg}}
				</div>
				<ul class="s-select-ul scroller-content">
					<li class="s-select-li" v-for="(item, index) in options" @click="itemClicked(item)">{{item.label}}</li>
				</ul>
				<div class="btn_close" @click="optionsVisible = false">
					<div class="btn_close_arr"></div>
				</div>
			</div>			
		</transition>
	</div>
</template>
<script>
	import SInput from '@/components/s-input';
	import bscroll from 'bscroll';
	import clickOutside from '@/directives/click-outside';
	export default {
		name: 's-select',
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			value: {
				type: [String, Number],
				default: null
			},
			listHeight: {
				type: [String, Number],
				default: '200px'
			},
			options: {
				type: Array,
				default: function () {
					return []
				}
			},
			emptyMsg: {
				type: String,
				default: '无数据'
			},
			skin: {
				type: String,
				default: 'label'
			},
			hideAfterSelected: {
				type: Boolean,
				default: false
			}
		},
		directives: {
			clickOutside
		},
		components: {
			SInput
		},
		data: () => ({
			scroll: null,
			optionsVisible: false
		}),
		computed: {
			c_scrollerStyle: function () {
				let styleobj = {};
				if (typeof this.listHeight === 'number') {
					styleobj.height = `${this.listHeight}px`;
				}
				if(typeof this.listHeight === 'string' && /px$/.test(this.listHeight)) {
					styleobj.height = `${this.listHeight}`;
				}
				return styleobj;
			},
			c_inputValue: function () {
				if(this.skin === 'label') {
					let target = this.options.find(item => {
						if (item.value === this.value) {
							return true;
						}
					})
					return target ? target.label : this.value;
				}
				return this.value;
			}
		},
		methods: {
			currentValueChangedHandler (val) {
				this.$emit('change', val)
			},
			itemClicked (item) {
				this.$emit('change', item.value);
				if(this.hideAfterSelected) {
					this.optionsVisible = false;
				}
			},
			initScroller () {
				this.scroll = new bscroll(this.$refs.scroller, {
					click: true
				});	
			},
			onClickOutside () {
				this.optionsVisible = false;
			}
		},
		mounted () {
			this.initScroller
		},
		updated () {
			if(!this.scroll) {
				this.initScroller();
			} else {
				this.scroll.refresh();
			}
		},
		destroy () {
			if(this.scroll) {
				this.scroll.destroy();
				this.scroll = null;
			}
		}
	}
</script>
<style lang="scss" scoped>
	$closeBtnHeight: 50px;
	.s-select {
		position: relative;
	}
	.s-select-ui_wrapper {
		@include base-style
		margin-top: 10px;
		overflow: hidden;
		position: absolute;
		background-color: #ffffff;
		left: 0;
		right: 0;
		top: 100%;
		z-index: 1000;
		.no_options{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.btn_close {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: $closeBtnHeight;
			box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
			display: flex;
			align-items: center;
			justify-content: center;
			background: #ffffff;
			.btn_close_arr {
				$btnW: 15px;
				width: 0;
				height: 0;
				border-bottom: $btnW solid #ddd;
				border-top: $btnW solid transparent;
				border-left: $btnW solid transparent;
				border-right: $btnW solid transparent;
				margin-top: -10px;
			}
		}
	}

	.s-select-ul {
		padding: $base-padding;
		list-style: none;
		padding-bottom: $closeBtnHeight + $base-padding;
	}
	.s-select-li {
		font-size: $base-font-size;
		line-height: $base-font-size * 2;
		border-bottom: 1px solid #ddd;
		&:last-child{
			border-bottom: none;
		}
	}

	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
	.fade-enter-to, .fade-leave {
		opacity: 1;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
</style>
