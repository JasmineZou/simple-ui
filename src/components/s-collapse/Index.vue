<template>
	<div class="s-collapse">
		<div class="title-name" @click="handleClick">
			<div v-if="title">{{title}}</div>
			<slot v-else name='title'></slot>
			<!-- <transition name="fade"> -->
				<div>
					<span v-if="rightTitle">{{rightTitle}}</span>
					<i v-if="expand" class="iconfont expand">&#xe730;</i>
					<i v-else class="iconfont expand">&#xe733;</i>
				</div>
			
			<!-- </transition> -->
		</div>
		<div v-if="expand" class="content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: 's-collapse',
		props: {
			title: [String, Number],
			rightTitle: [String, Number],
		},
		data: function () {
			return {
				expand: false
			}
		},
		methods: {
			handleClick: function() {
				this.expand = !this.expand;
			}
		}
		
	}
</script>
<style lang="scss" scoped>
	.s-collapse {
		border-top: 1px solid #ddd;
		padding: 0 15px;
	}
	.title-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
	}
	.iconfont.expand {
		font-size: 36px;
		margin-left: 5px;
	}
	.content {
		padding: 10px 0px;
		border-top: 1px dashed #ddd;
		font-size: 26px;
		color: #999;
	}
	// .fade-enter, .fade-leave-to{
	// 	transform-origin:center center;
  //   transform: rotate(0deg); //返回原点
  //   -webkit-transform: rotate(0deg);
  //   -moz-transform: rotate(deg);
  //   -ms-transform: rotate(0deg);
  //   -o-transform: rotate(0deg);
	// }
	// .fade-enter-to, .fade-leave{
	// 	transform-origin:center center; //旋转中心要是正中间 才行
  //   transform: rotate(180deg);
  //   -webkit-transform: rotate(180deg);
  //   -moz-transform: rotate(180deg);
  //   -ms-transform: rotate(180deg);
  //   -o-transform: rotate(180deg);
	// }
	// .fade-enter-active, .fade-leave-active{
	// 	transition: transform .3s;
  //   -moz-transition: -moz-transform .3s;
  //   -o-transition: -o-transform .3s;
	// 	-ms-transition: -ms-transform .3s;
	// 	 -webkit-transition: -webkit-transform .3s;
	// }
</style>