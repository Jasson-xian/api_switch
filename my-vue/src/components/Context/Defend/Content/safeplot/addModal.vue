<template>
	<div class="modal addModal-modal-lg"  @keyup.enter="addData()"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">安全策略 > 新增配置</h3>
				</div>
				<div class="modal-body">
					<div class="blue">
						<h4>{{oper=='add'?'新增':'修改'}}安全策略配置</h4>
					</div>
					<!-- 正在请求 -->
					<div class="result" v-show="result=='reqing'">
						<img src="../../../../img/loading.gif" />
						<p style="font-size: 12px;line-height: 20px;">正在链接数据，请稍后……</p>
					</div>
					<!-- 成功 -->
					<div class="result" v-show="result=='ok'" style="line-height: 470px">
						<img src="../../../../img/success.png" />
					</div>
					<!-- table -->
					<div class="tbody" v-show="result!='ok' && result!='reqing'">
						<!-- 协议类型 -->
						<div class="line">
							<div class="tr">
								<label>协议类型：</label>
								<select class="protocol" v-model="protocol_id">
									<option v-bind:value="item.value" v-for='item in protocal_ar'>{{item.text}}</option>
								</select>
								<span style="color: #d2d2d2;margin-left: 10px;">(可通键盘，进行首字母查询)</span>
							</div>
						</div>
						<!-- IP设置 -->
						<div class="line" style="position: relative;">
							<div class="tr">
								<label>IP设置：</label>
								<select class="iptype" v-model="iptype">
									<option value="源+目">源IP+目的IP</option>
									<option value="源">源IP</option>
									<option value="目">目的IP</option>
									<option value="none">不设置IP</option>
								</select>
							</div>
							<div class="tr">
								<label :class="{'unlabel':iptype.indexOf('源')<0}">源IP：</label>
								<input class="srcIP" type="text" placeholder="127.168.1.1" :disabled="iptype.indexOf('源')<0?true:false" :class="{'unwrite':iptype.indexOf('源')<0}" @blur="testVal('.srcIP','ipRang')" @focus="isEmpty('.srcIP')">								
							</div>
							<div class="tr">
								<label :class="{'unlabel':iptype.indexOf('目')<0}">目的IP：</label>
								<input class="dstIP" type="text" placeholder="127.168.1.1" :disabled="iptype.indexOf('目')<0?true:false" :class="{'unwrite':iptype.indexOf('目')<0}" @blur="testVal('.dstIP','ipRang')" @focus="isEmpty('.dstIP')">
							</div>
							<span style="color: #d2d2d2;position: absolute; top: 70px; left: 790px;line-height:20px;">(IP格式：192.168.2.3 或 192.168.2.1-192.168.2.254 或 192.168.20/24  三种形式)</span>
						</div>
						
						<!-- 端口设置 -->
						<div class="line port" style="position: relative;">
							<div class="tr">
								<label :class="[protocol_id==6||protocol_id==17?'':'unlabel']">端口设置：</label>
								<select class="portselect" v-model='porttype' :disabled="protocol_id==6||protocol_id==17?false:true" :class="[protocol_id==6||protocol_id==17?'':'unlabel']">
									<option value="none">不设置端口</option>
									<option value="源+目">源端口+目的端口</option>
									<option value="源">源端口</option>
									<option value="目">目的端口</option>
								</select>
								<span style="color: #d2d2d2;padding: 15px;">(只有UDP协议和TCP协议可以配置端口)</span>
							</div>
							<div class="tr">
								<label :class="[porttype.indexOf('源')<0?'unlabel':'']">源端口：</label>
								<input class="srcprot" type="text" placeholder="8080,80:100,2000" :disabled="porttype.indexOf('源')<0?true:false" :class="[porttype.indexOf('源')<0?'unwrite':'']" @blur="portTest('.srcprot','protRang')" @focus="isEmpty('.srcprot')">
							</div>
							<div class="tr">
								<label :class="[porttype.indexOf('目')>=0?'':'unlabel']">目的端口：</label>
								<input class="desprot" type="text" placeholder="8080,2000,80:100" :disabled="porttype.indexOf('目')>=0?false:true" :class="[porttype.indexOf('目')>=0?'':'unwrite']" @blur="portTest('.desprot','protRang')" @focus="isEmpty('.desprot')">
							</div>
							<span style="color: #d2d2d2;position: absolute; top: 70px; left: 790px;line-height:20px; width: 300px;">(端口形式：80 或 80:100的两种形式，可配置多个，用逗号隔开，最多可配置10个，其中80:100指的是80~100中的21个端口)</span>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="button button--aylen" @click='addData()'>确认</button>
					<button class="button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import ProtocolData from 'libs/ProtocolData'
	import formatTest from 'libs/formatTest'

	export default {
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
			modID: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				iptype: "源+目",
				porttype: 'none',
				protocol_id: 138,
				protocal_ar: ProtocolData.data
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
			},
			protocol_id: function() {
				if(this.protocol_id == 6 || this.protocol_id == 17) {
					this.porttype = '源+目'
				} else {
					this.porttype = 'none'
				}
			}
		},
		methods: {
			addData() {
				
				var srcIPTest = this.testVal('.srcIP', 'ipRang')
				if(srcIPTest) {
					var dstIPTest = this.testVal('.dstIP', 'ipRang')
					if(dstIPTest) {
						var srcprotTest = this.portTest('.srcprot', 'protRang')
						if(srcprotTest) {
							var desprotTest = this.portTest('.desprot', 'protRang')
						}
					}
				}
				if(srcIPTest && dstIPTest && srcprotTest && desprotTest) {
					var sentdata = {
						oper: this.oper,
						protocal_id: $('.protocol option:selected').val()
					}
					var srcIPVal = $('.srcIP').val()
					var dstIPVal = $('.dstIP').val()
					var sportsVal = $('.srcprot').val()
					var dportsVal = $('.desprot').val()
					if(srcIPVal) {
						sentdata.src = srcIPVal
					}
					if(dstIPVal) {
						sentdata.dst = dstIPVal
					}
					if(sportsVal) {
						sentdata.sports = sportsVal
					}
					if(dportsVal) {
						sentdata.dports = dportsVal
					}
					if(this.oper == 'edit') {
						sentdata.iptableid = this.modID
					}
					this.$emit('getData', sentdata)
					
				}

			},
			testVal: function(ele, reg) {
				var test = new formatTest(ele, reg, true)
				return test.testFormat()
			},
			portTest: function(ele, reg) {
				var formatTest = this.testVal(ele, reg)			
				if(formatTest) {
					var format = true
					var portVal = $(ele).val()
					var valArr = portVal.split(",")
					for(let i = 0; i < valArr.length; i++) {
						if(valArr[i].indexOf(':')) {
							var portArr = valArr[i].split(":")							
							if(Number(portArr[0]) > Number(portArr[1])) {
								$(ele).css('border', '1px solid #b63039')
								$(ele).addClass('animated shake')
								setTimeout(function() {
									$(ele).removeClass('animated shake')
								}, 200)							
								format = false
								return false
							}
						}
					}
                    return format
				}else{
				    return formatTest
				}
				
			},
			isEmpty: function(ele) {
				var test = new formatTest(ele)
				test.isEmpty()
				$('.notice').hide()
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		width: 1200px;
		margin-top: 250px;
	}
	
	.modal-header {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding: 5px 20px;
	}
	
	.blue {
		background: #69b6ff;
		height: 30px;
		padding: 0 15px;
		color: #FFFFFF;
	}
	
	h4 {
		line-height: 30px;
	}
	
	.close {
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
	
	select {
		width: 250px;
		height: 25px;
		border-radius: 5px;
		border: 1px solid #e6e6e6;
	}
	
	p {
		text-align: center;
		margin: 15px 0;
		font-size: 16px;
	}
	
	.tbody {
		border: 1px solid #69b6ff;
	}
	
	label {
		width: 250px;
		text-align: right;
		margin-left: 200px;
		margin-right: 50px;
	}
	
	.line {
		display: inline-block;
		border-bottom: 1px solid #e1f0ff;
		width: 100%;
		padding: 20px;
	}
	
	.tr {
		height: 40px;
		line-height: 40px;
	}
	
	.unwrite {
		background: #e6e6e6;
		text-decoration: line-through;
	}
	
	.unlabel {
		text-decoration: line-through;
		color: #843534;
	}
	
	.result {
		text-align: center;
		line-height: 300px;
	}
	
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	
	.modal-body {
		height: 470px;
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