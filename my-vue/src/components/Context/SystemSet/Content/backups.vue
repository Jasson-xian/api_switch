<template>
	<div class="wrap">
		<div class="title">
			<h3>备份/恢复</h3>
		</div>
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th style="">配置内容</th>
						<th style="">内容描述</th>
						<th style="width: 250px;">选择文件</th>
						<th style="width: 250px">上传进度</th>
						<th style="width: 90px;">状态</th>
						<th style="width: 80px;">操作</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>配置备份</td>
						<td>将当前设备配置导出为配置文件</td>
						<td></td>
						<td></td>
						<td style="color:#56b070;" class="exp-status">准备</td>
						<td><button @click="expConf()" id="exbtn" class="button button--aylen">导出</button></td>
					</tr>
					<tr>
						<td>配置恢复</td>
						<td>将配置文件导入设备, 导入后将覆盖原来的配置文件</td>
						<td >
							<input type="text" v-model="bkfilepath" class="styleinput" disabled="true" readonly placeholder="文件选择..."/>
							<label class="lookth" for="bkfile">浏览..</label>
							<input id="bkfile" type="file" v-on:change="bkShowpath()" class="bkfileinput" />
						</td>
						<td>
							<div class="progress progress-striped active">
								<div class="bkbar progress-bar progress-bar-success" role="progressbar" aria-valuenow="num" aria-valuemin="0" aria-valuemax="100">
								</div>
							</div>
						</td>
						<td style="color:#56b070;" class="bk-statu">准备</td>
						<td>
							<button @click="bkReturn()" id="bkbtn" class="button button--aylen">恢复</button>
						</td>
					</tr>
					<tr>
						<td>恢复出厂设置</td>
						<td>将所有配置恢复出厂设置</td>
						<td></td>
						<td></td>
						<td style="color:#56b070;" class="reset-statu">准备</td>
						<td><button @click="resetMsg()" id="rebtn" class="button button--aylen">还原</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<bkconfirm v-on:doThing="sysReset()"></bkconfirm>
		<alert :code="code"></alert>
		<failmsg v-on:fresh="bkCancel()" :msg="msg"></failmsg>
		<reboot :result='result' :status="status"></reboot>
	</div>
