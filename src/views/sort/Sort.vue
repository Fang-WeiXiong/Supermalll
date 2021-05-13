<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<ul>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
				<li>400</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"

	export default {
		name: "Sort",
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			//1.创建scroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				observeDOM: true,
				click: true,
			})
		}
	}
</script>

<style>
</style>
