<template>
	<div class="wrap">
		<div class="title">
			<h3>日志服务器</h3>
			<div class="addbtn" @click='toAdd()'  @mouseenter="actived('add')" @mouseleave="unactived()" v-show='serverNum<2' data-toggle='modal' data-target="#addmodal">
				<img v-if="type=='add'" src="../../../img/bule_add.png"/>
				<img v-else src="../../../img/add.png" />
				<span :class = "[type=='add'?'active':'unactive']">添加服务器</span>
			</div>
		</div>
		<!--加载数据-->
	    <loadSpan v-show= '!show'></loadSpan>
	    <transition name="fade"  mode="out-in">
		<div v-show= 'show' class="content">				
		    <servers v-if='serverNum>0'  :recvData='recvData' :result = 'result'  v-on:getData='getData' v-on:deleSet='deleSet'></servers>				  
			<div v-else>
				<p>无日志服务器，请点添加</p>
			</div>
		</div>	
		</transition>
		<addmodal :serverNum='serverNum' :result='result' :errorMsg='errorMsg' v-on:getData='getData'></addmodal>
		<delemodal v-on:getData='getData' :result='result' :errorMsg='errorMsg'></delemodal>
	</div>
</template>
<script>
	import servers from './severlog/servers'
	import addmodal from './severlog/addmodal'
	import delemodal from './severlog/delemodal'
    import loadSpan from 'components/libs/loadSpan'	
	import logManageService from 'services/logManageService'
	export default {
		components: {
			addmodal,
			delemodal,
			servers,
			loadSpan
		},
		data() {
			return {
				serverNum: 0,
				recvData: [],
				oper: '',
				result: '',
				modok: '',
				operID: '',
				errorMsg: '',
				switch: '',
				type:'',
				show:false
			}
		},
		mounted() {
			var sentdata = {}
			this.getData(sentdata)
		},
		methods: {
			actived(type){
			    this.type = type
			},
			unactived(){
				this.type = ''
			},
			toAdd() {
				this.oper = 'add'				
				this.reset()
			},
			deleSet(index) {
				this.result = ''
				this.oper = 'del'
				this.operID = $('.operID').eq(index).html()
			},
			getData(sentdata) {
				this.result='reqing'
				if(this.oper=='del'){
					sentdata.ids = this.operID
				}			   
				// logManageService.getServer(sentdata)
				// .then((recvdata) => {
				// 	recvdata = JSON.parse(recvdata)
				// 	if(recvdata.success) {
					let recvdata = {"success":true,"data":[{"id":"1","switch":"1","abcd":"127.0.0.1","port":"30000","types":"1,4,5,6,8,7,9"}]}
						this.show= true
						this.result = 'ok'
						this.recvData = recvdata.data
						this.serverNum = this.recvData.length
				// 	} else {
				// 		this.result = 'error'
				// 		this.errorMsg = String(recvdata.errorMessage)
				// 	}
				// })
				
			},
			reset() {
				this.result = ''
				this.errorMsg = ''
				$('.modal textarea').val('')
				$('.modal input[type=text]').val('')
				$('#all').prop('checked',false)
				$(".modal input[type=checkbox]").prop('checked', false)
				$('.mi').css('color', '#d2d2d2')
				$('.modal input').css('border', '1px solid #e8e8e8')
				$('.input_wrap input').css('border', 'none')
				$('.notice').hide()
			}
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		background: #ffffff;
		padding-bottom: 10px;
		height: 650px;
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
	
	.addbtn {
		float: right;
		margin-top: 5px;
		margin-right: 15px;
		cursor: pointer;
	}
	
	.addbtn span {
		vertical-align: middle;
		padding: 0 5px;
	}
	
	p {
		text-align: center;
		line-height: 500px;
		font-size: 16px;
		color: #69b6ff;
	}
	.content{
		padding: 0 20px;
	}
    .active {
		color: #69b6ff;
	}
	.unactive{
		color: #FFFFFF;
	}
</style>