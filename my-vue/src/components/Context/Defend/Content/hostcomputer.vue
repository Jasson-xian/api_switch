<template>
	<div class="wrap">
		<bwTitle :name='name' :tableData='tableData' v-on:deleData='deleData' v-on:addData='addData' ></bwTitle>
		<div class="content">
			<tablecontent  :tableData='tableData' :nowpage='nowpage' :show='show'></tablecontent>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage = 'nowpage'></severPages>
		</div>
		<addModal v-on:getData='getData' :result='result' :oper='oper' :errorMsg='errorMsg'></addModal>
		<delemodal v-on:getData='getData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></delemodal>
	</div>
</template>
<script>
	import bwTitle from 'components/libs/bwTitle'
	import tablecontent from './hostcomputer/tablecontent'
	import addModal from './hostcomputer/addModal'
	import delemodal from 'components/libs/delemodal'
	import severPages from 'components/libs/severPages'

	import defendService from 'services/defendService'
	import PageData from 'libs/PageData'
	export default {
		components: {
			bwTitle,
			tablecontent,
			addModal,
			delemodal,
			severPages
		},
		data() {
			return {
				name: '蜜罐主机',
				allTableData: [],
				tableData: [],
				totalpage: 1, //总页数
				nowpage: 1,
				oper: '', //操作类型，add，del				
				deleIds: [], //要删除的id数组	
				errorMsg: '',
				result: '',
				show:false
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.result = 'reqing'
				//设置传参
				var sentdata = {
					oper: this.oper,
				}
				switch(this.oper) {
					case 'add':
						sentdata.ip = $('.hostIP').val()
						sentdata.vport = $('.vport').val()
						sentdata.rport = $('.hostport').val()
						break;
					case 'del':
						sentdata.ids = this.deleIds
						break;
					default:
						break;
				}
				//请求
				// defendService.getHostComputer(sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
							this.show = true
							this.result = 'ok'
							this.allTableData = []
							this.totalpage = new PageData([], 29).totalpage
							if(this.oper=='add'){
								this.nowpage = this.totalpage
							}
							this.getPageData(this.nowpage ) //分页
					// 	} else {
					// 		this.result = 'error'
					// 		this.errorMsg = String(recvdata.errorMessage)
					// 	}
					// })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				var allData = this.allTableData
				this.tableData = new PageData(allData, 29).data(this.nowpage)
				if(this.tableData==''&&this.nowpage>1){//当前页为空
					this.nowpage--
					this.tableData = new PageData(allData, 29).data(this.nowpage)
				}
			},
			addData() {
				this.oper = 'add'
				this.reset()
			},		
			deleData() {
				this.oper = 'del'
				this.result = ''
				var delArr = []
				$('.isCheck').each(function(index, e) {
					if($(e).prop("checked")) {
						var macNum = $('.idNum').eq(index).html()
						delArr.push(macNum)
					}
				})
				if(delArr.length) {
					this.deleIds = delArr.join(",")
					$('.deleModal-modal-lg').modal('show')
				} else {
					//没有选择删除内容
					this.popoverShow('.delebutn', "请选择要删除的内容")
				}
			},
			popoverShow(ele, content) {
				$(ele).attr({
					'data-toggle': 'popover',
					'data-content': content
				})
				$(ele).popover('show')
				setTimeout(function() {
					$(ele).popover('destroy')
				}, 1000)
			},
			reset() {
				this.result = ''
				this.errorMsg = ''
				$('.modal input').val('')
				$('.modal textarea').val('')
				$('.mi').css('color', '#d2d2d2')
				$('.modal input').css('border', '1px solid #e8e8e8')
				$('.notice').hide()
			}
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
	}
	
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	
	h3 {
		line-height: 30px;
		display: inline-block;
	}
	
	.content {
		margin-top: 20px;
		padding: 0 20px;
		height: 795px;
	}
	
	.butn {
		display: inline-block;
		float: right;
	}
	
	.butn li {
		display: inline-block;
		margin: 5px 25px 0px 0px;
		cursor: pointer;
	}
	
	.butn span {
		color: #FFFFFF;
		vertical-align: middle;
	}
	
	.butn img {
		margin: 0 5px;
	}
	
	.content {
		padding: 0 20px;
	}
	
	input[type=checkbox] {
		width: 12px;
		height: 12px;
	}
</style>