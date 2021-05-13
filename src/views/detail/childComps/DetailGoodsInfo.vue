<template>
	<div class="goodsInfo" v-if="Object.keys(detailInfo).length !== 0">

		<div class="info-desc clear-fix">
			<div class="start"></div>
			<div class="desc">{{ detailInfo.desc }}</div>
			<div class="end"></div>
		</div>

		<div class="image-detail" v-for="(item,index) in detailInfo.detailImage" :key="index">
			<p>{{ item.key }}</p>
			<img v-lazy="imgItem" alt="" v-for="(imgItem, index) in item.list" :key="index" @load="imagesLoad" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
		props: {
			detailInfo: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				imageNumber: 0,
			};
		},
		methods: {
			imagesLoad() {
				// 每一次图片加载完成就让 imageNumber加一 当imageNumber和图片数量一致时发送事件
				if (++this.imageNumber === this.imageNumber) {
					// 图片加载完发送请求到父组件
					this.$emit("detailImagesLoad");
				}
			}
		},
		watch: {
			detailInfo() {
				this.imageNumber = this.detailInfo.detailImage[0].list.length
			}
		}
	}
</script>

<style>
	.desc {
		padding: 15px;
		font-size: 13px;
	}

	.image-detail {
		margin-bottom: 20px;
	}

	.image-detail p {
		font-size: 24px;
		padding-left: 15px;
		margin-bottom: 15px;
	}

	.image-detail img {
		width: 100%;
		vertical-align: middle;
	}
</style>
