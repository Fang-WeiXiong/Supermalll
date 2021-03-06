export function debounce(func, delay) {
	let timer = null

	return function(...args) {
		if (timer) {
			clearTimeout(timer)
		}

		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

export function dataFormat(value, format) {
	let o = {
		"M+": value.getMonth() + 1,
		"d+": value.getDate(),
		"h+": value.getHours(),
		"m+": value.getMinutes(),
		"s+": value.getSeconds(),
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o) {
			if (new RegExp(`(${k})`).test(format)) {
				format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
					.length)))
			}
		}
		return format;
	}
}
