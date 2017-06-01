<template>
	<div @keyup.enter="setData()" @click.self='reset()' class="modal  pswdModal-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">系统策略 > 密码策略</h4>
					<span class="close" style="margin-top:-20px;color: #fff "  @click='reset()' data-dismiss="modal" aria-hidden="true">&times;</span>
				</div>
				<div class="modal-body">
					<!--请求-->
					<div class="result" v-if="result=='loading'">
						<div style="height: 171px;line-height:86px;text-align: center">
							<img src="../../../../img/loading.gif" />
							<p style="color: #000000;">正在链接数据，请稍后……</p>
						</div>
					</div>
					<!--成功-->
					<div class="result" v-else-if="result=='success'">
						<div style="height: 181px;line-height: 201px;text-align: center">
							<img src="../../../../img/success.png" />
						</div>
					</div>
					<table v-else>
						<thead>
							<tr>
								<th colspan="2">设置密码安全策略</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="width:240px;">安全密码格式必须为：</td>
								<td style="width: 560px;">1、密码长度为8~15位字符<br/> 2、必须同时包含字母、数字中两者
								</td>
							</tr>
							<tr>
								<td>
                                    <input type="checkbox" v-model="active" class="check" v-on:click="check()"/>
                                    <span>密码最长使用天数：</span>
                                </td>
								<td>
									<input type="number" min="1" class="num" v-model="days"/>
									<div class="error num-msg" ></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="notice" v-show='result=="error"'>
						<span>*{{errorMsg}}</span>
					</div>
					<button class="sure button button--aylen" @click="setData()">确定</button>
					<button class="closebtn button button--aylen" @click='reset()' data-dismiss="modal">关闭</button>					
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
	import userservice from 'services/userService'
	export default {
		data() {
			return {
				active:"",
				days:"",
				oper:"",
				result:'',
				errorMsg:'sadas'
			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			reset(){
				this.result=''
				this.errorMsg=''
			},
			setData(){
				if(this.valiData()){
					if(this.active){
						var conf = {
							oper:"update",
							is_active:this.active,
							conf_value:this.days,
						}
					}else{
						var conf = {
							oper:"update",
							is_active:this.active,
							conf_value:"",
						}
					}
					this.result='loading'
					userservice.expire(conf)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							this.result='success'
							var _this=this
							setTimeout(function() {
								$('.pswdModal-modal-lg').modal('hide')
								_this.reset()
							}, 1000)
						}else{
							this.result='error'
							this.errorMsg = recvdata.errorMessage
							$('#fail').modal('show')
						}
					})
				}
			},
			valiData(){
				$(".num-msg").text("")
				var reg = /^\+?[1-9][0-9]*$/
				if(this.active){
					if(!reg.test(this.days)){
						$(".num-msg").text("天数输入不正确")
						return false
					}else{
						return true
					}
				}else{
					return true
				}
			},
			check(){
				if(this.active){
					$(".num").removeAttr("readonly").css("color","#000000")
				}else{
					$(".num").attr("readonly","true").css("color","#e6e6e6")
				}
			},
			getData(){
				var conf = {
					oper:"",
					conf_value:"",
					is_active:""
				}
				userservice.expire(conf)
                .then((recvdata) => {
					recvdata = jQuery.parseJSON(recvdata);
					if(recvdata.success) {
						this.active = recvdata.data.is_active;
						this.days = recvdata.data.conf_value;
                    }
				})
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 250px;
        margin-left: 35%;
		width: 500px;
	}
	.modal-content{
		width: 800px;
	}
	.modal-header {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding: 5px 20px;
	}
	.modal-footer {
		padding: 8px 15px;
	}
	thead {
		background: #69b6ff;
	}
	
	th {
		color: #ffffff;
		height: 30px;
		padding: 0 15px;
	}
	
	td {
		padding: 0 15px;
		height: 70px;
        line-height:20px;
		text-align: center;
	}
	
	tbody tr td {
		border-left: 1px solid #bddfff;
		border-bottom: 1px solid #bddfff;
	}
	
	td:last-child,
	th:last-child {
		border-right: 1px solid #bddfff;
	}
	td:last-child{
		text-align: left;
		padding-left: 30px;
	}
    span{
        vertical-align: middle;
    }
    .num{
        text-align: center;
        width: 50px;
        height: 20px;
        background: #e6e6e6;
        border-radius: 5px;
    }
    .closebtn,
	.sure{
        width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
    }
    .sure{
        margin-right: 30px;
    }
	input[type="checkbox"]{
		width: 12px;
		height: 12px;
		margin-top: -1px;
	}
	.error{
		display: inline-block;
		padding-left: 50px;
		color: #ff4242 ;
		vertical-align: middle;
	}
	.modal-footer {
		position: relative;
	}
	.notice {
		position: absolute;
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