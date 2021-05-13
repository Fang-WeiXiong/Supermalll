<template>
	<div class="shopping">
		<!-- 导航 -->
		<nav-bar class="home-nav">
			<template v-slot:center>购物({{cartLength}})</template>
		</nav-bar>
		<scroll class="cart-scroll">
			<div>
				<!-- 商品列表 -->
				<cart-list />
			</div>
		</scroll>
		<!-- 底部汇总 -->
		<cart-bottom />
	</div>
</template>

<script>
	import CartList from './childComps/CartList.vue'
	import CartBottom from './childComps/CartBottom.vue'

	import NavBar from '../../components/common/navbar/NavBar.vue'
	import Scroll from '../../components/common/scroll/Scroll.vue'

	import {
		mapGetters
	} from 'vuex'

	export default {
		name: "Shopping",

		components: {
			NavBar,
			CartList,
			CartBottom,
			Scroll
		},
		computed: {
			...mapGetters(['cartLength', 'cartList'])
			// ...mapGetters({
			// 	length:'cartLength',
			// 	list: 'cartList'
			// })
		}
	}
</script>

<style>
	.shopping {
		height: 100vh;
		position: relative;
	}

	.cart-scroll {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 89px;
		left: 0;
		right: 0;
	}
</style>
