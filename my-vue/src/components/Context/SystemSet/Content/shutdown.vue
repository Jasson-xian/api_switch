<template>
	<div class="wrap">
		<div class="title">
			<h3>关机/重启</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="width: 120px;">设备操作</th>
						<th style="width: 900px;"></th>
						<th style="width: 120px;">操作</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>重启/关机</td>
						<td>
							<input type="radio" name="radio" value="reboot"/><label>重启</label>
							<input type="radio" name="radio" value="halt" style="margin-left: 50px;" /><label>关机</label>
							<span>（提示：电源延迟开关，长按5秒关机）</span>
						</td>
						<td><button @click="command()" class="surebtn button button--aylen" data-toggle='popover' data-container="body" data-placement="bottom" data-content="请先选择一个操作">确定</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<confirm v-on:doThing="doCommand()" :types="types" :result='result' :errorMsg='errorMsg'></confirm>
		<alert :code="code"></alert>
		<reboot :result='result' :status="status"></reboot>
	</div>
</template>
<script>
	import systemService from 'services/systemService'
	import confirm from './update/confirm.vue'
	import reboot from './smallcomponent/reboot.vue'
	import alert from './tags/alert.vue'
	import bwDelemodal from 'components/libs/bwDelemodal'
	export default {
		components:{
			alert,
			confirm,
			reboot,
			bwDelemodal
		},
		data(){
			return {
				code:"",
				types:"",
				status:true,
				result:'',
				errorMsg:''
			}
		},
		methods:{
			show(){
				$("#reboot").modal('show');
			},
			command(){
				var cmd = $("input[name='radio']:checked").val();
				if( cmd!="reboot" && cmd!="halt" ){
					this.code = "no"
					$(".surebtn").popover('show')
					setTimeout(function () {
						$('.surebtn').popover('destroy')
					}, 1500)
				}else if( cmd == "reboot" ){
					this.result=''
					this.errorMsg=''
					this.types = "reboot"
					$("#confirm").modal('show')
				}else if( cmd == "halt" ){
					this.types = "halt"
					this.result=''
					this.errorMsg=''
					$("#confirm").modal('show')
				}
			},
			doCommand(){
				$("#confirm").modal('hide')
				var cmd = $("input[name='radio']:checked").val();
				if( cmd == "reboot" ){
					systemService.command("reboot")
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							//重启等待
							this.result=''
							$("#reboot").modal('show');
							var timer = window.setInterval(checkStart,10000);
							function checkStart(){
								systemService.checkStart()
								.then((recvdata) => {
									recvdata = jQuery.parseJSON(recvdata);
									if(recvdata.success) {
										window.clearInterval(timer);
										window.location.href = '/'
									}
								})
							}							
						}else{
							this.code = "fail"
							$("#alert").modal('show');
							setTimeout(function () {
								$("#alert").modal('hide');
							}, 1500);
						}
					})
				}else if( cmd == "halt" ){
					systemService.command("halt")
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							this.code = "halt"
							$("#alert").modal('show');
							setTimeout(function () {
								$("#alert").modal('hide');
							}, 5000);
						}else{
							this.code = "fail"
							$("#alert").modal('show');
							setTimeout(function () {
								$("#alert").modal('hide');
							}, 1500);
						}
					})
				}
			}
		}
	}
</script>
<style scoped>
	.wrap {
		margin: 30px 0 0 30px;
		padding-bottom: 10px;
		background: #FFFFFF;
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
	
	.table-wrap {
		margin: 20px;
	}
	
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
	
	thead tr th{
		height: 30px;
		text-align: center;
	}
	tbody tr td {
		height: 35px;
		text-align: center;
		border-left: 1px solid #b2daff;
		border-bottom: 1px solid #69b6ff;
	}
	tbody tr td:first-child {
		border-left: 1px solid #69b6ff;
	}
	td:last-child,th:last-child {
		border-right: 1px solid #69b6ff;
	}
	
	th:nth-child(2),
	td:nth-child(2) {
		text-align: left;
		padding: 0 20px;
	}
	
	th {
		color: #ffffff;
	}
	
	.surebtn {
		width: 50px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
	}
	
	tbody tr:nth-child(odd) {
		background: #e1f0ff;
	}
	
	input {
		margin: 5px 8px;
	}
	label,
	span{
		padding-top: 5px;
	}
	input[name='radio']{
		margin-top: 2px;
	}
</style>