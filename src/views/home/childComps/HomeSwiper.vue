<template>
	<swiper class="home-swiper">
		<swiper-item v-for="item in cbanners.list" :key="item.id">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imageLoad">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from '../../../components/common/swiper/index.js'

	export default {
		name: "HomeSwiper",
		props: {
			cbanners: {
				default () {
					return []
				}
			}
		},
		data(){
			return{
				isLoad:false
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			imageLoad() {
				if (!this.isLoad) {
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}
			}
		}
	}
</script>

<style scoped>
</style>
