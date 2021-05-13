<template>
	<div class="cart-bottom">
		<div class="check-content">
			<check-btn v-model="isCheckAll" class="check-btn" @click.native="checkAll"></check-btn>
			<span>全选</span>
		</div>
		<div class="price">付款：{{totalPrice}}</div>
		<div class="calc">付款</div>
	</div>
</template>

<script>
	import CheckBtn from '../../../components/content/checkBtn/CheckBtn.vue'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "CartBottom",
		components: {
			CheckBtn
		},
		computed: {
			...mapGetters(['cartList']),
			totalPrice() {
				return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
					return preValue + item.price * item.count
				}, 0)
			},
			isCheckAll(){
				//return  this.cartList.every(item => item.checked)
				//return !this.cartList.find(item => item.checked)
				return !(this.cartList.filter(item => !item.checked).length)
				// get: function() {
				// 	if (this.cartList.length === 0) return false
				// 	// 使用find
				// 	return !this.cartList.find(item => !item.checked)
				// },
				// set: function() {}
			}
		},
		created() {
			console.log(this.cartList);
		},
		methods: {
			checkAll() {
				if (this.isCheckAll) {
					this.cartLists.forEach(item => item.checked = false)
				} else {
					this.cartLists.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style>
	.cart-bottom {
		font-size: 13px;
		height: 40px;
		position: relative;
		bottom: -434px;
		z-index: 1000;
		line-height: 40px;
		display: flex;
		overflow: hidden;
	}

	.check-content {
		display: flex;
		/* line-height: 40px; */
		align-items: center;
		margin-left: 10px;
	}

	.check-btn {
		line-height: 20px;
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.price {
		margin-left: 10px;
	}

	.calc {
		height: 40px;
		width: 80px;
		background-color: orangered;
		text-align: center;
		color: #fff;
		position: absolute;
		right: 0;
	}
</style>
