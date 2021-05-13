import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
Vue.use(Vuex)

//创建Store对象
const store = new Vuex.Store({
	getters,
	state: {
		cartList: []
	},
	mutations: {
		addCounter(state, payload) {
			payload.count++
		},
		addToCart(state, payload) {
			payload.checked = true
			state.cartList.push(payload)
		}
	},
	actions: {
		addCart(context, payload) {
			return new Promise( resolve => {

				//payload添加新的产品
				let oldProduct = null;
				let state = context.state;
				for (let item of state.cartList) {
					if (item.iid === payload.iid) {
						oldProduct = item;
					}
				}
				//判断oldProduct
				if (oldProduct) {
					// oldProduct.count += 1
					context.commit('addCounter', oldProduct)
					resolve('当前的商品数量加一')
				} else {
					payload.count = 1
					//state.cartList.push(payload)
					context.commit('addToCart', payload)
					resolve('添加了新的商品')
				}

			})
		}
	}
})

//挂载到vue实例上
export default store
