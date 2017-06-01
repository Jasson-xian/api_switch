<template>
	<div class="modal" @keydown.enter="toAdd()" id="addmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">添加服务器</h3>
				</div>
				<div class="body">
					<!--正在请求-->
					<div class="result" v-show="result=='reqing'">
						<img src="../../../../img/loading.gif"/>
					    <p style="font-size: 12px;line-height: 20px;">正在链接数据，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-show="result=='ok'" style="line-height: 280px;">
						<img  src="../../../../img/success.png" />
					</div>
					<!--table-->
					<div class="server-wrap" v-show="result!='ok' && result!='reqing'">
						<div class="title">
							<h4>日志服务器{{serverNum+1}}</h4>
						</div>
						<ul class="sever-btn">
							<li>
								<label>服务器地址：</label>
								<div class="input_wrap severIP">
									<input  maxlength="3" @focus = "isEmpty($event)" @keyup="upnext($event)" 
									@keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',false)" class="ip_input ip_a" type="text"> . 
									<input  maxlength="3" @focus = "isEmpty($event)" @keyup="upnext($event)" 
									@keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',false)" class="ip_input ip_b" type="text"> . 
									<input  maxlength="3" @focus = "isEmpty($event)" @keyup="upnext($event)"
									@keydown="nextInput($event)"@blur = "testFormat($event,'ip_piece',false)" class="ip_input ip_c" type="text"> .
									<input  maxlength="3" @focus = "isEmpty($event)" @keyup="upnext($event)"
									@keydown="nextInput($event)" @blur = "testFormat($event,'ip_piece',false)" class="ip_input ip_d" type="text">
								</div>	
								<!--<input type="text" class="severIP" @blur="testVal('.severIP','ip',false)" @focus="isEmpty('.severIP')" placeholder="127.0.0.1" />-->
								<span class="mi">* 必填</span>								
							</li>
							<li>
								<label>服务器端口：</label>
								<input type="text" class="severPort" @blur="testVal('.severPort','prot',false)"  @focus="isEmpty('.severPort')"  placeholder="8080" />
								<span class="mi">* 必填</span>								
							</li>
						</ul>
						<div class="logtype" >
							<ul class="add_logLabel">
								<li>
									<label >日志类型：</label>									
									<span class="line"></span>									
									<input style="margin-left: 10px;" type="checkbox" id ='all' @click='checkedall()'/>
									<label for="all" style=" font-weight: 500; margin-left: 3px;">全选</label>
									<span class="mi">（* 不能少于一种）</span>	
								</li>
													
							</ul>
							<ul class="buts">
								<li>
									<input type="checkbox" id="a"  class="check" value="1" @change="isSelect()"/>
									<label for="a">渗透日志</label>
								</li>
								<li>
									<input type="checkbox" id="b"  class="check" value="4" @change="isSelect()"/>
									<label for = "b">主机下线日志</label>
								</li>
								<li>
									<input type="checkbox" id="c"  class="check" value="5" @change="isSelect()"/>
									<label for = "c">封堵日志</label>
								</li>
								<br/>
								<li>
									<input type="checkbox" id="d" class="check" value="6" @change="isSelect()"/>
									<label for = "d">解封日志</label>
								</li>
								<li>
									<input type="checkbox" id="f" class="check" value="8" @change="isSelect()"/>
									<label for ='f'>命令日志</label>
								</li>
								<li>
									<input type="checkbox" id="e" class="check" value="7" @change="isSelect()"/>
									<label for ='e'>主机变换日志</label>
								</li>
								<li>
									<input type="checkbox" id="g"  class="check" value="9" @change="isSelect()"/>
									<label for ='g'>事件日志</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<!--错误信息-->
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>		
					<button type="button" class="sure button button--aylen" @click="toAdd()">确定</button>					
					<button type="button" class="cancel button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import ipinput from 'components/libs/ipinput'
	import logManageService from 'services/logManageService'
	import formatTest from 'libs/formatTest'

	export default {
		components:{
			ipinput
	    },
		props: {
			serverNum: {
				type: Number,
				required: true
			},
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
						$('#addmodal').modal('hide')
					}, 500)
				}else if(this.result == 'error'){
					$('.notice').show()
				}
			}
		},
		methods: {
			checkedall(){
				if($('#all').prop('checked')) {
					$(".buts input").prop('checked',true);
				}else{
					$(".buts input").prop('checked',false);
				}
				this.isSelect()
			},
			toAdd() {
				var ipTest = this.testIp('.severIP')				
				var protTest = this.testVal('.severPort', 'prot',false)					
				var typeSelect = this.isSelect()				
				if(ipTest & protTest & typeSelect) {
					var sentData = {
						 oper: 'add',
						 switch :1,
					     severIP :this.ipVal('.severIP') ,
					     severProt: $('.severPort').val().trim()	,
					     types : this.getTypes()
					}					
					this.$emit('getData',sentData)
				}
			},
			ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
			},
			getTypes() {
				var addArr = []
				$('.buts .check').each(function(index, e) {
					if($(e).prop("checked")) {
						addArr.push($(e).val())
					}
				})
				var addtype = addArr.join(",")
				return addtype
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
			testFormat(event,reg, empty) {
				let ele = event.currentTarget
				var test = new formatTest(ele,reg, empty)
				let result =  test.testFormat();
					if(result){
						$(ele).css("border",'none')
					}
					return result
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
			testVal: function(ele, reg, empty) {
				var test = new formatTest(ele, reg ,empty)
				return test.testFormat()
			},
			isEmpty: function(ele) {								
				var test = new formatTest(ele)
				test.notEmpty()		
				$('.notice').hide()
			},
			isSelect() {
				//是否选择日志类型
				var addArr = []
				$('.buts .check').each(function(index, e) {
					let check = $(e).prop("checked")
					if(check) {
						addArr.push($(e).val())
					}
				})
				if(addArr.length <=0) {
		            $('.add_logLabel .mi').css('color', '#b63039')
		            $('#all').prop('checked',false)
					return false
				}else if(addArr.length >=7){
					$('#all').prop('checked',true)
					return true
				} else {
		            $('.add_logLabel .mi').css('color', '#d2d2d2')		
		             $('#all').prop('checked',false)
					return true
				}
			}

		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 300px;
		width: 1200px;
	}
	
	.modal-header {
		background: #333333;
		color: #FFFFFF;
		height: 30px;
	}
	
	.modal-header h3 {
		margin-top: -8px;
	}
	
	.close {
		margin-top: -13px;
		color: #FFFFFF;
	}
	
	.body {
		padding: 0 30px;
	}
	
	.button {
		width: 80px;
		height: 30px;
		border-radius: 5px;
		color: #FFFFFF;
		margin-right: 15px;
		background: #69b6ff;
	}
	
	.server-wrap {
		margin: 25px 0 30px;
		border: 1px solid #E0E0E0;
	}
	
	.title {
		background: #69B6FF;
		height: 25px;
		padding: 0 15px;
	}
	
	h4 {
		color: #FFFFFF;
		line-height: 25px;
	}
	
	.sever-btn {
		height: 70px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E0E0E0;
	}
	
	label {
		text-align: right;
		margin-left: 40px;
		margin-bottom: 0;
		cursor: pointer;
		vertical-align: middle;
	}
	.line {
		border-left: 1px solid #E0E0E0;
		height: 15px;
		margin-left: 5px;
		vertical-align: middle;
	}
	
	input[type=text] {
		width: 180px;
		height: 25px;
		border-radius: 3px;
		padding: 0 10px;
	}
	
	.logtype {
		margin-top: 40px;
	}
	

	.add_logLabel span{
		display: inline-block;
	}
	.buts {
		display: flex;
		vertical-align: top;
		margin-left: 120px;
		margin-top: 15px;
		width: 600px;
		flex-wrap: wrap
	}
	
	li {
		display: inline-block;
	}
	
	.buts li {
		border: 1px solid #E2E2E2;
		border-radius: 5px;
		padding:2px 10px 3px;
		margin: 0 40px 20px 0;
	}
	
	.buts .check {
		width: 12px;
		height: 12px;
		margin: 0;
	}
	
	.buts label {
		margin-left: 3px;
		display: inline-block;
		font-weight: 500;	
	}
	
	.add-ok {
		text-align: center;
		height: 280px;
		line-height: 280px;
	}
	.input_wrap  input{
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
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	span{
		vertical-align: middle;
	}
	.modal-body{
		height: 300px;
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
	.result{
		text-align: center;
		height: 300px;
		line-height: 250px;
	}
</style>