<template>
	<div class="modal  addModal-modal-lg"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">{{this.oper=='add'?'添加':'编辑'}}{{name}}</h3>
				</div>
				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-show="result=='reqing'">
						<img src="../img/loading.gif" />
					    <p>正在链接数据，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-show="result=='ok'" style="line-height: 120px;">
						<img  src="../img/success.png" />
					</div>					
					<!--table-->
					<div class="tbody" v-show="result!='ok' && result!='reqing'">
						<ul class="tr">
							<li>
								<label>
									<span @click="labelType('ip')" :class="labtype=='ip'?'':'gray'"> IP </span>
									<span>|</span>
									<span  @click="labelType('mac')" :class="labtype=='mac'?'':'gray'"> MAC </span>：
								</label>
								<ipinput :empty = "false"  v-if="labtype=='ip'"  class="addip"></ipinput>
								<macinput :empty = "false"  v-else-if="labtype=='mac'"  class="addmac"></macinput>
								<span class="mi">* 必填</span>
							</li>
						</ul>
						<div class="tr">
							<label>进入原因 : </label>
							<textarea rows="2" type="text" class="reason" placeholder="默认" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class=" button button--aylen" @click='addData()'>确认</button>					
					<button  class=" button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import ProtocolData from 'libs/ProtocolData'
	import formatTest from 'libs/formatTest'
    import ipinput from 'components/libs/ipinput'
	import macinput from 'components/libs/macinput'
	export default {
		components: {
			ipinput,
			macinput			
		},
		data(){
               return{
				   labtype:'ip'
			   }
			},
		props: {
			result: {
				type: String,
				required: true
			},
			errorMsg: {
				type: String,
				required: true
			},
			oper: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			}
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					setTimeout(function() {
						$('.addModal-modal-lg').modal('hide')
					}, 500)
				} else if(this.result == 'error') {
					$('.notice').show()
				}
			}
		},
		methods: {
			labelType(type){
               this.labtype = type
			},		
			addData() {				
				var testOK = this.testMacIp()
				if(testOK) {
					this.$emit('getSetData')
				}
			},			
			testVal: function(ele, reg) {
				var test = new formatTest(ele, reg, false)
				return test.testFormat()
			},
			isEmpty: function(ele) {
				var test = new formatTest(ele)
				test.notEmpty()
				$('.notice').hide()
			},
			testMacIp(){
				let ip = this.ipVal('.addip')
				let mac = this.macVal('.addmac')				
				if(ip){
                    this.testIp(".addip")
				}else if(mac){
					this.testMac(".addmac")
				}else{
					this.testIp(".addip")
					this.testMac(".addmac")
					return false
				}
			},
			testIp(ele){
					let ip_a_test = this.testVal(ele+' .ip_a', 'ip_piece')
				    let ip_b_test = this.testVal(ele+' .ip_b', 'ip_piece')
					let ip_c_test = this.testVal(ele+' .ip_c', 'ip_piece')
					let ip_d_test = this.testVal(ele+' .ip_d', 'ip_piece')
					if(ip_a_test&&ip_b_test&&ip_c_test&&ip_d_test){
                        return true
					}else{
						return false
					}
			},
			testMac(ele){
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
			},
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
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 350px;
	}
	
	.modal-header {
		background: #69b6ff;
		height: 30px;
		padding: 0 15px;
		color: #FFFFFF;
	}
	
	h3 {
		line-height: 30px;
	}
	
	.close {
		margin-top: 2px;
		color: #FFFFFF;
	}
	
	label {
		width:80px;
		text-align: right;
		margin-right: 5px;
	}
	
	label:nth-child(2) {
		width: 40px;
	}
	
	li {
		display: inline-block;
	}
	
	textarea {
		border: 1px solid #e6e6e6;
		vertical-align: top;
		resize: vertical;
		border-radius: 5px;
		max-height: 60px;
		width: 450px;
		padding: 5px;
	}
	
	.tr {
		margin-top: 20px;
	}
	
	.modal-body{
		height: 150px;
	}
	.modal-footer {
		position: relative;
	}
	
	.button {
		width: 80px;
		height: 30px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
		margin-right: 15px;
	}
		
	.result {
		text-align: center;
		height: 150px;
	}
	
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	.notice {
		position: absolute;
		top: 20px;
		left: 20px;
		display: none;		
	}
	
	.notice span {
		display: inline-block;
		color: #b63039;
		width: 350px;
		text-align: left;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gray{
		color: #B7B7B7;
	}
</style>