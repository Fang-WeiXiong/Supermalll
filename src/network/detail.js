import {
	request
} from './request.js'

export function getDetail(iid) {
	return request({
		url: './detail/',
		params: {
			iid
		}
	})
}

export function getRecommend(){
	return request({
		url:'./recommend'
	})
}

export class Goods {
	constructor(itemInfo, columns, service) {
		this.title = itemInfo.title;
		this.desc = itemInfo.desc;
		this.newPrice = itemInfo.price;
		this.oldPrice = itemInfo.oldPrice;
		this.discount = itemInfo.discountDesc;
		this.columns = columns;
		this.services = service;
		this.realPrice = itemInfo.lowNowPrice;
	}
}



class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

const p = new Person('why', 18)
console.log(p.name);
