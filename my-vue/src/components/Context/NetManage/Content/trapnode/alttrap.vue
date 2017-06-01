<template>
	<div @keyup.enter="setTrap()" class="modal" id="alttrap" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table">
						<thead>
							<tr>
								<th colspan="4">修改端口虚开
									<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
								</th>
								<th style="display: none;" class="altid"></th>
							</tr>
						</thead>
						<!--正在请求-->
						<tbody class="result" v-show="result=='loading'">
							<div style="height: 200px;padding-top: 30px;">
								<img src="../../../../img/loading.gif" />
					    		<p>正在链接数据，请稍后……</p>
							</div>
						</tbody>
						<!--成功-->
						<tbody class="result" v-show="result=='success'">
							<div style="height: 200px;padding-top: 75px;">
								<img src="../../../../img/success.png" />
							</div>
						</tbody>
						<!--添加-->
						<tbody v-show="result=='add'">
							<tr>
								<td>策略名：</td>
								<td>
									<input class="altname"  type="text" data-container="body" data-toggle="popover"
									@blur="testVal('.altname', 'CLname')" @focus="noEmpty('.altname')">
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>目标IP：</td>
								<td>
									<!--<input class="altip" type="text" 
									@blur="testVal('.altip', 'ip')" @focus="noEmpty('.altip')" >-->
									<ipinput class="altip" :empty=false></ipinput>
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>目标端口：</td>
								<td colspan="3" style="position: relative;">
									<textarea class="altport" rows="2" placeholder=" 8081,8082... " data-container="body"
									@blur="chkport()" @focus="noEmpty('.altport')" ></textarea>
									<span class="mi" style="position: absolute; top:15px;">* 多个端口请<br/>&nbsp;&nbsp;用“,”隔开,<br/>&nbsp;&nbsp;最多可输入10个</span>
								</td>
							</tr>
							<tr>
								<td>源IP：</td>
								<td>
									<!--<input class="altsrc_ip"  type="text"  placeholder="192.168.2.1 "
									@blur="srcConfg()" @focus="noEmpty('.altsrc_ip')" >-->
									<ipinput class="altsrc_ip" :empty=false></ipinput>
								</td>
								<td><span class="mi" style="position: absolute; left: 330px; top: 210px;">* 源IP、源端口、VLAN ID、<br/>&nbsp;&nbsp;线路 , 需同时设置或不设置</span></td>
							</tr>
							<tr >
								<td>源端口：</td>
								<td colspan="3" style="position: relative;">								
									<input class="altsrc_port"  type="text" placeholder=" 8081"
									@blur="srcConfg()" @focus="noEmpty('.altsrc_port')"></input>
								</td>
							</tr>
							<tr>
								<td>VLAN ID：</td>
								<td>
									<input  type="text" @blur="srcConfg()"  @focus="noEmpty('.altvlanid')"
									 class="altvlanid" placeholder="1">
									<span class="mi">* (0~4094的整数)</span>
								</td>
							</tr>
							<tr>
								<td>线路：</td>
								<td colspan="3">
									<select class="altroad" @change="srcConfg()" @focus="noEmpty('.altroad')" >
										<option value=""></option>
										<option v-for="road in roadNum" v-bind:value="road">
											线路{{ road }}
										</option>
									</select>
								</td>
							</tr> 
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="altnotice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="enter button button--aylen" @click="setTrap()">确认</button>
					<button class="cancel button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import netservice from 'services/netService'
	import formatTest from 'libs/formatTest'
	import ipinput from 'components/libs/ipinput'

	export default {
		components:{
			ipinput
		},
		props: {
			roadNum: {
				type: Array,
				required: true
			}
		},
		data(){
			return {
				result:"add",
				errorMsg:"",
				src_port:"",
				src_ip:"",
				road:"",
				vlanid:"",
				src_confg:false
			}
		},
		methods: {
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
						$(ele+' input').css('border','none')
                        return true
					}else{
						return false
					}
				}
			},
			srcConfg(){
				var src_port = $('.altsrc_port').val()
				var src_ip = this.ipVal('.altsrc_ip')
				var road = $('.altroad').val()
				var vlain = $('.altvlanid').val()
				if(src_port){
					this.testVal('.altsrc_port', 'prot')
					this.src_confg = true
				}
				if(src_ip){					
					this.testMacIp('.altsrc_ip', 'ip')
					this.src_confg = true					
				}
				if(road){
					this.testVal('.altroad', 'allpass')
					this.src_confg = true					
				}
				if(vlain){
				    this.testVal('.altvlanid', 'vlanid')
					this.src_confg = true										
				}
				if(!src_port&&!src_ip&&!road&&!vlain){
					this.src_confg = false
				}
			},
			setTrap(){
				this.errorMsg = ""
				$('.altnotice').hide()
				this.srcConfg()
				if(this.src_confg){
					var srcIPTest = this.testMacIp('.altsrc_ip', 'ip')			
				    var srcPortTest = this.testVal('.altsrc_port', 'prot')
				    var roadTest = this.testVal('.altroad', 'allpass')
				    var vlanidTest = this.testVal('.altvlanid', 'vlanid')
				}else{
					var srcIPTest = true			
				    var srcPortTest = true
				    var roadTest = true
				    var vlanidTest = true
				}
                var protTest = this.chkport()
				var Clnametest = this.testVal('.altname', 'CLname')			
				var IPtest = this.testMacIp('.altip', 'ip')
				if(protTest&&Clnametest&&IPtest&&srcIPTest&&srcPortTest&&roadTest&&vlanidTest){
					var portArr = $(".altport").val().replace(/，/g,",").split(",")
					var port = new Array()
					for(let i = 0 ; i < portArr.length ; i++){//验证每个端口的格式
						if(portArr[i]=="")continue;
						port.push(portArr[i])
					}
					var portStr = ""
					port.forEach(function(v,i,a){
						portStr += v + ","
					})
					portStr = portStr.substr(0,portStr.length-1);
					var trap = {
                        oper:"edit",
						id:$(".altid").html(),
                        name:$(".altname").val(),
						target_ip:this.ipVal('.altip'),
						target_port:portStr,
                    }
					if(this.src_confg){
						trap.source_ip = this.ipVal('.altsrc_ip')
						trap.source_port=$(".altsrc_port").val(),
						trap.groupid=$(".altroad").val(),
						trap.vlanid=$(".altvlanid").val()
					}
					this.result = "loading"
					netservice.setTrap(trap)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {							
							this.result = "success"
							this.$emit('getData');
							setTimeout(function () {
								$('#alttrap').modal('hide');
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
			chkport(){			
				var flag = true
				if( $(".altport").val()== "" ){
					this.shock(".altport")
					flag = false
					return flag
				}else{
					var regPortinput = /^[0-9,]+$/;
					var regPort = /^((([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5])),){0,19}(([1-9]\d{0,3})|([1-5]\d{4})|(6[0-4]\d{3})|(65[0-4]\d{2})|(655[0-2]\d)|(6553[0-5]))$/;
					var portStr = $(".altport").val().replace(/，/g,",")
					if( !regPortinput.test(portStr) ){//验证端口是否有其他字符
						this.shock(".altport")
						flag = false
						return flag
					}else{
						this.noshock(".altport")
					}
					var portArr = portStr.split(",")
					var n = 0;
					for(let i = 0 ; i < portArr.length ; i++){//验证每个端口的格式
						if(portArr[i]=="")continue;
						n++;
						if( !regPort.test(portArr[i]) ){
							this.shock(".altport")
							flag = false
						    return flag
						}else{
							this.noshock(".altport")
						}
					}
					if(n > 10){//验证端口个数
						this.shock(".altport")
						flag = false
						return flag
					}else{
						this.noshock(".altport")
					}
				}
				return flag
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			    $('.notice').hide()			    
			},
            shock(ele){
                $(ele).parent().find('.mi').css('color', '#b63039')
				$(ele).css('border', '1px solid #b63039')
				$(ele).addClass('animated shake')
				setTimeout(function() {
					$(ele).removeClass('animated shake')
				}, 200)
				$(ele).popover('show');
				setTimeout(function() {
					$(ele).popover('destroy')
				}, 1000)
            },
            noshock(ele){
                $(ele).css('border', '1px solid #e8e8e8')
            }
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 300px;
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
		width: 140px;
        padding-top: 10px;
        text-align: right;
    }
    tbody tr:nth-child(1) td {
        padding-top: 20px;
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
	
	input[type="text"] {
		width: 180px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding: 3px;
		padding-left: 6px;
	}
	.altport{
		width: 180px;
		height: 60px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding: 3px;
		max-width:220px;
		max-height: 80px;
		padding-left: 6px;
	}
	.getmac{
		width: 60px;
		height: 20px;
		margin-left: 5px;
		background: #69b6ff;
	}

    select {
        width: 180px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding-left: 2px;
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
	.msg{
		display: inline-block;
		width: 72px;
		position: absolute;
		margin-left: 10px;
		color: #d2d2d2;
	}
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
</style>