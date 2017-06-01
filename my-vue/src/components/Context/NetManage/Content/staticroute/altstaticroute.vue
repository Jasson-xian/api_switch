<template>
	<div @keyup.enter="setRoute()" class="modal" id="altstaticroute" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table">
						<thead>
							<tr>
								<th colspan="2">修改静态路由配置
									<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
								</th>								
							</tr>
						</thead>
						<!--正在请求-->
						<tbody class="result" v-show="result=='loading'">
							<div style="height: 149px;padding-top: 10px;">
								<img src="../../../../img/loading.gif" />
					    		<p>正在链接数据，请稍后……</p>
							</div>
						</tbody>
						<!--成功-->
						<tbody class="result" v-show="result=='success'">
							<div style="height: 149px;padding-top: 60px;">
								<img src="../../../../img/success.png" />
							</div>
						</tbody>
						<!--添加-->
						<tbody v-show="result=='add'">
							<tr class="id" style="display: none;"></tr>
							<tr>
								<td>目的网段：</td>
								<td>
									<staticinput class="altabcd" :empty=false></staticinput>
									<span class="mi">* 必填</span>	
								</td>
							</tr>
							<tr>
								<td>网关地址：</td>
								<td>
									<ipinput class="altgateway" :empty=false></ipinput>
									<span class="mi">* 必填</span>	
								</td>
							</tr>   
							<tr>
								<td class="tagmsg" colspan="2">注：目的网段可配置成192.168.2.5或192.168.2.0/24的格式</td>
							</tr>	
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="altnotice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="enter button button--aylen" @click="setRoute()">确认</button>
					<button class="cancel button button--aylen" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import netservice from 'services/netService'
	import formatTest from 'libs/formatTest'
	import staticinput from './staticinput'
	import ipinput from 'components/libs/ipinput'

	export default {
		components:{
			staticinput,
			ipinput
		},
		data(){
			return {
				result:"add",
				errorMsg:""
			}
		},
		methods: {
			setRoute(){
				this.errorMsg = ""
				$('.altnotice').hide()

				if(  this.testipVal('.altabcd', 'ipRang') && this.testMacIp('.altgateway', 'ip') ){
					let conf = {
						oper:"edit",
						abcd:this.mgipVal('.altabcd'),
						gateway:this.ipVal('.altgateway'),
						id:$(".id").html()
					};
					this.result = "loading"
					netservice.bindRoute(conf)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success && recvdata.data.result == "ok") {
							this.result = "success"
							this.$emit('getData');
							setTimeout(function () {
								$('#altstaticroute').modal('hide');
							}, 1000);
							var _this = this
							setTimeout(function () {
								_this.result = "add"
							}, 1500);
						}else if(recvdata.level == "error" && !recvdata.success) {
							this.result = "add"
							this.errorMsg = recvdata.errorMessage
							$('.altnotice').show()
						}
					})
				}
			},
			isEmpty(ele) {
                var test = new formatTest(ele)
			    test.notEmpty()
			    $('.notice').hide()
			},
			mgipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")+
							 ($(ele+' .ip_e').val()?'/'+$(ele+' .ip_e').val():"")
			    return ipVal
			},
			ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
			},
			testVal: function(ele, reg) {
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
			testMacIp(ele,type){				
				if(type=='ip'){
                    let ip_a_test = this.testVal(ele+' .ip_a', 'ip_piece')
				    let ip_b_test = this.testVal(ele+' .ip_b', 'ip_piece')
					let ip_c_test = this.testVal(ele+' .ip_c', 'ip_piece')
					let ip_d_test = this.testVal(ele+' .ip_d', 'ip_piece')
					if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
                        return true
					}else{
						return false
					}
					
				}else{
					let mac_a_test = this.testVal(ele+' .mac_a', 'mac_piece')
				    let mac_b_test = this.testVal(ele+' .mac_b', 'mac_piece')
					let mac_c_test = this.testVal(ele+' .mac_c', 'mac_piece')
					let mac_d_test = this.testVal(ele+' .mac_d', 'mac_piece')
					let mac_e_test = this.testVal(ele+' .mac_e', 'mac_piece')
					let mac_f_test = this.testVal(ele+' .mac_f', 'mac_piece')
					if(mac_a_test&&mac_b_test&&mac_c_test&&mac_d_test&&mac_e_test&&mac_f_test){
                        return true
					}else{
						return false
					}
				}
			},
			testipVal(ele, reg) {
				var ipRangReg = /^(!*(2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)(\/(3[0-2]|2[0-9]|1[0-9]|[1-9]))*(\-(!*(2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?))*(\/(3[0-2]|2[0-9]|1[0-9]|[1-9]))*$/
				let abcd=this.mgipVal(ele)
				if(ipRangReg.test(abcd)){
					$(ele).parent().find('.mi').css('color', '#d2d2d2')
					$(ele+' input').css('border', 'none')
					return true
				}else{
					$(ele+' input').css('border', '1px solid #b63039')
					$(ele+' input').addClass('animated shake')
					setTimeout(function() {
						$(ele+' input').removeClass('animated shake')
					}, 200)
					return false
				}
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 350px;
        margin-left: 45%;
	}
    .modal-content {
        width: 502px;
        border: 1px solid #69b6ff;
    }
	.modal-body {
        padding: 0px;
        width: 500px;
    }
    .table{
        width: 100%;
        margin-bottom: 10px; 
    }
	thead {
		background: #69b6ff;
        border-radius: 5px;
	}
	th {
		color: #ffffff;
		height: 30px;
		padding: 0 15px;
	}
	td {
		padding: 0 15px;
		height: 35px;
	}
	table thead tr th {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    tbody tr td:nth-child(1) {
        padding-top: 25px;
        text-align: right;
		width: 27%;
		vertical-align: middle;
    }
	tbody tr td:nth-child(2) {
        padding-top: 25px;
		width: 70%;
    }
    tbody tr:nth-child(1) td {
        padding-top: 35px;
    }    
	span {
		vertical-align: middle;
	}
	
	.enter,
	.cancel {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
	}
	
	.input {
		width: 240px;
		height: 23px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding-left: 3px;
	}

    .table>tbody>tr>td, 
    .table>tbody>tr>th, 
    .table>tfoot>tr>td, 
    .table>tfoot>tr>th, 
    .table>thead>tr>td, 
    .table>thead>tr>th{
        border-top: none;
    }
    .modal-footer{
        text-align: right;
        margin: 0 auto;
    }
    .enter{
        margin-right: 30px;
    }
	.result {
		text-align: center;
	}
	.altnotice {
		position: absolute;
		bottom: 20px;
		left: 20px;
		display: none;
	}
	.altnotice span {
		display: inline-block;
		color: #b63039;
		width: 200px;
		text-align: left;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tagmsg{
		padding-right: 112px;
		color: #a9a9a9;
	}
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
</style>