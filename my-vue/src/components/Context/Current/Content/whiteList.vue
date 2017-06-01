<template>
	<div class="wrap">
		<bwTitle :name='name' :tableData='tableData' v-on:deleData='deleData' v-on:addData='addData' ></bwTitle>

		<div class="content">
			<filterdiv v-on:getData='getData' v-on:setdata='setdata'></filterdiv>
			<bwTable :show = 'show' class='tablewrap' :tableData='tableData' :nowpage='nowpage' :onepage='onepage' :name='name'></bwTable>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage' ></severPages>
			<p>注: 对于系统内部主机，一般配置MAC地址白名单，对于系统外部主机，一般配置IP地址白名单</p>
		</div>
		<bwAddmodal v-on:getSetData='getSetData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></bwAddmodal>
		<bwDelemodal v-on:getSetData='getSetData' :result='result' :oper='oper' :name='name' :errorMsg='errorMsg'></bwDelemodal>
		<div id="dtBox"></div>
	</div>
</template>
<script>
	import bwTitle from 'components/libs/bwTitle'
	import filterdiv from './bwFilter/filterdiv'
	import bwTable from 'components/libs/bwTable'
	import bwAddmodal from 'components/libs/bwAddmodal'
	import bwDelemodal from 'components/libs/bwDelemodal'
	import severPages from 'components/libs/severPages'

	import realTimeService from 'services/realTimeService'
	import PageData from 'libs/PageData'
	export default {
		components: {
			bwTitle,
			filterdiv,
			bwAddmodal,
			bwDelemodal,
			bwTable,
			severPages
		},
		data() {
			return {
				name: '当前白名单',
				allTableData: [],
				tableData: [],
				nowpage: 1,
				onepage:24,
				totalpage: 0, //总页数
				oper: '', //操作类型，add，del
				deleIds: '', //要删除的id
				result: '',
				errorMsg: '',
				sentdata: {},
				show:false,
				intervalid: null,
				clearTimeout:false
			}
		},
		created() {
			this.setdata()
			this.getData()
		},
		methods: {
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
			setdata() {
				this.sentdata = {}
				var macVal = this.ipVal('.filter')?this.ipVal('.filter'):this.macVal('.filter')
				var start_time = $('.starttime').val()
				var end_time = $('.endtime').val()
				if(macVal){
					this.sentdata.mac = macVal				
				}
				if(start_time){
					this.sentdata.start_time = start_time
				}
				if(end_time){
					this.sentdata.end_time = end_time
				}
				this.nowpage = 1
				this.show = false
			},
			getData() {
				// var sentData = this.sentdata				
				// realTimeService.getWhiteList(sentData)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
					let recvdata = {data:[]}
							this.show = true
							this.allTableData = recvdata.data
							this.totalpage = new PageData(recvdata.data, 24).totalpage							
							this.getPageData(this.nowpage) //分页
						// }
						if(this.clearTimeout){
				           return 
				        }
						clearTimeout(this.intervalid)
						this.intervalid = setTimeout(() => this.getData(), 1000)
				// 	},()=>{
				// 		if(this.clearTimeout){
				// 		   return 
				// 		}
				// 		clearTimeout(this.intervalid)
				//         this.intervalid = setTimeout(() => this.getData(), 1000)
			    // })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				var allData = this.allTableData
				this.tableData = new PageData(allData, 24).data(this.nowpage)
				if(this.tableData==''&&this.nowpage>1){
					this.nowpage--
					this.tableData = new PageData(allData, 24).data(this.nowpage)
				}
			},
			getSetData() {
				this.result = 'reqing'
				//设置传参
				var sentdata = {
					oper: this.oper,
				}
				switch(this.oper) {
					case 'add':
						let ip = this.ipVal('.addip')
						let mac = this.macVal('.addmac')
						sentdata.mac = ip?ip:mac
						sentdata.note = $('.note').val()
						sentdata.reason = $('.reason').val()
						break;
					case 'del':
						sentdata.mac = this.deleIds
						break;
					default:
						break;
				}
				//请求
				
				realTimeService.setWhiteList(sentdata)				
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)						
						if(recvdata.success) {
							this.result = 'ok'						
						    if(this.oper=='add'){
								this.afterAdd()
							}else{
								this.getData()
							}						
						}else{
							this.result='error'
							this.errorMsg = String(recvdata.errorMessage)	
						}
					})
			},
			afterAdd(){
				var sentData = this.sentdata
				realTimeService.getWhiteList(sentData)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success) {
							this.show = true
							this.allTableData = recvdata.data
							this.totalpage = new PageData(recvdata.data, 24).totalpage							
							this.nowpage = this.totalpage	
							this.getPageData(this.nowpage) //分页
						}
					})
			},
			deleData() {
				this.result = ''
				this.oper = 'del'
				//筛选要删除的项
				var delArr = []
				$('.isCheck').each(function(index, e) {
					if($(e).prop("checked")) {
						var macNum = $('.macNum').eq(index).find('label').html()
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
			addData() {
				this.result = ''
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
		},
		beforeDestroy() {
			this.clearTimeout = true
			clearTimeout(this.intervalid)
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
	}
	
	.content {
		padding: 0 20px;
		height: 800px;
	}
	.content p{
		color: rgb(105, 182, 255);
		margin-top: 10px;
	}
	.tablewrap {
		height: 625px;
		overflow: hidden;
	}
</style>