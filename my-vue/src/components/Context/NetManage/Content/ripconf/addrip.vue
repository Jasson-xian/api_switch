<template>
    <div @keyup.enter="setrip()" class="modal addModal-modal" id="addrip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="hash_code" style="display: none;"></div>
					<table class="table">
						<thead>
							<tr>
								<th colspan="2"> {{oper =='edit'?'修改':'添加'}}真实IP网段配置
									<span class="close"  data-dismiss="modal" aria-hidden="true">&times;</span>
								</th>
							</tr>
						</thead>
						<!--正在请求-->
						<tbody class="result" v-show="result=='loading'">
							<div style="height: 156px;padding-top: 10px;">
								<img src="../../../../img/loading.gif" />
					    		<p>正在链接数据，请稍后……</p>
							</div>
						</tbody>
						<!--成功-->
						<tbody class="result" v-show="result=='ok'">
							<div style="height: 156px;padding-top: 60px;">
								<img src="../../../../img/success.png" />
							</div>
						</tbody>
						<!--添加-->
						<tbody v-show="result!='ok' && result!='loading'">
							<tr>
								<td style="line-height: 20px">网段：</td>
								<td>
									<!--<input type="text"  @focus="noEmpty('.abcd')"
									@blur="testVal('.abcd', 'ip')"  class="abcd" placeholder="192.168.1.0">-->
									<ipinput class="abcd" :empty=false></ipinput>
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>掩码：</td>
								<td>
									<!--<input type="text" @focus="noEmpty('.mask')"
									@blur="testVal('.mask', 'mask')"  class="mask" placeholder="255.255.0.0">-->
									<div class="input_wrap mask">
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask1('.maskip_a')" class="ip_input maskip_a ip_a" type="text"> . 
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask4('.maskip_b',1)" class="ip_input maskip_b ip_b" type="text"> . 
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask4('.maskip_c',2)" class="ip_input maskip_c ip_c" type="text"> .
										<input  maxlength="3" @focus = "notEmptymask($event)" @keyup="upnext($event)" @keydown="nextInput($event)" @blur = "testmask4('.maskip_d',3)" class="ip_input maskip_d ip_d" type="text">
									</div>
									<span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>VLAN ID：</td>
								<td>
									<input type="text" @focus="noEmpty('.vlanid')"
									@blur="testVal('.vlanid', 'vlanid')"  class="vlanid" placeholder="1">
									<span class="mi">* 必填  (0~4094的整数)</span>
								</td>
							</tr>
							<tr>
								<td>线路：</td>
								<td>
									<select class="route" :class="[options.length<=0?'nosele':'']"  @focus="noEmpty('.route')"
									@blur="testVal('.route', 'allpass')"  :disabled="options.length > 0 ? false : true">
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
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="enter button button--aylen" @click="setrip()">确认</button>
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
				options:[],
			}
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					setTimeout(function() {
						$("#addrip").modal('hide')
					}, 500)
				} else if(this.result == 'error') {
					$('.notice').show()
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
				let ip_a_test = this.testmask1('.maskip_a')
				let ip_b_test = this.testmask4('.maskip_b',1)
				let ip_c_test = this.testmask4('.maskip_c',2)
				let ip_d_test = this.testmask4('.maskip_d',3)
				if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
					return true
				}else{
					return false
				}
			},
			setrip(){
				let abcd=this.ipVal('.abcd')
				let mask=this.ipVal('.mask')
				if( this.testMacIp('.abcd','ip') && this.masktest() 
				&& this.testVal('.vlanid', 'vlanid') && this.testVal('.route', 'allpass') ){
					var ripconfig = {
						type:this.oper == 'edit'?"edit_rip":"add_rip",
						abcd:abcd,
						mask:mask,
						vlanid:$(".vlanid").val(),
						groupid:$(".route").val()
					};
					if(this.oper == 'edit'){
						ripconfig.hash_code = $('.hash_code').html()
					}
					this.$emit('getAddModData',ripconfig);
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
			    $('.notice').hide()
			},
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			    $('.notice').hide()
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				var flag = test.testFormat()
				if( !flag ){
					if(ele=='.vlanid'){
						$(ele).popover('show');
						setTimeout(function() {
							$(ele).popover('destroy')
						}, 1000)
					}
				}
				return flag
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
					if($(ele).val().trim()!='0'){
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
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 360px;
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
        width: 500px;
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
        padding-top: 12px;
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
	.notice {
		position: absolute;
		bottom: 20px;
		left: 20px;
		display: none;
	}
	.notice span {
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