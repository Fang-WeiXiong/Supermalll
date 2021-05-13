<template>
	<div class="goods-list">
		<goods-list-item v-for="item in cgoods" :key="item.image" :goods-item="item" />

	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'

	export default {
		name: 'GoodsList',
		components: {
			GoodsListItem
		},
		props: {
			cgoods: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style>
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		background-color: var(--color-background);
		padding: 2px;
	}
</style>
