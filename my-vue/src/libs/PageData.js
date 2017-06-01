export default class PageData {
	//
	// @param {Array} _li 原始数据 
	// @param {Number} col 每页显示条数
	//
	constructor(_li, col) {
		this._li = _li
		this.column = col
		this.totalpage = Math.ceil(this._li.length / this.column)
	}

	// @param {Number} page 页码
	data(page) {
		if(!Array.isArray(this._li) || page > Math.ceil(this._li.length / this.column) || page < 1) {
			return []
		}

		let i = this.column * (page - 1)

		return this._li.slice(i, i + this.column)

	}

}