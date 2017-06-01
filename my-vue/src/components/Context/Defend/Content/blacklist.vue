<template>
	<div class="wrap">
		<bwTitle :name='name' :tableData='tableData' v-on:deleData='deleData' v-on:addData='addData'></bwTitle>
		<div class="content">
			<bwTable :show = 'show' class='tablewrap' :tableData='tableData' :nowpage='nowpage' :onepage = 'onepage' :name='name'></bwTable>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></severPages>
			<p>注: 对于系统内部主机，一般配置MAC地址黑名单，对于系统外部主机，一般配置IP地址黑名单</p>
		</div>
		<bwAddmodal v-on:getSetData='getSetData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></bwAddmodal>
		<bwDelemodal v-on:getSetData='getSetData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></bwDelemodal>
	</div>
</template>
<script>
	import bwTitle from 'components/libs/bwTitle'
	import bwTable from 'components/libs/bwTable'
	import bwAddmodal from 'components/libs/bwAddmodal'
	import bwDelemodal from 'components/libs/bwDelemodal'
	import severPages from 'components/libs/severPages'
	
	import realTimeService from 'services/realTimeService'
	import PageData from 'libs/PageData'
	export default {
		components: {
			bwTitle,
			bwTable,
			bwAddmodal,
			bwDelemodal,
			severPages
		},
		data() {
			return {
				name: '黑名单',
				allTableData: [],
				tableData: [],
				nowpage: 1,
				onepage:27,
				totalpage: 0, //总页数
				oper: '', //操作类型，add，del
				deleIds: '', //要删除的id			
				result: '',
				errorMsg: '',
				show:false
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				var sentdata = {
					black: true
				}
				// realTimeService.getBlackList(sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
							this.show = true
							this.allTableData = []							
							this.totalpage = new PageData([], 27).totalpage
							if(this.oper=='add'){
								this.nowpage = this.totalpage
							}
								this.getPageData(this.nowpage)						
					// 	}
					// })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				var allData = this.allTableData
				this.tableData = new PageData(allData, 27).data(this.nowpage)
				if(this.tableData==''&&this.nowpage>1){//当前页内容为空
					this.nowpage--
					this.tableData = new PageData(allData, 27).data(this.nowpage)
				}
			},
			getSetData() {
				this.result = 'reqing'
				var sentdata = {
					black: true, //黑名单					
					oper: this.oper,
				}
				switch(this.oper) {
					case 'add':
						let ip = this.ipVal('.addip')
						let mac = this.macVal('.addmac')
						sentdata.mac = ip?ip:mac
	                    let reasonVal = $('.reason').val()					
						if(reasonVal){
							sentdata.reason = reasonVal
						}
						break;
					case 'del':
						sentdata.mac = this.deleIds
						break;
					default:
						break;
				}
				realTimeService.setBlackList(sentdata)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success == true) {
							this.result = 'ok'
							this.getData()
						} else {
							this.result = 'error'
							this.errorMsg = String(recvdata.errorMessage)
						}
					})
			},
			ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
			},
			macVal(ele){
               let macVal = ($(ele+' .mac_a').val()?$(ele+' .mac_a').val():"")+
				            ($(ele+' .mac_b').val()?':'+$(ele+' .mac_b').val():"")+
							($(ele+' .mac_c').val()?':'+$(ele+' .mac_c').val():"")+
							($(ele+' .mac_d').val()?':'+$(ele+' .mac_d').val():"")+
							($(ele+' .mac_e').val()?':'+$(ele+' .mac_e').val():"")+
							($(ele+' .mac_f').val()?':'+$(ele+' .mac_f').val():"")
			   return macVal
			},
			deleData() {
				this.result = ''
				this.oper = 'del'
				var delArr = []
				var deldata = this.tableData
				$('.isCheck').each(function(index, e) {
					if($(e).prop("checked")) {
						delArr.push(deldata[index].mac)
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
			addData() {				
				this.oper = 'add'
				this.reset()
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
				$('.modal .input_wrap input').css('border', 'none')
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
	
	.content {
		margin-top: 20px;
		padding: 0 20px;
		height: 795px;
	}
	.content p{
		color: rgb(105, 182, 255);
		margin-top: 10px;
	}
	.tablewrap {
		height: 700px;
		overflow: hidden;
	}
</style>