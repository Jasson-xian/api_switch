<template>
	<div class="modal  addModal-modal-lg" @keyup.enter="addData()" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">{{this.oper=='add'?'添加':'修改'}}蜜罐主机</h3>
				</div>
				<div class="modal-body">
					<!-- 正在请求 -->
					<div class="result" v-show="result=='reqing'">
						<img src="../../../../img/loading.gif" />
						<p style="font-size:12px;line-height: 20px;">正在链接数据，请稍后……</p>
					</div>
					<!-- 成功 -->
					<div class="result" v-show="result=='ok'" style="line-height: 160px;">
						<img src="../../../../img/success.png" />
					</div>
					<!-- table -->
					<div class="tbody" v-show="result!='ok' && result!='reqing'">
						<div class="tr">
							<label>虚拟端口：</label>
							<input class="vport" type="text" @blur="testVal('.vport','prot')" @focus="isEmpty('.vport')" placeholder="8080">
							<span class="mi">* 必填</span>
						</div>
						<div class="tr">
							<label>蜜罐主机IP：</label>
							<select class="hostIP" :class="[IPArr.length<=0?'nosele':'']" :disabled="IPArr.length?false:true"  @change="isEmpty('.hostIP')" >
								<option v-if='IPArr.length<=0' >没有静态主机</option>								
								<option v-else v-for='item in IPArr'>{{item}}</option>
							</select>
							<span class="mi">* 必选</span>
						</div>
						<div class="tr">
							<label>蜜罐主机端口：</label>
							<input class="hostport" type="text" @blur="testVal('.hostport','prot')" @focus="isEmpty('.hostport')"  placeholder="8080">
							<span class="mi">* 必填</span>
						</div>
					</div>
					
				</div>
				<div class="modal-footer">
					<!-- 错误信息 -->
					
					<div class="addnotice">
						<span>{{notice}}</span>
					</div>
					<div class="notice">
						<span>{{errorMsg}}</span>
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
	import netService from 'services/netService'
	export default {
		props: {
			result: {
				type: String,
				required: true
			},
			oper: {
				type: String,
				required: true
			},
			errorMsg: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				IPArr: [],
				notice: ''
			}
		},
		mounted() {
			this.getIPaddress()
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
			getIPaddress() {
				var sentdata = {
					oper: ''
				}
				netService.bindIp(sentdata)
					.then((recvdata) => {
						recvdata = JSON.parse(recvdata)
						if(recvdata.success) {		
							if(recvdata.data.config.length > 0) {
								for(let i = 0; i < recvdata.data.config.length; i++) {
									this.IPArr[i] = recvdata.data.config[i].ABCD
								}	
								this.notice = "(蜜罐主机需要先配置为静态主机,可到->网络管理/静态地址 配置)"
								$('.addnotice span').css('color', '#d2d2d2')
							} else {
								this.notice = "*请到 '网络管理/静态地址/添加静态地址'--绑定静态主机"
								$(".addnotice span").css('color', '#b63039')
							}
						}
					})
			},
			addData() {
				var testVport = this.testVal('.vport', 'prot')
				if(testVport) {
					var testHostIP = this.testVal('.hostIP','ip')
					if(testHostIP){
						var testHostPort = this.testVal('.hostport', 'prot')
					}					
				}
				if(testVport &&testHostIP&& testHostPort) {
					this.$emit('getData')
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
				$('.notice').hide()
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
	
	.close {
		color: #FFFFFF;
		margin-top: 3px;
	}
	
	.button {
		width: 80px;
		height: 30px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
		margin-right: 15px;
	}
	
	input,
	select {
		width: 200px;
		height: 25px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		padding: 0 10px;
	}
	
	.tr {
		margin-top: 20px;
	}
	
	p {
		text-align: center;
		margin: 15px 0;
		font-size: 16px;
	}
	
	label {
		width: 220px;
		text-align: right;
		margin-right: 10px;
	}
	
	.result {
		text-align: center;
		line-height: 120px;
	}
	
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	
	.modal-body {
		height: 180px;
	}
	
	.modal-footer {
		position: relative;
	}
	
	.notice ,.addnotice {
		position: absolute;	
		left: 20px;	
		margin-bottom: 10px;	
	}
	.notice{
		top: 40px;
		line-height: 45px;
		display: none;
	}
	.addnotice{
		top:10px;		
	}
	.notice span,.addnotice span {
		display: inline-block;
		color: #b63039;
		width: 350px;
		text-align: left;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.nosele{
		color: #d2d2d2;
	}
</style>