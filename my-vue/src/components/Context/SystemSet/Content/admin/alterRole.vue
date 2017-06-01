<template>
	<div class="modal " id="alterrole" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true" @click='freshData()'>&times;</span>
					<h4 class="modal-title" id="myModalLabel">系统管理员 > 修改</h4>
				</div>
				<!--正在请求-->
                <div class="modal-body result" v-show="result=='loading'">
                    <div style="height: 363px;padding-top: 100px;">
                        <img src="../../../../img/loading.gif" />
                        <p style="color: #000000;">正在链接数据，请稍后……</p>
                    </div>
                </div>
                <!--成功-->
                <div class="modal-body result" v-show="result=='success'">
                    <div style="height: 363px;padding-top: 140px;">
                        <img src="../../../../img/success.png" />
                    </div>
                </div>
                <!--添加-->
				<div v-show="result=='alter'" class="modal-body">
					<table>
						<thead>
							<tr>
								<th colspan="2">修改网管策略</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="width:160px;">用户名：</td>
								<td style="width: 1000px;">
									<input type="hidden" v-model="u_id" id="u_id">
									<input type="text" v-model="user_id" id="user_id" @blur="testVal('#user_id', 'username')" @focus="noEmpty('#user_id')" placeholder="6~18个字符，由字母、数字、下划线组成">
									<span class="mi">* 必填</span>
									<div class="error useridmsg" ></div>
								</td>
							</tr>
							<tr>
								<td>认证方式：</td>
								<td>
									<select id="pwd_way" v-model="pwd_way">
										<option value="1">口令认证</option>
										<option value="2">Dkey</option>
									</select>
								</td>
							</tr>
							<tr>
								<td style="width:160px;">密码：</td>
								<td style="width: 1000px;">
									<button class="changePwd altbtn  button button--aylen" data-toggle="modal" data-target="#changepwd" >修改密码</button>
								</td>
							</tr>
							<tr>
								<td style="width:160px;">真实姓名：</td>
								<td style="width: 1000px;">
									<input type="text" v-model="real_name" id="real_name">
								</td>
							</tr>
							<tr>
								<td style="width:160px;">公司部门：</td>
								<td style="width: 1000px;">
									<input type="text" v-model="department" id="department">
								</td>
							</tr>
							<tr>
								<td style="width:160px;">邮箱地址：</td>
								<td style="width: 1000px;">
									<input type="text" v-model="email" id="email" @blur="testVal('#email', 'email')" @focus="noEmpty('#email')">
									<div class="error emailmsg" ></div>
								</td>
							</tr>
							<tr>
								<td>角色：</td>
								<td>
									<select id="role" v-model="role">
										<option value="1">超级管理员</option>
										<option value="2">管理员</option>
										<option value="3">审计员</option>
									</select>
								</td>
							</tr>
							<tr>
								<td colspan="2" style="text-align: center;height: 60px;">
									使用Dkey认证 （DKey日志权限：只有插入DKey才能查询审计日志，DKey登录权限：只有插入DKey才能登录管理）
								</td>

							</tr>
						</tbody>
					</table>
					<p>（注：DKey写入操作前，请先下载并安装DKey驱动；一个DKey只能仅存一个用户的Dkey信息，写入DKey将覆盖上一个用户的DKey信息）</p>
				</div>
				<div class="modal-footer">
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="sure button button--aylen" @click="submit()">确 认</button>
					<button class="closerole button button--aylen" @click="closeRole()">取 消</button>					
				</div>
				<changepwd :uid="u_id"></changepwd>
			</div>
		</div>
		<altermsg :error="error"></altermsg>
	</div>
