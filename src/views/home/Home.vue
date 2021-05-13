<template>
	<div id="home">
		<nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
		<tab-control :titles="['流行', '新款', '精选']" ref="tabControl1" @tabClick="tabClick" class="tab-control"
			v-show="isTabFixed" />
		<scroll class="ccontent" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
			@pullingUp="loadMore">
			<home-swiper :cbanners="banners" @swiperImageLoad="swiperImageLoad" />
			<recommend-view :crecommends="recommends" />
			<feature-view />
			<tab-control :titles="['流行', '新款', '精选']" ref="tabControl2" @tabClick="tabClick" />
			<goods-list :cgoods="goods[currentType].list" />
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop" />

	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'

	import NavBar from '../../components/common/navbar/NavBar.vue'
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import BackTop from '../../components/content/backTop/BackTop.vue'
	import Scroll from '../../components/common/scroll/Scroll.vue'

	import {
		getHomeMultidata,
		getHomeGoods
	} from '../../network/home.js'
	// import {
	// 	debounce
	// } from '../../common/utlis.js'
	import {itemListenerMixin} from "../../common/mixin.js"
	
	export default {
		name: "Home",
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			BackTop,
			Scroll,
		},
		mixins: [itemListenerMixin],
		data() {
			return {

				banners: [],
				recommends: [],
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					}
				},
				currentType: 'pop',
				isShowBackTop: false,
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0,
				itemImgListener: null
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			},
		},
		activated(){
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.refresh()
		},
		deactivated(){
			this.saveY = this.$refs.scroll.scroll.y
			
			this.$bus.$off("itemImgLoad",this.itemImgListener)
		},
		created() {
			//1.请求多个首页数据
			this.getHomeMultidata()

			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')

		},
		mounted() {
			// 1.图片加载完成得监听
			// const refresh = debounce(this.$refs.scroll.refresh, 50)
			
			// this.itemImgListener =() => {
			// 	refresh()
			// }
			// this.$bus.$on('itemImgLoad', this.itemImgListener)

		},

		methods: {
			/* 事件监听相关的方法 */
			tabClick(index) {

				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick() {
				this.$refs.scroll.scrollTo(0, 0)
			},
			contentScroll(position) {
				this.isShowBackTop = (-position.y) > 1000

				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore() {
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad() {
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},

			/* 网络请求相关的方法 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {

					this.banners = res.data.data.banner;
					this.recommends = res.data.data.recommend
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.data.list)
					this.goods[type].page += 1
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			},
		}
	}
</script>

<style>
	#home {
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	}

	.tab-control {
		position: relative;
		z-index: 9;
	}

	.ccontent {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
