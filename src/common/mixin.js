import {debounce} from './utlis.js'

export const itemListenerMixin = {
	mounted(){
		const refresh = debounce(this.$refs.scroll.refresh, 100)
		this.itemImgListener =() =>{
			refresh()
		}
		this.$bus.$on('itemImgLoad',this.itemImgListener)
	}
}