</template>
<script>
	import userservice from 'services/userService'
    import changepwd from './changePwd.vue'
	import altermsg from '../admin/altermsg.vue'
	import formatTest from 'libs/formatTest'
	export default {
		props: {
			user: {
				type: Object,
				default: function () {
					return { user }
				}
			}
		},
		components: {
			changepwd,
			altermsg
		},
		data() {
			return {
				error:"",
				result:"alter",
				errorMsg:""
			}
		},
		computed: {
			u_id: function() {
                return this.user.u_id
            },
			user_id: function() {
				return this.user.user_id
			},
			pwd_way: function() {
				if(this.user.user_group == "1"){
					return "2"
				}else{
					return "1"
				}
            },
			real_name: function () {
				return this.user.real_name
            },
			department: function() {
                return this.user.department
            },
			email: function() {
                return this.user.email
            },
			role: function() {
				return this.user.user_group
            }
        },
		mounted(){
			this.selecter()
			
		},
		watch: {
			result: function() {
				if(this.result == 'success') {
					var _this = this					
					setTimeout(function() {
						$('#alterrole').modal('hide')
						 _this.result = "alter"
					}, 500)
				}
			}
		},
		methods: {
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				if(ele=='.email'&&!test.testFormat()){
					this.emailStatus=false
				}else{
					this.emailStatus=true
				}
				return test.testFormat()
			},
			submit(){
				this.errorMsg = ""
				$('.notice').hide()
				if(this.validata()){
					let user = {
						user_id:$("#user_id").val(),
						role:$("#role").val(),
						real_name:$("#real_name").val(),
						department:$("#department").val(),
						email:$("#email").val(),
						uid:this.u_id
					}
					this.result = "loading"
					userservice.updateUser(user)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							this.result = "success"
							this.$emit('getData');
							this.freshData();
						} else if(!recvdata.success) {
							this.result = "alter"
							this.errorMsg = recvdata.errorMessage
							if(recvdata.errorMessage.indexOf("数据库操作出错") >= 0){
								this.errorMsg = "数据库错误!"
							}
							$('.notice').show().addClass('animated shake')
							setTimeout(function() {
								$('.notice').removeClass('animated shake')
							}, 200)
						}
					})
				}
			},
			validata(){
				if(this.testVal('#user_id', 'username')&&(this.testVal('#email', 'email')||$("#email").val() == "")){
					return true
				}
				return false
			},
			closeRole(){
				this.freshData()
                $("#alterrole").modal('hide')
            },
			selecter(){
				if($('#pwd_way').val()=="2"){
					$("#role").val("1")
				}
				$('#pwd_way').change(function(){
					if($(this).children('option:selected').val()=="2"){
						$("#role").val("1")
					}else if($(this).children('option:selected').val()=="1"){
						$("#role").val("2")
					}
				})
				$('#role').change(function(){
					if($(this).children('option:selected').val()=="1"){
						$("#pwd_way").val("2")
					}else{
						$("#pwd_way").val("1")
					}
				})
			},
			freshData(){
				this.errorMsg = ""
				$('.notice').hide()
				$('.mi').css('color', '#d2d2d2')
				$('.modal input').css('border', '1px solid #e8e8e8')
				$('.modal select').css('border', '1px solid #e8e8e8')
			}         
		}
	}
</script>
<style scoped>
	.modal-dialog {
		width: 1200px;
		margin-top: 200px;
		margin-left: 35%; 
	}
	
	.modal-content{
		width: 900px;
	}
	
	.modal-header {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding: 5px 20px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.modal-footer{
		padding-right: 20px;
	}
	.close{
		color: #ffffff;
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
		height: 35px;
	}
	
	td:first-child {
		text-align: right;
	}
	
	tbody tr td {
		border-left: 1px solid #bddfff;
		border-bottom: 1px solid #bddfff;
	}
	
	td:last-child,
	th:last-child {
		border-right: 1px solid #bddfff;
	}
	
	span {
		vertical-align: middle;
	}
	
	.num {
		text-align: center;
		width: 50px;
		height: 20px;
		background: #e6e6e6;
		border-radius: 5px;
	}
	.altbtn,
	.closerole,
	.sure{
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
	}
	
	.sure {
		margin-right: 30px;
	}
	.changePwd{
		background: #69b6ff;
		height: 22px;
		width: 75px;
	}
	
	input[type='text'] {
		width: 250px;
		height: 20px;
		background: #FFFFFF;
		border-radius: 5px;	
		border: 1px solid #e6e6e6;
		padding: 3px;
	}
	select{
		border-radius: 5px;	
	}
	.mi {
		color: #d2d2d2;
		margin-left: 10px;
	}
	p{
		margin-top: 10px;
		color: #5793ce ;
	}
	.error{
		display: inline-block;
		padding-left: 50px;
		color: #ff4242 ;
		vertical-align: middle;
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
</style>