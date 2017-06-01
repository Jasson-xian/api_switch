<template>
	<div class="modal addModal-modal-lg" @keydown.enter='modData()' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">修改主机备注</h3>
				</div>
				<div class="modal-body">
					<!-- 正在请求 -->
					<div class="result" v-show="result=='reqing'" >
						<img style="width: 80px;" src="../../../../img/loading.gif" />
					    <p style="font-size: 12px;line-height: 20px;">正在链接数据，请稍后……</p>
					</div>
					<!-- 成功 -->
					<div class="result" v-show="result=='ok'" style="line-height:120px;">
						<img  src="../../../../img/success.png" />
					</div>					
					<!-- table -->
					<div class="tbody" v-show="result!='ok' && result!='reqing'">
						<div class="tr">
							<label>MAC地址:</label>
							<macinput :empty = "false" class="macIP"></macinput>
							<span class="mi">* 必填</span>							
						</div>
						<div class="tr">
							<label>备注：</label>
							<input class="note" type="text" @blur="testVal('.note','allpass')" @focus="isEmpty('.note')" placeholder="默认">
							<span class="mi">* 必填</span>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="button button--aylen" @click='modData()'>确认</button>					
					<button class="button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import ProtocolData from 'libs/ProtocolData'
	import formatTest from 'libs/formatTest'
	import macinput from 'components/libs/macinput'

	
	export default {
		components:{
			macinput
		},
		props: {
			result: {
				type: String,
				required: true
			},
			errorMsg: {
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
				}else if(this.result == 'error'){
					$('.modal .notice').show()
			    }
			}
		},
		methods: {
			modData() {
				$('.notice').hide()
				let macVal = this.macVal('.macIP')
				var macTest = this.testmac('.macIP')				
				var noteTest =this.testVal('.note','allpass')			         
				if(macTest&&noteTest){
					var sentdata = {
						oper: 'edit',
						macs: macVal,
						desc: $('.note').val()
					}
					this.$emit('getData',sentdata)
				}				
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
			testmac(ele){
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
			testVal: function(ele, reg) {
			    var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				return test.testFormat()			
			},
			isEmpty: function(ele) {
				var test = new formatTest(ele)
				test.notEmpty()
				$('modal .notice').hide()
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 300px;
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
	.close{
		margin-top: 2px;		
		color: #FFFFFF;
	}
	.button {
		width: 80px;
		height: 30px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
		margin-right: 15px;
	}
	
	input {
		width: 250px;
		height: 25px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		padding: 0 10px;
	}

	p {
		text-align: center;
		margin: 15px 0;
		font-size: 16px;
	}
	label {
		width: 80px;
		text-align: right;
		margin-left: 100px;
		margin-right: 10px;
	}
	
	.line {
		display: inline-block;
		border-bottom: 1px solid #e1f0ff;
		width: 100%;
		padding: 20px;
	}
	
	.tr {
		margin-top: 20px;
	}
	.result {
		text-align: center;
	}
	
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	.modal-body{
		height: 140px;
	}
	.modal-footer {
		position: relative;
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
</style>