<template>
	<div>
		<input type="text" class="s_input">
	</div>
</template>
<script>
	export default {
		name: 's-input',
	}
</script>
<style scoped lang="scss">
	.s_input {
		@include input-mixin
	}
</style>