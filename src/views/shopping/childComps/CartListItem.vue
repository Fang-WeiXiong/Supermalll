<template>
	<div class="cart-list-item">
		<!-- {{product}} -->
		<div class="item-selector">
			<check-btn :isAcitvated="product.checked" @click.native="checkClick"/>
		</div>
		<div class="item-img">
			<img :src="product.image" alt="商品图片">
		</div>
		<div class="item-info">
			<div class="item-title">{{product.title}}</div>
			<div class="item-desc">{{product.desc}}</div>
			<div class="item-price-left">￥{{product.price}}</div>
			<div class="item-price-right">x{{product.count}}</div>
			
		</div>
	</div>
</template>

<script>
	import CheckBtn from '../../../components/content/checkBtn/CheckBtn.vue'
	export default {
		name: 'CartListItem',
		components:{
			CheckBtn
		},
		props: {
			product: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		methods:{
			checkClick(){
				this.product.checked = !this.product.checked
			}
		}
	}
</script>

<style scoped>
	.cart-list-item {
		width: 100%;
		display: flex;
		font-size: 0;
		padding: 5px;
		border-bottom: 1px solid #000;
	}

	.item-selector {
		width: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-title,
	.item-desc {
		overflow: hidden;
		white-space: nowrap;
		-ms-text-overflow: ellipsis;
		text-overflow: ellipsis;
	}

	.item-img {
		padding: 5px;
	}

	.item-img img {
		width: 70px;
		height: 100px;
		display: block;
		border-radius: 5px;
	}

	.item-info {
		font-size: 14px;
		color: #666;
		margin-top: 15px;
		width: 68%;
		position: relative;
	}

	.item-desc {
		font-size: 14px;
		color: #666;
		margin-top: 15px;
	}

	.item-bottom {
		margin-top: 10px;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
	}
	.item-price-left {
		position: absolute;
		left: 30px;
		bottom: 3px;
		color: orangered;
	}

	.item-price-right {
		position: absolute;
		left: 155px;
		bottom: 3px;
		color: orangered;
	}
</style>
