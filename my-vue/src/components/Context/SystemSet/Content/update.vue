<template>
	<div class="wrap">
		<div class="title">
			<h3>系统升级</h3>
		</div>
		<div class="table-wrap">
			<table style="margin: 0 auto;">
				<thead>
					<tr>
						<th style="width: 100px;">升级内容</th>
						<th style="width: 350px;">版本内容</th>
						<th style="width: 250px;">选择文件</th>
						<th style="width: 300px;">上传进度</th>
						<th style="width: 100px;">状态</th>
						<th style="width: 100px;">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr :class="accredit=='valid'?'':'gary'">
						<td >系统版本</td>
						<td >{{ sysVersion ? sysVersion : "-"}}</td>
						<td>
							<input type="text" v-model="vsfilepath" class="styleinput" disabled="true" readonly placeholder="文件选择..."/>
							<label class="lookth" for="vsfile">浏览..</label>
							<input :disabled="accredit!='valid'" id="vsfile" type="file" v-on:change="vsShowpath()" class="vsfileinput"/>
						</td>
						<td>
							<div class="progress progress-striped active">
								<div class="vsbar progress-bar progress-bar-success" role="progressbar" aria-valuenow="num" aria-valuemin="0" aria-valuemax="100">
								</div>
							</div>
						</td>
						<td  class="vs-statu">准备</td>
						<td >
							<button id="vsbtn" :disabled="accredit!='valid'"  :class="(accredit=='valid')?'button button--aylen':''" @click="vsUpload()" >升级</button>
						</td>
					</tr>
					
					<tr>
						<td rowspan="11">授权文件</td>
						<td >设备识别号：<p>{{acrt.device_id ? acrt.device_id : '-'}}</p></td>
						<td rowspan="11">
							<input type="text" v-model="pwfilepath" class="styleinput" disabled="true" readonly placeholder="文件选择..."/>
							<label class="lookth" for="pwfile">浏览..</label>
							<input id="pwfile" type="file" v-on:change="pwShowpath()" class="pwfileinput" />
						</td>
						<td rowspan="11">
							<div class="progress progress-striped active">
								<div class="pwbar progress-bar progress-bar-success" role="progressbar" aria-valuenow="num" aria-valuemin="0" aria-valuemax="100">
								</div>
							</div>
						</td>
						<td rowspan="11"  class="pw-statu">准备</td>
						<td rowspan="11"><button id="pwbtn" @click="pwUpload()"  class="button button--aylen">升级</button></td>
					</tr>
					<!--<tr>
						<td>
							产品型号：{{acrt.model ? acrt.model : '-'}}
						</td>
					</tr>-->
					<tr>
						<td>
							授权类型：
							<span v-if='acrt.type=="official"'>正式</span>
							<span v-else-if='acrt.type=="test"'>测试</span>
							<span v-else>-</span>
						</td>
					</tr>
					<tr>
						<td>接入主机数：{{acrt.max_hosts ? acrt.max_hosts+'个' : '-'}}</td>
					</tr>
					<tr>
						<td>网管语言：<span v-if='acrt.lang=="chinese"'>中文</span><span v-else>{{acrt.lang ? acrt.lang : '-'}}</span></td>
					</tr>
					<tr>
						<td>授权日期：<span>{{getLocalTime(acrt.start_time) ? getLocalTime(acrt.start_time) : '-'}} </span></td>

					</tr>
					<tr>
						<td>授权有效期：截止至<span>{{getLocalTime(acrt.end_time) ? getLocalTime(acrt.end_time) : '-' }} </span></td>
					</tr>
					<tr>
						<td>授权用户：<p>{{acrt.user ? acrt.user : "-"}}</p></td>
					</tr>
					<tr>
						<td>备注：<p>{{acrt.desc ? acrt.desc : '-'}}</p></td>
					</tr>
					<tr>
						<td>授权厂家：<p>{{acrt.licence_owner ? acrt.licence_owner : '-'}}</p></td>
					</tr>
					<tr>
						<td>版权所有：<p>{{acrt.copy_right ? acrt.copy_right : '-'}}</p></td>
					</tr>
				</tbody>
			</table>
			<p v-if="accredit=='expired'" class="notice">授权文件已过期，请更新授权文件！</p>
			<p v-if="accredit!='expired'&&accredit!='valid'" class="notice">授权文件{{showtype}}，请升级授权文件！</p>
		</div>
		<confirm v-on:doThing="sysReboot()" v-on:reload="reload()":types="types"  :result='result' :errorMsg='errorMsg'></confirm>
		<alert :code="code"></alert>
		<failmsg v-on:fresh="vsCancel()" :msg="msg"></failmsg>
		<reboot :status="status"></reboot>
	</div>
