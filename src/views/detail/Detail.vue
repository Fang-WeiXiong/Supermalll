<template>
	<div class="detail">
		<detail-nav-bar @titleClick="titleClick" ref="detailNavBar" />
		<scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages" />
			<detail-base-info :goods="goodsInfo" />
			<detail-shop-info :shop="shopInfo" />
			<detail-goods-info :detailInfo="detailInfo" @detailImagesLoad="detailImagesLoad" />
			<detail-param-info ref="params" :paramInfo="itemParams" />
			<detail-comment-info ref="comment" :commentInfo="commentInfo" />
			<goods-list class="detail-goods-list" ref="recommends" :cgoods="recommends" />
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop" />
		<toast :message="meassage" :show="show"/>
		<detail-bottom-bar @addCart="addToCart" />
	</div>

</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import BackTop from '../../components/content/backTop/BackTop.vue'
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import Toast from '../../components/common/toast/Toast.vue'
	import {
		getDetail,
		Goods,
		getRecommend
	} from '../../network/detail.js'
	import {
		itemListenerMixin
	} from "../../common/mixin.js"
	
	

	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			GoodsList,
			BackTop,
			Scroll,
			Toast
		},
		mixins: [itemListenerMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goodsInfo: {},
				shopInfo: {},
				detailInfo: {},
				itemParams: {},
				commentInfo: {},
				recommends: [],
				itemImgListener: null,
				themeTopYs: [],
				getThemeTopY: null,
				currentIndex: 0,
				isShowBackTop: false,
				meassage: '',
				show: false
			}
		},
		created() {
			this.iid = this.$route.params.iid
		
			getDetail(this.iid).then(res => {

				//1.获取数据
				const data = res.data.result;
				console.log(res);
				//2.取出轮播图的数据
				this.topImages = data.itemInfo.topImages

				//3.创建商品的对象
				this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

				//4.取出商品的对象
				this.shopInfo = data.shopInfo

				//5.取出详细的信息
				this.detailInfo = data.detailInfo

				//6.取出参数的信息
				this.itemParams = data.itemParams

				//7.取出评论信息
				this.commentInfo = data.rate.list[0]

			})

			//3.请求推荐数据
			getRecommend().then(res => {

				this.recommends = res.data.data.list
			})
		},

		mounted() {},

		destroyed() {
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},

		methods: {
			
			detailImagesLoad() {
				//获取各个部分距离顶部的高度
				this.themeTopYs = [];
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
			},
			
			titleClick(index) {
				this.$refs.scroll.scrollTo(0, (-this.themeTopYs[index]), 300)
			},
			
			contentScroll(position) {
				//滚动切换到对应的顶部栏的
				const positionY = -position.y
				const length = this.themeTopYs.length
				for (let i in this.themeTopYs) {
					i = i * 1;
					if (this.currentIndex !== i &&
						((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
							(i === length - 1 && positionY > this.themeTopYs[i]))) {
						this.currentIndex = i;
						this.$refs.detailNavBar.currentIndex = this.currentIndex
					}
				}
				//toTop按钮显示时的高度
				this.isShowBackTop = (-position.y) > 1000
			},
			
			backClick() {
				this.$refs.scroll.scrollTo(0, 0)
			},
			
			addToCart() {
				//1.获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goodsInfo.title;
				product.desc = this.goodsInfo.desc;
				product.price = this.goodsInfo.realPrice;
				product.iid = this.iid;
				
				//2.将商品添加到购物车
				//console.log(product);
				//this.$store.commit('addCart',product)
				
				this.$store.dispatch('addCart',product).then(res =>{
					this.show = true;
					this.meassage = res;
					setTimeout(()=>{
						this.show = false;
						this.meassage = null;
					},1500)
					console.log(res);
				})
			}
		}
	}
</script>

<style>
	.detail {
		height: 100vh;
		background-color: #fff;
		position: relative;

		z-index: 1;
	}

	.detail-content {
		background-color: #fff;
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 54px;
		left: 0;
		right: 0;
	}
</style>