</template>
<script>
	import systemService from 'services/systemService'
	import bkconfirm from './backups/bkconfirm.vue'
	import alert from './tags/alert.vue'
	import failmsg from './tags/failmsg.vue'
	import reboot from './smallcomponent/reboot.vue'
	
	export default {
		components: {
			failmsg,
			bkconfirm,
			alert,
			reboot
		},
		data(){
			return {
				bkfilepath:"",
				types:"",
				code:"",
				status:true,
				msg:"",
				result:""
			}
		},
		methods:{
			bkShowpath(){
				this.bkfilepath = this.getFilename(".bkfileinput")
			},
			bkReturn(){
				var upfile = document.getElementsByClassName('bkfileinput')[0].files[0]
				if (!upfile) {
					this.msg = "请先选择文件"
					$("#failmsg").modal('show');
					return
				}
				$(".bk-statu").css("color","#56b070")
				$(".bk-statu").text("开始上传")
				$("#bkbtn").attr("disabled","true")
				$("#bkbtn").css("background","rgba(153, 153, 153, 0.52)")
				var fd = new FormData()
				fd.append('file',upfile)
				var _this = this
				$.ajax({
					url: "/services/v1_1/sys_conf/xmsd/UploadConfig.php",
					type: 'POST',
					data: fd,
					processData: false,//用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
					contentType: false,//设为false才会获得正确的conten-Type
					xhr: function() { //用以显示上传进度
						var xhr = $.ajaxSettings.xhr();
						xhr.onreadystatechange = function () {
							if (xhr.readyState === 4) {
								if (xhr.status != 200) {
									$(".bk-statu").text("请求超时")
									$(".bk-statu").css("color","red")
									$("#bkbtn").removeAttr("disabled")
									$("#bkbtn").css("background","#f5b72e")
									_this.msg = "请求超时"
									$("#failmsg").modal('show');
								}
							}
						};
						if (xhr.upload) {
							xhr.upload.addEventListener('progress', function(e) {
								$(".bkbar").css("width",Math.floor(e.loaded/e.total*100)+"%")
								if(e.loaded/e.total*100 < 100){
									$(".bk-statu").css("color","#56b070")
									$(".bk-statu").text("正在上传")
								}
							}, false);
						}
						return xhr;
					},
					async: true  
				}).then(function(data) {  
					var recvdata = jQuery.parseJSON(data);
					if(recvdata.success){
						$(".bk-statu").css("color","#56b070")
						$(".bk-statu").text("配置恢复成功")
						$("#bkbtn").removeAttr("disabled")
						$("#bkbtn").css("background","#f5b72e")
						_this.msg = "配置恢复成功"
						$("#failmsg").modal('show');
					}else if(recvdata.errorMessage =="XML error: Not well-formed (invalid token) at line 1"){
						$(".bk-statu").css("color","red")
						$(".bk-statu").text("文件类型错误")
						$("#bkbtn").removeAttr("disabled")
						$("#bkbtn").css("background","#f5b72e")
						_this.msg = "文件类型错误"
						$("#failmsg").modal('show');
					}else if(recvdata.errorMessage =="读取上传文件错误"){
						$(".bk-statu").css("color","red")
						$(".bk-statu").text("读取文件错误")
						$("#bkbtn").removeAttr("disabled")
						$("#bkbtn").css("background","#f5b72e")
						_this.msg = "读取文件错误"
						$("#failmsg").modal('show');
					}else{
						$(".bk-statu").css("color","red")
						$(".bk-statu").text("上传失败")
						$("#bkbtn").removeAttr("disabled")
						$("#bkbtn").css("background","#f5b72e")
						_this.msg = "上传失败"
						$("#failmsg").modal('show');
					}
				})  
			},
			bkCancel(){
				$(".bkbar").css("width","0")
				$(".bk-statu").css("color","#56b070")
				$(".bk-statu").text("准备")
				this.bkfilepath = ""
				document.getElementsByClassName('bkfileinput')[0].value = "";
			},
			expConf(){
				location.href="/services/v1_1/sys_conf/xmsd/ExportConfig.php"
				$(".exp-status").text("正在导出")
				setTimeout(function () {
					$(".exp-status").text("")
				}, 3000);
			},
			resetMsg(){
				this.types = "backup"
				$("#bkconfirm").modal('show');
			},
			sysReset(){
				$(".reset-statu").css("color","#56b070")
				$(".reset-statu").text("开始还原")
				systemService.sysReset()//开始请求还原
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success){//请求还原成功后 直接重启
						this.result=''
						$(".reset-statu").text("正在重启")//重启等待
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
						$(".reset-statu").css("color","red")
						$(".reset-statu").text("请求还原失败")
						this.code = "fail"
						$("#alert").modal('show');
						setTimeout(function () {
							$("#alert").modal('hide');
						}, 1500);
					}
				})
			},
			getFilename(ele){
				var fileName="";
				if(typeof(fileName) != "undefined"){  
					fileName = $(ele).val().split("\\").pop();
				} 
				return fileName
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
		background: #f0f8ff;
	}
	
	table {
		width: 1150px;
	}

	thead {
		background: #69b6ff;
	}
	
	thead tr th:first-child,
	tbody tr td:first-child{
		border-left: 1px solid #69b6ff;
	}
	thead tr th:last-child,
	tbody tr td:last-child{
		border-right: 1px solid #69b6ff;
	}
	tbody tr td {
        border-left: 1px solid #b2daff;
    }
	tbody tr:last-child td {
		border-bottom: 1px solid #69b6ff;
	}

	tbody tr td:nth-child(5) {
		padding-left: 5px;
		padding-right: 5px;
	}
	
	td:last-child,th:last-child {
		border-right: 1px solid #69b6ff;
	}
	
	thead th{
		text-align: center;
		height: 30px;
	}
	tbody td {
		text-align: center;
		padding: 0 15px;
		height: 35px;
	}
	
	tbody td:nth-child(2) {
		text-align: left;
	}
	
	th {
		color: #ffffff;
	}
	
	.cancelbtn,#exbtn,#rebtn,#bkbtn {
		width: 50px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
	}

	tbody tr:nth-child(odd) {
		background: #d2e9ff;
	}

	tbody tr:nth-child(2) {
		background: #f0f8ff;
	}
	
	.bkfileinput {
		display: none;
	}

	.styleinput {
		background: #FFFFFF;
		border-radius: 5px;
		height: 20px;
		width: 150px;
		border: 1px solid #E2E6E9;
		padding: 5px;
	}
	label{
		margin-bottom: 0px;
	}
	.lookth {
		background: #F1F1F1;
		border: 1px solid #E2E6E9;
		color: #000000;
		width: 50px;
		height: 20px;
		border-radius: 5px;
		font-weight: 200;
		cursor:pointer;
		position: relative;
		top: 1px;
	}
	.lookth:hover{
		border: 1px solid #F1F1F1;
		color: #000000;
		background:#ffffff;
	}
	.progress{
		margin:10px 0 ;
		height:10px;
		width:220px;
	}
</style>