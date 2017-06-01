<template>
	<div class="wrap">
		<div class="title">
			<h3>渗透日志</h3>
		</div>
		<div class="content">
			<filterdiv v-on:setData="setData" v-on:getData="getData"></filterdiv>
			<tablecontent :show='show' :tableData="tableData" :nowpage='nowpage' v-on:getData='getData'></tablecontent>
			<severPages v-on:getPageData="getPageData" :nowpage='nowpage' :totalpage='totalpage'></severPages>
		</div>
		<div id="dtBox"></div>		
	</div>
</template>
<script>
	import filterdiv from './permeatelog/filterdiv'
	import tablecontent from './permeatelog/tablecontent'
	import severPages from 'components/libs/severPages'

	import logManageService from 'services/logManageService'
	export default {
		components: {
			tablecontent,
			filterdiv,
			severPages
		},
		mounted() {
			// this.checkCount()
			this.setData()
			this.getData()
		},
		data() {
			return {			
				tableData: [],
				totalpage: 0,
				nowpage: 1,
				sentdata:{},
				show:false
			}
		},
		methods: {
			checkCount() {
				logManageService.getCheckCount()
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success == true) {

						}
					})
			},
			setData(){			
				this.sentdata = {}					
				var macVal = this.ipVal(".ip_input")?this.ipVal(".ip_input"):this.macVal(".mac_input")
				var portVal = $('.seleport option:selected').val()
				var starttime = $('.starttime').val()
				var endtime = $('.endtime').val()
				if(macVal){
					this.sentdata.macIP = macVal.trim()
				}
				if(portVal){
					this.sentdata.port = portVal
				}
				if(starttime){
					this.sentdata.starttime = starttime
				}
				if(endtime){
					this.sentdata.endtime = endtime
				}
				this.nowpage = 1
			    this.show = false
			},
			getData() {				
				this.sentdata.page = this.nowpage										   
				// logManageService.getPermeateLog(this.sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success) {
							this.tableData = []
							this.totalpage = 2
							this.show=true						
					// 	}
					// })
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				this.getData()
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
			}			
		}
	}
</script>

<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
		padding-bottom: 10px;
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
		padding: 0 20px;
	}
</style>