</template>
<script>
	import systemService from 'services/systemService'
	import alert from './tags/alert.vue'
	import failmsg from './tags/failmsg.vue'
	import confirm from './update/confirm.vue'
	import reboot from './smallcomponent/reboot.vue'
	export default {
		components: {
			failmsg,
			alert,
			confirm,
			reboot
		},
		computed:{
			accredit:function(){
				return this.$store.state.cert.status
			},
			acrt:function(){
				return this.$store.state.cert
			},
			showtype:function(){
				var type=''
				switch (this.$store.state.cert.status) {
					case 'missing':
						type='缺失'
						break;
					case 'device_not_match':
						type='和设备不匹配'
						break;
					case 'malform':
						type='内容格式错误'
						break;
					case 'type_error':
						type='类型错误'
						break;
					case 'unknown':
						type='状态未知'
						break;
					case 'uninit':
						type='未初始化'
						break;
					default:
						break;
				}
				return type
			}
    	},
		mounted(){
			this.getsysinfo()
		},
		data(){
			return {
				vsfilepath:"",
				pwfilepath:"",
				types:"reboot",
				code:"",
				status:true,
				sysVersion:"",
				msg:"",
				result:'',
				errorMsg:'',
				// accredit:true
			}
		},
		methods:{
			reload(){
				location.reload()
			},
			getLocalTime(nS) {
				if(nS){
					return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
				} else{
					return null   
				}   
				  
			},
			getsysinfo(){
				systemService.getSysinfo()
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata)
					if(recvdata.success){
						this.sysVersion = recvdata.data.version
					}
				})
			},
			vsUpload(){
				var upfile = document.getElementsByClassName('vsfileinput')[0].files[0]
				if (!upfile) {
					this.msg = "请先选择文件"
					$("#failmsg").modal('show');
					return
				}
				$(".vs-statu").css("color","#56b070")
				$(".vs-statu").text("开始升级")
				$("#vsbtn").attr("disabled","true")
				$("#vsbtn").css("background","rgba(153, 153, 153, 0.52)")
				var fd = new FormData()
				fd.append('file',upfile)
				var _this = this
				$.ajax({
					url: "/services/v1_1/sys_conf/UploadImage.php",
					type: 'POST',
					data: fd,
					processData: false,//用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
					contentType: false,//设为false才会获得正确的conten-Type
					xhr: function() { //用以显示上传进度
						var xhr = $.ajaxSettings.xhr();
						xhr.onreadystatechange = function () {
							if (xhr.readyState === 4) {
								if (xhr.status != 200) {
									$(".vs-statu").text("请求超时")
									$(".vs-statu").css("color","red")
									$("#vsbtn").removeAttr("disabled")
									$("#vsbtn").css("background","#f5b72e")
									_this.msg = "请求超时"
									$("#failmsg").modal('show');
								}
							}
						};
						if (xhr.upload) {
							xhr.upload.addEventListener('progress', function(e) {
								$(".vsbar").css("width",Math.floor(e.loaded/e.total*100)+"%")
								if(e.loaded/e.total*100 < 100){
									$(".vs-statu").css("color","#56b070")
									$(".vs-statu").text("正在上传")
								}
							}, false);
						}
						return xhr;
					},
					async: true  
				}).then(function(data) {  
					var recvdata = jQuery.parseJSON(data);
					if(recvdata.success){
						$(".vsbar").css("width","0")
						$(".vs-statu").css("color","#56b070")
						$(".vs-statu").text("上传成功")
						_this.types="reboot",
						$("#confirm").modal('show')
						$("#vsbtn").removeAttr("disabled")
						$("#vsbtn").css("background","#f5b72e")
					}else if(!recvdata.success){
						$(".vs-statu").css("color","red")
						$(".vs-statu").text(recvdata.errorMessage)
						_this.msg = recvdata.errorMessage
						$("#failmsg").modal('show');
						$("#vsbtn").removeAttr("disabled")
						$("#vsbtn").css("background","#f5b72e")
					}
				})  
			},
			vsCancel(){
				$(".vsbar").css("width","0")
				$(".pwbar").css("width","0")
				$(".vs-statu").css("color","#56b070")
				$(".vs-statu").text("准备")
				$(".pw-statu").text('准备')
				$(".pw-statu").css("color","#56b070")
				this.vsfilepath = ""
				this.pwfilepath=''
				document.getElementsByClassName('vsfileinput')[0].value = "";
				document.getElementsByClassName('pwfileinput')[0].value = "";
			},
			//授权文件部分暂无
			pwUpload(){
				var upfile = document.getElementsByClassName('pwfileinput')[0].files[0]
				if (!upfile) {
					this.code = "nofile"
					$("#alert").modal('show');
					setTimeout(function () {
						$("#alert").modal('hide');
					}, 1000);
					return
				}
				$(".pw-statu").css("color","#56b070")
				$(".pw-statu").text("开始升级")
				$("#pwbtn").attr("disabled","true")
				$("#pwbtn").css("background","rgba(153, 153, 153, 0.52)")
				var fd = new FormData()
				fd.append('file',upfile)
				var _this=this
				$.ajax({
					url:"/services/v1_1/sys_conf/UploadCert.php",
					type: 'POST',
					data: fd,
					processData: false,//用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
					contentType: false,//设为false才会获得正确的conten-Type
					xhr: function() { //用以显示上传进度
						var xhr = $.ajaxSettings.xhr();
						xhr.onreadystatechange = function () {
							if (xhr.readyState === 4) {
								if (xhr.status != 200) {
									$(".pw-statu").text("请求超时")
									$(".pw-statu").css("color","red")
									$("#pwbtn").removeAttr("disabled")
									$("#pwbtn").css("background","#f5b72e")
									_this.msg = "请求超时"
									$("#failmsg").modal('show');
								}
							}
						};
						if (xhr.upload) {
							xhr.upload.addEventListener('progress', function(e) {
								$(".pwbar").css("width",Math.floor(e.loaded/e.total*100)+"%")
								if(e.loaded/e.total*100 < 100){
									$(".pw-statu").css("color","#56b070")
									$(".pw-statu").text("正在上传")
								}
							}, false);
						}
						return xhr;
					},
					async: true  
				}).then(function(data) {  
					var recvdata = jQuery.parseJSON(data);
					if(recvdata.success){
						$(".pw-statu").css("color","#56b070")
						$(".pw-statu").text("上传成功")
						_this.result=''
						_this.types='cart'
						$("#confirm").modal('show')
						$("#pwbtn").removeAttr("disabled")
						$("#pwbtn").css("background","#f5b72e")
					}else{
						$(".pw-statu").css("color","red")
						$(".pw-statu").text("上传失败")
						$("#pwbtn").removeAttr("disabled")
						$("#pwbtn").css("background","#f5b72e")
						_this.msg = recvdata.errorMessage
						$("#failmsg").modal('show');
					}
				})  
			},
			sysReboot(){
				$("#confirm").modal('hide')
				this.result='reqing'
				this.errorMsg=''
				let cmd ="reboot"
				systemService.command(cmd)
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
						this.result='ok'
						this.code = cmd
						//重启等待
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
						$("#confirm").modal('hide');
						this.code = "fail"
						$("#alert").modal('show');
						setTimeout(function () {
							$("#alert").modal('hide');
						}, 1500);
					}
				})
			},
			vsShowpath(){
				this.vsfilepath = this.getFilename(".vsfileinput")
			},
			pwShowpath(){
				this.pwfilepath = this.getFilename(".pwfileinput")
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
	}
	
	thead {
		background: #69b6ff;
		color: #ffffff;
	}
	
	tbody tr td{
		height: 35px;
	}
	
	tbody tr td {
		border-left: 1px solid #b2daff;
		
	}
	tbody tr:nth-child(1) td{
		border-bottom: 1px solid #b2daff;
	}
	tbody tr:nth-child(2) td{
		border-bottom: 1px solid #69b6ff;
	}
	thead tr th:first-child,
	tbody tr td:first-child{
		border-left: 1px solid #69b6ff;
	}
	td:last-child,th:last-child {
		border-right: 1px solid #69b6ff;
	}
	
	thead tr th{
		text-align: center;
		height: 30px;
	}
	tbody tr td {
		text-align: center;
		padding: 0 15px;
	}
	tbody tr td>p{
		width:230px;
		display:inline-block;
		word-wrap:break-word;
		word-break:normal;
		vertical-align: top;
	}
	
	th {
		color: #ffffff;
	}
	button {
		width: 50px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
	}
	.button{
		background: #f5b72e;
	}
	tbody tr:first-child td:nth-child(2) {
		text-align: left;
	}
	
	tbody tr:nth-child(2) td:nth-child(2),
	tbody tr:nth-child(n+3) td {
		border: none;
		border-left: 1px solid #b2daff;
		text-align: left;
	}
	
	tbody tr:last-child td {
		border-bottom: 1px solid #69b6ff;
	}
	
	/*选择文件*/
	
	.vsfileinput,
	.pwfileinput {
		display: none;
	}

	.pwfileinput {
		top: 75px;
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
		line-height: 20px;
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
		margin:10px;
		height: 10px;
		width: 250px;
	}
	.notice{
		font-size: 13px;
		margin-top: 24px;
		color: #e05034;
		text-align: left;
	}
	td[class*='statu']{
		color:#56b070;
	}
	.gary td, .gary label{
		color: #E3E3E3;
	}
	.gary .lookth:hover{
		color: #E3E3E3;
	}
	.gary .lookth:hover{
		background: #F1F1F1;
	}
	.gary td[class*='statu']{
		color: #E3E3E3;
	}
</style>