<template>
	<div class="check-btn" :class="{check: isAcitvated}">
		<img src="../../../assets/img/shopping/tick.svg" alt="">
	</div>
</template>

<script>
	export default{
		naem:"CheckBtn",
		props:{
			isAcitvated:{
				type: Boolean,
				default: true
			}
		}
	}
	
</script>

<style scoped>
	.check-btn{
		
		border-radius: 50%;
		border: 1px solid;
		border-color: gray;
	}
	
	.check{
		border-color: red;
		background-color: orangered;
	}
	
</style>
