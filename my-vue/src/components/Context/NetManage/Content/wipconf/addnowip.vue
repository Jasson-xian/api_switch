<template>
	<div @keyup.enter="setNowip()" class="modal" id="addnowip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="hash_code_no" style="display: none;"></div>
					<table class="table">
						<thead>
							<tr>
								<th colspan="2">{{oper =='edit'?'修改':'添加'}}外网保留IP网段配置
									<span class="close"  data-dismiss="modal" aria-hidden="true">&times;</span>
								</th>
							</tr>
						</thead>
						<!--正在请求-->
						<tbody class="result" v-show="result=='loading'">
							<div style="height: 192px;padding-top: 30px;">
								<img src="../../../../img/loading.gif" />
					    		<p>正在链接数据，请稍后……</p>
							</div>
						</tbody>
						<!--成功-->
						<tbody class="result" v-show="result=='ok'">
							<div style="height: 192px;padding-top: 80px;">
								<img src="../../../../img/success.png" />
							</div>
						</tbody>
						<!--添加-->
						<tbody v-show="result!='ok' && result!='loading'">
							<tr>
								<td style="line-height: 20px;">网段：</td>
								<td>
									<!--<input  type="text"  @focus="noEmpty('.noabcd')"
									@blur="testVal('.noabcd', 'ip')"  class="noabcd" placeholder="192.168.1.0">-->
									<ipinput class="noabcd" :empty=false></ipinput>
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>掩码：</td>
								<td>
									<!--<input  type="text"  @focus="noEmpty('.nomask')"
									@blur="testVal('.nomask', 'mask')"  class="nomask" placeholder="255.255.0.0">-->
									<div class="input_wrap nomask">
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask1('.nomaskip_a')" class="ip_input nomaskip_a ip_a" type="text"> . 
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask4('.nomaskip_b',1)" class="ip_input nomaskip_b ip_b" type="text"> . 
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask4('.nomaskip_c',2)" class="ip_input nomaskip_c ip_c" type="text"> .
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask4('.nomaskip_d',3)" class="ip_input nomaskip_d ip_d" type="text">
									</div>
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>网关地址：</td>
								<td>
									<!--<input type="text" @focus="noEmpty('.nogateway')"
									@blur="testVal('.nogateway', 'ip')"  class="nogateway" placeholder="192.168.1.1">-->
									<ipinput class="nogateway" :empty=false></ipinput>
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>VLAN ID：</td>
								<td>
									<input  type="text"  @focus="noEmpty('.novlanid')"
									@blur="testVal('.novlanid', 'vlanid')" class="novlanid" placeholder="1">
									<span class="mi">* 必填  (0~4094的整数)</span>
								</td>
							</tr>
							<tr>
								<td>线路：</td>
								<td>
									<select  class="noroute"  :class="[options.length<=0?'nosele':'']" @focus="noEmpty('.noroute')"
									@blur="testVal('.noroute', 'allpass')" :disabled="options.length > 0 ? false : true">
										<option v-if="options.length>0" v-for="option in options" v-bind:value="option">
											线路{{ option }}
										</option>
										<option v-if="options.length<=0" value="">
											没有线路
										</option>
									</select>
									<span class="mi">* 必填</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="nonotice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="enter button button--aylen" @click="setNowip()">确认</button>
					<button class="cancel button button--aylen" data-dismiss="modal">取消</button>
				</div>
    		</div>
		</div>
	</div>
