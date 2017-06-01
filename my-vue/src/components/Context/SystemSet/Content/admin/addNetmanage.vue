<template>
	<div @keyup.enter="submit()" @click.self='freshData()' class="modal" id="addrole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" @click='freshData()' data-dismiss="modal" aria-hidden="true">&times;</span>
					<h4 class="modal-title" id="myModalLabel">系统管理员 > 新增</h4>
				</div>
				 <!--正在请求-->
                <div class="modal-body result" v-show="result=='loading'">
                    <div style="height: 398px;padding-top: 120px;">
                        <img src="../../../../img/loading.gif" />
                        <p style="color: #000000;">正在链接数据，请稍后……</p>
                    </div>
                </div>
                <!--成功-->
                <div class="modal-body result" v-show="result=='success'">
                    <div style="height: 398px;padding-top: 150px;">
                        <img src="../../../../img/success.png" />
                    </div>
                </div>
                <!--添加-->
				<div v-show="result=='add'" class="modal-body">
					<table>
						<thead>
							<tr>
								<th colspan="2">新增网管策略</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="width:160px;">用户名：</td>
								<td style="width: 1000px;">
									<input type="text" class="userName" v-model="user_id" @blur="testVal('.userName', 'username')" @focus="noEmpty('.userName')" placeholder="6~18个字符，由字母、数字、下划线组成"><span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td>认证方式：</td>
								<td>
									<select id="auth_way" v-model="auth_way">
										<option value="1">口令认证</option>
										<option value="2">Dkey</option>
									</select>
								</td>
							</tr>
							<tr>
								<td style="width:160px;">设置密码：</td>
								<td style="width: 1000px;">
									<input type="password" class="addPassword" @blur="isEmpty('.addPassword')" @focus="noEmpty('.addPassword')" v-model="password"><span class="mi">* 必填</span>
								</td>
							</tr>
							<tr>
								<td style="width:160px;">确认密码：</td>
								<td style="width: 1000px;">
									<input type="password" @blur='passwordTest(".rpassword")' class="rpassword" v-model="rpassword"><span style="display: none" class="mi">* 两次输入不一直</span>
								</td>
							</tr>
							<tr>
								<td style="width:160px;">真实姓名：</td>
								<td style="width: 1000px;">
									<input type="text" v-model="real_name">
								</td>
							</tr>
							<tr>
								<td style="width:160px;">公司部门：</td>
								<td style="width: 1000px;">
									<input type="text" v-model="department">
								</td>
							</tr>
							<tr>
								<td style="width:160px;">邮箱地址：</td>
								<td style="width: 1000px;">
									<input type="text" class="email" @blur="testVal('.email', 'email')" @focus="noEmpty('.email')" v-model="email" >
								</td>
							</tr>
							<tr>
								<td>角色：</td>
								<td>
									<select id="user_role" v-model="role">
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
					<button class="cancel button button--aylen"  @click="closeAdd()">取 消</button>					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import userservice from 'services/userService'
	import formatTest from 'libs/formatTest'
	export default {
		data() {
			return {
				user_id:"",
				role:"2",
				real_name:"",
				department:"",
				email:"",
				auth_way:1,
				password:"",
				rpassword:"",
				result:"add",
				errorMsg:"",
				emailStatus:true
			}
		},
		mounted(){
			this.addselecter()
		},
		methods: {
			submit(){
				this.errorMsg = ""
				$('.notice').hide()
				if(this.validata()){
					let user = {
						user_id:this.user_id,
						role:$("#user_role").val(),
						auth_way:$("#auth_way").val(),
						real_name:this.real_name == "" ? "" : this.real_name,
						department:this.department == "" ? "" : this.department,
						email:this.email == "" ? "" : this.email,
						password:this.password
					}
					this.result = "loading"
					userservice.addUser(user)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							this.result = "success"
							this.$emit('getData');
							var _this=this
							setTimeout(function () {
								$('#addrole').modal('hide');
								_this.freshData();
							}, 800);
						} else{
							this.result = "add"
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
			closeAdd(){
                $("#addrole").modal('hide')
				this.freshData()
            },
			addselecter(){
				var _this = this
				$('#auth_way').change(function(){
					if($(this).children('option:selected').val()=="2"){
						_this.role = "1"
					}else{
						_this.role = "2"
					}
				})
				$('#user_role').change(function(){
					if($(this).children('option:selected').val()=="1"){
						_this.auth_way = "2"
					}else{
						_this.auth_way = "1"
					}
				})
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
			testValnull(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, true)
				return test.testFormat()
			},
			isEmpty(ele) {
				if($(ele).val()==''){
					 $(ele).css("border",'1px solid #b63039')
					$(ele).addClass("animated shake")
					setTimeout(function() {
						$(ele).removeClass('animated shake')
					}, 200)
					$(ele).parent().find('.mi').css("color",'#b63039')
					return false
				}else{
					$(ele).css("border",'1px solid #d2d2d2')
					$(ele).parent().find('.mi').css("color",'#d2d2d2')
					return true
				} 
			},
			passwordTest(ele){
				if(this.password!=this.rpassword){
					 $(ele).css("border",'1px solid #b63039')
					$(ele).addClass("animated shake")
					setTimeout(function() {
						$(ele).removeClass('animated shake')
					}, 200)
					$(ele).parent().find('.mi').css("color",'#b63039')
					$(ele).parent().find('.mi').show()
					return false	
				}else{
					$(ele).css("border",'1px solid #d2d2d2')
					$(ele).parent().find('.mi').css("color",'#d2d2d2')
					$(ele).parent().find('.mi').hide()
					return true
				}
			},
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			},
			validata(){
				if($('.email').val()){
					this.testVal('.email', 'email')
				}
				if(this.emailStatus||!$('.email').val()){
					if(this.testVal('.userName', 'username')&&this.isEmpty('.addPassword')&&this.passwordTest(".rpassword")){
						return true
					}else{
						return false
					}
				}else{
					return false
				}
			},
			freshData(){
				this.user_id="",
				this.role="2",
				this.auth_way="1",
				this.real_name="",
				this.department="",
				this.email="",
				this.password="",
				this.rpassword=""
				this.errorMsg = ""
				this.result='add'
				$('.notice').hide()
				$('.rpassword').parent().find('.mi').hide()
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
	
	.sure,
	.cancel {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
	}
	.sure {
		margin-right: 30px;
	}
	
	input {
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
	.streng{
        display: inline-block;
        width: 170px;
        padding-left: 18px;
        height: 20px;
    }

	.tag{
        display: inline-block;
        width: 20px;
        padding-left: 6px;
    }

    .streng1,
    .streng2,
    .streng3{
        display: inline-block;
        width: 30px;
        height: 7px;
        border: 1px solid #e6e6e6;
        margin-left: 5px;
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