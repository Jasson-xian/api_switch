<template>
	<div class="wrap">
		<div class="title">
			<h3>操作日志</h3>
			<ul class="butn">
				<li v-on:click="exportFile('xml')"  @mouseenter="actived('xml')" @mouseleave="unactived()">
					<img v-if="type=='xml'"  src="../../../img/bule_xml.png">
					<img v-else src="../../../img/exportxml.png">
					<span :class = "[type=='xml'?'active':'unactive']">导出xml</span>
				</li>
				<li v-on:click="exportFile('html')" @mouseenter="actived('html')" @mouseleave="unactived()">
					<img v-if="type=='html'" src="../../../img/bule_html.png"/>
					<img v-else src="../../../img/exporthtml.png" />
					<span :class = "[type=='html'?'active':'unactive']">导出HTML</span>
				</li>
				<li v-on:click="clear()"  @mouseenter="actived('dele')" @mouseleave="unactived()" data-toggle="modal" data-target="#deleModal">
					<img  v-if="type=='dele'" src="../../../img/bule_delet.png"/>
					<img  v-else src="../../../img/delete.png" />
					<span :class = "[type=='dele'?'active':'unactive']">清空</span>
				</li>
				<delemodal v-on:clearAll="clearAll" :result='result'></delemodal>
			</ul>
		</div>
		<div class="bg">
			<filterdiv v-on:setData='setData' v-on:getData='getData'></filterdiv>
			<tablecontent :show='show' :tableData="tableData" :nowpage='nowpage'></tablecontent>
			<severPages :totalpage='totalpage' :nowpage='nowpage'  v-on:getPageData='getPageData'></severPages>
		</div>
	</div>
</template>
<script>
	import filterdiv from './orderlog/filterdiv'
	import tablecontent from './orderlog/tablecontent'
    import delemodal from './orderlog/delemodal.vue'
	import severPages from 'components/libs/severPages.vue'
    
	import logManageService from 'services/logManageService'		
	export default {
		components: {
			filterdiv,
			tablecontent,
			delemodal,
			severPages
		},
		data() {
			return {
				tableData: [],
				totalpage: 0,
				nowpage: 1,
				result: '',
				sentdata:{},
				show:false,
				type:''
			}
		},
		mounted() {
			this.setData()
			this.getData()
		},
		methods: {
			actived(type){
			this.type = type
			},
			unactived(){
				this.type = ''
			},
			setData(){
				this.sentdata ={}
				var macval = this.macVal('.mac')
				var ipval = this.ipVal('.IP')	
				var userval = $('.user').val()	
				var contentval = $('.content').val()
				var result = $('.result option:selected').val()
				var starttime = $('.starttime').val()	
				var endtime = $('.endtime').val()
				console.log(macval,ipval)
				if(macval){
			    	this.sentdata.mac = macval
			    }
			    if(ipval){
			    	this.sentdata.ip = ipval
			    }
			    if(userval){
			    	this.sentdata.user = userval.trim()
			    }
			    if(contentval){
			    	this.sentdata.content = contentval.trim()
			    }
			    if(result){
			    	this.sentdata.result = result
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
			
				// console.log(this.sentdata)								    				 
				// logManageService.getOrderLog(this.sentdata)
				// .then((recvdata) => {
				// 	recvdata = JSON.parse(recvdata)
				// if(recvdata.success) {	
					    this.show = true
						this.tableData = []
						this.totalpage = 2
				// 	}
				// })			  
			},
			getPageData(currentpage) {
				this.nowpage = currentpage
				this.getData()
			},			
			exportFile(filetype) {								
				let sentData = this.sentdata
			    sentData.mac = sentData.mac?sentData.mac:""
				sentData.ip = sentData.ip?sentData.ip:''
				sentData.user = sentData.user?sentData.user:''
				sentData.content = sentData.content?sentData.content:""
//				sentData.result = sentData.result?sentData.result:''
                sentData.starttime = sentData.starttime?sentData.starttime:''
				sentData.endtime = sentData.endtime? sentData.endtime:''
				let fileName = '操作日志'+ new Date().toLocaleString()
				let setUrl ="/services/v1_1/log/oper_log.php?" 
				+"export=" + fileName + "." + filetype 
				+"&page=" + sentData.page
				+"&mac=" + sentData.mac 
				+"&ip=" + sentData.ip
				+"&user="+sentData.user
				+"&content="+sentData.content
//				+"&result="+sentData.result
				+"&start_time=" + sentData.starttime
				+"&end_time=" + sentData.endtime
				window.open(setUrl);
			},
			clear(){
				this.result = ''
			},
			clearAll() {
				this.result = 'reqing'
				var sentData = this.sentdata
				logManageService.clearOrderLog(sentData)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success) {
							this.result = 'ok'
							this.getData(1)
						}else{
							this.result = 'error'
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
		vertical-align: middle;
	}
	
	.butn img {
		margin: 0 5px;
	}
	
	.title {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding-left: 20px;
	}
	
	h3 {
		line-height: 30px;
	}
	
	.bg {
		background: #FFFFFF;
		height: 790px;
	}
	.active {
		color: #69b6ff;
	}
	.unactive{
		color: #FFFFFF;
	}
</style>