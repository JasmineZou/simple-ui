<template>
	<div class="wrapper">
		<div class="loading_wrapper">
			<div class="loading_three"></div>
			<div class="loading_two"></div>
			<div class="loading_one"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'snipper'
	}
</script>
<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}
	.wrapper {
		padding: 50px;
		overflow: hidden;
	}
	.loading_wrapper {
		position: relative;
	}
	$loadingWidth: 30px;
	.loading_one {
		$w: $loadingWidth;
		$m: $w/2;
		position: absolute;
		left: 50%;
		top: 50%;
		width: $w;
		height: $w;
		margin-left: -$m;
		margin-top: -$m;
		border-radius: 50%;
		background-color: #232323;
	}
	.loading_two {
		$w: $loadingWidth * 3;
		$m: $w/2;
		position: absolute;
		left: 50%;
		top: 50%;
		width: $w;
		height: $w;
		margin-left: -$m;
		margin-top: -$m;
		border: 6px solid #232323;
		border-radius: 50%;
		border-top-color: transparent;
		border-bottom-color: transparent;
		animation: ring 1s linear infinite;
	}
	.loading_three {
		$w: $loadingWidth + 15px;
		$m: $w/2;
		position: absolute;
		left: 50%;
		top: 50%;
		width: $w;
		height: $w;
		margin-left: -$m;
		margin-top: -$m;
		border-radius: 50%;
		background-color: #FFF;
		animation: bunding 1s linear infinite alternate;
		border: 1px solid #232323;
	}

	@keyframes ring {
		from {
			-webkit-transform: rotateZ(0deg);
		}
		to {
			-webkit-transform: rotateZ(360deg);	
		}
	}

	@keyframes bunding {
		from {
			-webkit-transform: scale(.7);
			border: 1px solid #FFFFFF;
		}
		to {
			-webkit-transform: scale(1.2);
			border: 1px solid #232323;
		}
	}
</style>