</template>
<script>
	import netservice from 'services/netService'
	import sysservice from 'services/systemService'
	import formatTest from 'libs/formatTest'
	import ipinput from 'components/libs/ipinput'

	export default {
		components:{
			ipinput
		},
		props:{
			result: {
				type: String,
				required: true
			},
			oper:{
				type:String,
				required:true
			},
			errorMsg: {
				type: String,
				required: true
			}
		},
		mounted(){
			this.getGroups()
		},
		data(){
			return {
				options:[]
			}
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					setTimeout(function() {
						$('#addnowip').modal('hide')
					}, 500)
				} else if(this.result == 'error') {
					$('.nonotice').show()
				}
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
				}
			},
			masktest(){
				let ip_a_test = this.testmask1('.nomaskip_a')
				let ip_b_test = this.testmask4('.nomaskip_b',1)
				let ip_c_test = this.testmask4('.nomaskip_c',2)
				let ip_d_test = this.testmask4('.nomaskip_d',3)
				if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
					return true
				}else{
					return false
				}
			},
			 setNowip(){
				let noabcd=this.ipVal('.noabcd')	
				let nomask=this.ipVal('.nomask')
				let nogateway=this.ipVal('.nogateway')
				if( this.testMacIp('.noabcd','ip') && this.masktest() && this.testMacIp('.nogateway','ip')
				 && this.testVal('.novlanid', 'vlanid') && this.testVal('.noroute', 'allpass')){
					var wipconfig = {
						type:this.oper == 'edit'?"edit_nowip":"add_nowip",
						abcd:noabcd,
						mask:nomask,
						vlanid:$(".novlanid").val(),
						groupid:$(".noroute").val(),						
						gateway:nogateway,
					};
					if(this.oper == 'edit'){
						wipconfig.hash_code = $('.hash_code_no').html()
					}
					this.$emit('getAddModData',wipconfig);
            	}
			},
			getGroups(){
				sysservice.getRoadNum()
				.then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success){
						this.options = recvdata.data
						this.route = this.options[0]
					}
				})
			},
			isEmpty(ele) {
                var test = new formatTest(ele)
			    test.isEmpty()
			    $('.nonotice').hide()
			},
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			    $('.nonotice').hide()
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				var flag = test.testFormat()
				return flag
			},
			wrong(ele){
				$(ele).css('border', '1px solid #b63039')
				$(ele).css('border-radius', '0px')
				$(ele).addClass('animated shake')
				setTimeout(function() {
					$(ele).removeClass('animated shake')
				}, 200)
			},
			testmask1(ele) {
				var reg=/^255|254|252|248|240|224|192|128|0$/
				if(reg.test($(ele).val())){
					$(ele).css("border",'none')
					return true
				}else{
					this.wrong(ele)
					return false
				}
			},
			testmask4(ele,key) {
				var reg=/^255|254|252|248|240|224|192|128|0$/
				let status=false
				switch (key) {
					case 1:
						status=$(ele).prev().val()!=255
						break;
					case 2:
						status=$(ele).prev().val()!=255||$(ele).prev().prev().val()!=255
						break;
					case 3:
						status=$(ele).prev().val()!=255||$(ele).prev().prev().val()!=255||$(ele).prev().prev().prev().val()!=255
						break;	
					default:
						break;
				}
				if(status){
					if($(ele).val()!='0'){
						this.wrong(ele)
						return false
					}else{
						$(ele).css("border",'none')
						return true
					}
				}else{
					if(reg.test($(ele).val().trim())){
						$(ele).css("border",'none')
						return true
					}else{
						this.wrong(ele)
						return false
					}
				}	
			},
			notEmptymask: function(event) {
				let ele = event.currentTarget
				var test = new formatTest(ele)
				test.notEmpty()
			},
			nextInput(event){          
				if(event.keyCode==110||event.keyCode==190){
				event.preventDefault()
				$(event.currentTarget).next().focus()    
				}   
			},
			upnext(event){
				if($(event.currentTarget).val().length>=3){
				$(event.currentTarget).next().focus()    
				}   
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 345px;
        margin-left: 45%;
		width: 500px;
	}
    .modal-content {
        width: 502px;
        border: 1px solid #69b6ff;
		margin: 0;
		position: relative;
    }
	.modal-body {
        padding: 0px;
        width: 500px;
    }
    .table{
        width: 100%;
        margin-bottom: none; 
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
        padding-top: 10px;
        text-align: right;
        width: 30%;
    }
    tbody tr:nth-child(1) td {
        padding-top: 20px;
    }
    
    tbody tr td:nth-child(2) {
        text-align: left;	
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
	
	input[type='text'] {
		width: 150px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding: 3px;
	}
    select {
        width: 150px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
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
	.nonotice {
		position: absolute;
		bottom: 20px;
		left: 20px;
		display: none;
	}
	
	.nonotice span {
		display: inline-block;
		color: #b63039;
		width: 200px;
		text-align: left;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	.nosele{
		color: #d2d2d2;
	}
	.input_wrap input{
		width: 36px;
		height: 100%;
		text-align: center;
		padding: 0;
	    color: #555;
        border: none; 
	}
	.input_wrap{
        display: inline-block;	
		width: 180px;
		height: 25px;
		border: 1px solid  #e8e8e8;
		border-radius: 5px;
		box-sizing: border-box;
        color: #999;
	}
</style>