<template>
	<div class="wrap">
		<tabletitle :name='name'  :tableData='tableData' v-on:deleData='deleData' v-on:addData='addData' v-on:modData='modData'></tabletitle>		
		<div class="content">
			<tablecontent :tableData='tableData' :show= 'show'  v-on:modData='modData'></tablecontent>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage = 'nowpage'></severPages>
		</div>
		<addModal v-on:getData='getData' :result='result' :oper='oper' :modID = 'modID':errorMsg='errorMsg'></addModal>
		<delemodal v-on:getData='getData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></delemodal>
	</div>
</template>
<script>
	import tabletitle from 'components/libs/tabletitle'
	import tablecontent from './safeplot/tablecontent'
	import addModal from './safeplot/addModal'
	import delemodal from 'components/libs/delemodal'
	import severPages from 'components/libs/severPages'

	import defendService from 'services/defendService'
	import PageData from 'libs/PageData'
	import ProtocolData from 'libs/ProtocolData'

	export default {
		components: {
			tabletitle,
			tablecontent,
			addModal,
			delemodal,
			severPages
		},
		data() {
			return {
				name: '安全策略',
				allTableData: [0],
				tableData: [],
				nowpage: 1,
				totalpage: 1, //总页数
				oper: '', //操作类型，add，del
				result: '',
				deleIds: '',
				protocal_id: [], //要删除的id数组
				errorMsg: '',
				modID:'',
				show:false
			}
		},
		mounted() {
			this.getData('')
		},
		methods: {
			getData(sentdata) {
				this.result = 'reqing'
                if(this.oper=='del'){
                	sentdata = {
                		oper:'del',
                		protocal_id : this.protocal_id,
						ids : this.deleIds
                	}              	
                }
				// defendService.getSafePolt(sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
							this.show=true
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
			deleData() {
				this.oper = 'del'
				this.result = ''
				var delArr = []
				var protocalArr = []
				var deldata = this.tableData
				$('.isCheck').each(function(index, e) {
					if($(e).prop("checked")) {
						let protocalNum = ProtocolData.key(deldata[index].protocol)
						delArr.push(deldata[index].id )
						protocalArr.push(protocalNum)
					}
				})			
				if(delArr.length) {
					this.deleIds = delArr.join(",")
					this.protocal_id = protocalArr.join(",")
					$('.deleModal-modal-lg').modal('show')
				} else {
					//没有选择删除内容
					this.popoverShow('.delebutn', "请选择要删除的内容")
				}
			},
			addData() {
				this.oper = 'add'
				this.reset()
				$('.addModal-modal-lg').modal('show')
			},
			modData(Index) {
				this.oper = 'edit'
				this.reset()
				if(Index >= 0) { //双击修改
					this.modShow(Index)
					
				} else { //input勾选修改
					this.modWhich()
				}
			},
			modWhich() {
				//获取要被修改的是哪一个	
				var checkNum = 0
				var modNum
				$('.isCheck').each(function(index, ele) {
					if($(ele).prop("checked")) {
						checkNum++
						modNum = index
					}
				})
				if(checkNum > 1) {
					this.popoverShow('.modbutn', "每次编辑一个")
				} else if(checkNum == 1) {
					this.modShow(modNum)
				} else {
					this.popoverShow('.modbutn', "请选择编辑的内容")
				}
			},
			modShow(which) {
				//获取修改的内容
				$('.addModal-modal-lg').modal('show')
				var moddata = this.tableData[which]
				this.modID = String(moddata.id)
				var protocal =ProtocolData.key(moddata.id.protocol)				
				setTimeout(function() {				
					$('.ipselect').val(protocal)
                    $('.srcIP').val(moddata.src)
                    $('.dstIP').val(moddata.dst)
                    $('.srcprot').val(moddata.sports)
                    $('.desprot').val(moddata.dports)                   
				}, 10)
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
			reset(){
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
</style>