<template>
	<div class="wrap">
		<div class="title">
			<h3>事件日志</h3>
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
		<div class="content">
			<filterdiv  v-on:setData="setData" v-on:getData="getData"></filterdiv>
			<tablecontent :show='show' :tableData="tableData" :nowpage='nowpage'></tablecontent>
			<severPages v-on:getPageData="getPageData" :totalpage='totalpage' :nowpage='nowpage'></severPages>
		</div>
	</div>
</template>
<script>
	import filterdiv from './eventlog/filterdiv.vue'
	import tablecontent from './eventlog/tablecontent.vue'
    import delemodal from './eventlog/delemodal.vue'
	import severPages from 'components/libs/severPages'
	
	import logManageService from 'services/logManageService'
	export default {
		components: {
			tablecontent,
			filterdiv,
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
				this.sentdata = {}
			    var levelVal =  $('.level option:selected').val()
			    var typeVal = $('.type option:selected').val()
			    var starttime = $('.starttime').val()
			    var endtime = $('.endtime').val()
			    if(levelVal){
			    	this.sentdata.level = levelVal
			    }
			    if(typeVal){
			    	this.sentdata.type = typeVal
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
				// logManageService.getEventLog(this.sentdata)
				// 	.then((recvdata) => {
				// 		recvdata = JSON.parse(recvdata)
				// 		if(recvdata.success == true) {
							this.show=true
							this.tableData = []
							this.totalpage = 2
					// 	}
					// })
			},
			getPageData(currentpage) {
				this.nowpage = Number(currentpage)
				this.getData()
			},
			exportFile(filetype) {
			    let sentData = this.sentdata
			    sentData.type = sentData.type?sentData.type:''
			    sentData.type = sentData.type?sentData.type:''
				sentData.starttime = sentData.starttime?sentData.starttime:''
				sentData.endtime = sentData.endtime?sentData.endtime:''
				let date = new Date()
				let fileName = '事件日志'+new Date().toLocaleString()
				let setUrl ="/services/v1_1/log/event.php?"
				    +"export="+ fileName + "." + filetype 
				    +"&type=" + sentData.type
					+"&level=" + sentData.level 
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
				logManageService.clearEventLog(sentData)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success) {
							this.result = 'ok'
							this.getData()
						}else{
							this.result = 'error'
						}
					})
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
		height: 765px;
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
	
	.filter {
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #ececec;
		margin-bottom: 40px;
	}
	
	label {
		margin-left: 25px;
	}
	
	input {
		width: 180px;
		background: #e8e8e8;
		height: 25px;
		border-radius: 5px;
		text-align: center;
	}
	
	select {
		width: 60px;
		border-radius: 5px;
		margin-left: 10px;
		padding-left: 8px;
		vertical-align: middle;
	}
	
	button {
		background: #ffae00;
		color: #ffffff;
		width: 80px;
		height: 25px;
		border-radius: 5px;
		margin-left: 100px;
	}
	
	.time {
		background-color: #FFFFFF;
		background-image: url(../../../img/rili.png);
		background-repeat: no-repeat;
		background-size: contain;
		border: 1px solid #e8e8e8;
		width: 190px;
	}
	
	.endtime {
		margin-left: 30px;
	}
	
	.active {
		color: #69b6ff;
	}
	.unactive{
		color: #FFFFFF;
	}
</style>