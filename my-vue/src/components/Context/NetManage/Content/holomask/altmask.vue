<template>
	<div  class="modal" id="altmask" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table">
						<thead>
							<tr>
								<th colspan="4">修改全息伪装
									<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
								</th>
								<th class="altid" style="display: none;"></th>
							</tr>
						</thead>
						<!--正在请求-->
						<tbody class="result" v-show="result=='loading'">
							<div style="height: 240px;padding-top: 50px;">
								<img src="../../../../img/loading.gif" />
					    		<p>正在链接数据，请稍后……</p>
							</div>
						</tbody>
						<!--成功-->
						<tbody class="result" v-show="result=='success'">
							<div style="height: 240px;padding-top: 100px;">
								<img src="../../../../img/success.png" />
							</div>
						</tbody>
						<!--添加-->
						<tbody v-show="result=='add'">
							<tr>
								<td>策略名：</td>
								<td>
									<input class="altname"  type="text" data-container="body" data-toggle="popover"
									@blur="testVal('.altname', 'CLname')" @focus="noEmpty('.altname')" @keyup.enter="setMask()" >
									<span class="mi">* 必填   15字以内</span>
								</td>
							</tr>
							<tr>
								<td>源IP：</td>
								<td>
									<!--<input type="text" class="altrip" @blur="testVal('.altrip', 'ip')" @focus="noEmpty('.altrip')" @keyup.enter="setMask()" placeholder="192.168.2.1"/>-->
									<ipinput class="altrip" :empty=false></ipinput>
									<span class="mi">* 必填</span>									
								</td>
							</tr>
							<tr>
								<td>全息节点：</td>
								<td colspan="3" style="position: relative;" >
									<textarea class="altvip" placeholder='192.168.2.1
									192.168.2.2...'
									@blur="chkvips()"  @focus="noEmpty('.altvip')"></textarea>
									<span class="mi" style="position: absolute; top:15px;">* 若配置多个请换行输入,<br/>&nbsp;&nbsp;一行只有一个ip地址，<br/>&nbsp;&nbsp;最多可输10个。</span>
								</td>
							</tr>
							<tr>
								<td>VLAN ID：</td>
								<td>
									<input  type="text" @focus="noEmpty('.altvlanid')"
									@blur="testVal('.altvlanid', 'vlanid')" class="altvlanid" placeholder="1">
									<span class="mi">*必填  (0~4094的整数)</span>
								</td>
							</tr>
							<tr>
								<td>物理线路：</td>
								<td >
									<select class="altroad" @focus="noEmpty('.altroad')">
										<option v-for="road in roadNum" v-bind:value="road">
											线路{{ road }}
										</option>
									</select>
									<span class="mi">* 必填</span>									
								</td>
							</tr> 
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="altnotice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="enter button button--aylen" @click="setMask()">确认</button>
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
				errorMsg:""
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
						$(ele+' input').css('border','none')
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
			setMask(){
				this.errorMsg = ""
				$('.altnotice').hide()
				var nameTest= this.testVal('.altname', 'CLname')
				var ripTest = this.testMacIp('.altrip', 'ip')
				var vipTset = this.chkvips()
				if(nameTest&&ripTest&&vipTset){
					var vipArr = $(".altvip").val().split("\n")
					var vip = new Array()
					for(let i = 0 ; i < vipArr.length ; i++){
						if(vipArr[i] == "")continue;
						vip.push(vipArr[i])
					}
					var vipStr = ""
					vip.forEach(function(v,i,a){
						vipStr += v + ","
					})
					vipStr = vipStr.substr(0,vipStr.length-1);
					var mask = {
                        oper:"edit",
						id:$('.altid').html(),
                        name:$(".altname").val(),
                        rip:this.ipVal('.altrip'),
                        vip:vipStr,
                        vlanid:$(".altvlanid").val(),
						groupid:$(".altroad").val()
                   }
					this.result = "loading"
					netservice.setMask(mask)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {							
							this.result = "success"
							this.$emit('getData');
							setTimeout(function () {
								$('#altmask').modal('hide');
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
			chkvips(){
				var flag = true
				if( $(".altvip").val()== "" ){
					this.shock(".altvip")
					flag = false
					return flag
				}else{
					var IPReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
					var vipArr = $(".altvip").val().split("\n")
					var n = 0;
					for(let i = 0 ; i < vipArr.length ; i++){
						if(vipArr[i] == "")
						continue;
						n++;
						if( !IPReg.test(vipArr[i]) ){
							this.shock(".altvip")
							flag = false
					        return flag
						}else{
							this.noshock(".altvip")
						}
					}

					if(n > 10){
						this.shock(".altvip")
						flag = false
					    return flag
					}else{
						this.noshock(".altvip")
					}
				}	
				return flag
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
			isEmpty(ele) {
                var test = new formatTest(ele)
			    test.isEmpty()
			    $('.notice').hide()
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
		width: 30%;
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
		width: 200px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding: 3px;
		padding-left: 10px;
	}

	.altvip{
		width: 200px;
		height: 100px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding: 3px;
		max-width:200px;
		max-height: 210px;
		padding-left: 10px;
	}

    select {
        width: 200px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding-left: 5px;
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
		width: 90px;
		position: absolute;
		margin-left: 10px;
		color: #d2d2d2;
	}
	.mi {
		color: #d2d2d2;
		margin-left: 8px;
	}
	.nosele{
		color: #d2d2d2;
	}
</style>