<template>
	<div @keyup.enter="setTrunk()" @click.self='dataFresh()' class="modal" id="addtrunk" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table">
						<thead>
							<tr>
								<th colspan="2">{{oper}}终端透传
									<span class="close" @click='dataFresh()' data-dismiss="modal" aria-hidden="true">&times;</span>
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
						<tbody v-show="result!='loading'&&result!='success'">
							<tr class="id" style="display: none;"></tr>
							<tr>
								<td>Mac地址：</td>
								<td>
									<!--<input class="addr-input mac"  type="text"  @focus="noEmpty('.mac')"
									@blur="testVal('.mac', 'mac')"  placeholder="1a:2b:3c:4d:5e:6f">-->
									<macinput class="mac" :empty=false></macinput>
									<span class="mi">* 必填</span>	
								</td>								
							</tr>
							<tr>
							<td>IP地址：</td>
								<td>
									<!--<input class="addr-input abcd"  type="text" @focus="noEmpty('.abcd')"
									@blur="testVal('.abcd', 'ip')" placeholder="192.168.2.1" >-->
									<ipinput class="abcd" :empty=false></ipinput>
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
					<button class="enter button button--aylen" @click="setTrunk()">确认</button>
					<button class="cancel button button--aylen" @click='dataFresh()' data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import netservice from 'services/netService'
	import formatTest from 'libs/formatTest'
	import ipinput from 'components/libs/ipinput'
	import macinput from 'components/libs/macinput'
	export default {
		components:{
			ipinput,
			macinput
		},
		props:{
			result:{
				type:String,
				required:true
			},
			oper:{
				type:String,
				required:true
			},
			errorMsg:{
				type:String,
				required:true
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
			macVal(ele){
               let macVal = ($(ele+' .mac_a').val()?$(ele+' .mac_a').val():"")+
				            ($(ele+' .mac_b').val()?':'+$(ele+' .mac_b').val():"")+
							($(ele+' .mac_c').val()?':'+$(ele+' .mac_c').val():"")+
							($(ele+' .mac_d').val()?':'+$(ele+' .mac_d').val():"")+
							($(ele+' .mac_e').val()?':'+$(ele+' .mac_e').val():"")+
							($(ele+' .mac_f').val()?':'+$(ele+' .mac_f').val():"")
			   return macVal
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
						$(ele+' input').css('border','none')
                        return true
					}else{
						return false
					}
				}
			},
			setTrunk(){
				$('.notice').hide()
				if(this.testMacIp('.mac','mac') && this.testMacIp('.abcd','ip')){
					this.$emit('getData');
				}
			},
			dataFresh(){
				$('.notice').hide()
				$('.notice').hide()
				$('.mi').css('color', '#d2d2d2')
				$('.modal input').css('border', '1px solid #e8e8e8')
				$('.modal .input_wrap input').css('border', 'none')
			},
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				var flag = test.testFormat()
				return flag
			}
		},
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
    table{
        width: 100%;
        margin-bottom: 10px; 
    }
	thead {
		background: #69b6ff;
        border-radius: 5px;
	}
	th {
		color: #ffffff;
		height: 40px;
		padding: 0 15px;
	}
	td {
		padding: 0 15px;
	}
	table thead tr th {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    tbody tr td:nth-child(1) {
        text-align: right;
		width: 27%;
		vertical-align: middle;	
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
	
	input {
		width: 240px;
		height: 23px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
		padding-left:10px;
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
</style>