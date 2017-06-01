<template>
	<div @keyup.enter="submitPwd()" class="modal" id="changepwd"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false"   aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">系统管理员 > 修改密码</h4>
                    <span class="close" @click="closePwd()" aria-hidden="true">&times;</span>
				</div>
                <!--正在请求-->
                <div class="modal-body result" v-show="result=='loading'">
                    <div style="height: 217px;padding-top: 30px;">
                        <img src="../../../../img/loading.gif" />
                        <p>正在链接数据，请稍后……</p>
                    </div>
                </div>
                <!--成功-->
                <div class="modal-body result" v-show="result=='success'">
                    <div style="height: 217px;padding-top: 80px;">
                        <img src="../../../../img/success.png" />
                    </div>
                </div>
                <!--添加-->
				<div v-show="result=='alter'" class="modal-body">
					<table>
						<thead>
							<tr>
								<th colspan="2">修改密码</th>
							</tr>
						</thead>
						<tbody>
							<tr> 
								<td style="width:150px;">原密码：</td>
								<td style="width:350px;">
                                    <input type="password" id="oldpwd"/>
                                </td>
							</tr>
                            <tr>
								<td style="width:150px;">新密码：</td>
								<td style="width:350px;">
                                    <input type="password" id="newpwd" v-on:keyup="pwdStrength()"/>
                                    <div class="error-msg"></div>
                                    <ul class="streng">
                                        <li class="streng1"></li>
                                        <li class="streng2"></li>
                                        <li class="streng3"></li>
                                        <li class="tag"></li>
                                    </ul>
                                </td>
							</tr>
							<tr>
								<td style="width:150px;">重复新密码：</td>
								<td style="width:350px;">
                                    <input type="password" id="renewpwd" @blur='testpassword()'/>
                                    <div class="remsg"></div>
                                </td>
							</tr>
						</tbody>
					</table>
                    <p class="p1">安全密码格式必须为：</p>
                    <p class="p2">1、密码长度为8~15位字符。<br>2、必须同时包含字母、数字中两者。</p>
				</div>
				<div class="modal-footer">
                    <div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
                    <button class="sure button button--aylen" @click="submitPwd()">确 定</button>
					<button class="closepwd button button--aylen" @click="closePwd()">取 消</button>					
				</div>
			</div>
		</div>
    </div>
</template>
<script>
	import userservice from 'services/userService'

    export default {
        props: {
			uid: {
				type: String
			}
		},
        data(){
            return {
                result:"alter",
				errorMsg:""
            }
        },
        mounted(){
            $(".streng").hide();
            this.freshData()
        },
        methods: {
            submitPwd(){
                this.errorMsg = ""
				$('#changepwd .notice').hide()
                if( this.pwdVali() && this.pwdStrength()){
                    let oldpwd = $("#oldpwd").val()
                    let newpwd = $("#newpwd").val()
                    let renewpwd = $("#renewpwd").val()
                    var user = {
                        uid:this.uid,
                        old_pwd:oldpwd,
                        new_pwd:newpwd
                    }
                    this.result = "loading"
                    userservice.changePwd(user)
                    .then((recvdata) => {
                        recvdata = jQuery.parseJSON(recvdata);
                        if(recvdata.success) {
                            this.result = "success"
                            this.freshData()
                            setTimeout(function () {
								$('#changepwd').modal('hide');
							}, 1000);
                            var _this = this
							setTimeout(function () {
								_this.result = "alter"
							}, 1500);
                        } else if(!recvdata.success) {
							this.result = "alter"
							this.errorMsg = recvdata.errorMessage
							$('#changepwd .notice').show().addClass('animated shake')
							setTimeout(function() {
								$('#changepwd .notice').removeClass('animated shake')
							}, 200)
						}
                    })
                }
            },
            pwdVali(){
                let oldpwd = $("#oldpwd").val()
                let newpwd = $("#newpwd").val()
                let renewpwd = $("#renewpwd").val()
                if(oldpwd == ""){
                    $(".remsg").text("原密码不能为空")
                    return false
                }else if(!this.pwdStrength()){
                    $(".remsg").text("新密码不合法")
                    return false
                }else if(renewpwd == ""){
                    $(".remsg").text("请再次输入新密码")
                    return false
                }else if(newpwd != renewpwd){
                    $(".remsg").text("两次密码输入不一致") 
                    return false
                }else if(newpwd == renewpwd){
                    $(".remsg").text("")
                    return true
                }
                
            },
            testpassword(){
                if($("#newpwd").val()!=$("#renewpwd").val()){
                    $(".remsg").text("两次密码输入不一致")
                }else{
                     $(".remsg").text("")
                }
            },
            pwdStrength(){
                let newpwd = $("#newpwd").val()
                let renewpwd = $("#renewpwd").val()
                var level = 0;
                var str = "";
                $(".streng1").css("background","none")
                $(".streng2").css("background","none")
                $(".streng3").css("background","none")
                $(".tag").text("")
                if(newpwd.length >= 8 && newpwd.length <= 15){
                    for(let v of newpwd) {
                        str+=this.ascType(v)
                    }
                    $(".streng").hide();
                    $(".error-msg").show();
                    //非法
                    if( str.indexOf("i") > 0 ){
                        $(".error-msg").text("含有非法字符");
                        return false
                    }else if( str.indexOf("n")<0 ){
                        $(".error-msg").text("缺少数字");
                        return false
                    }else if( str.indexOf("b")<0 && str.indexOf("s")<0 ){
                        $(".error-msg").text("缺少字母");
                        return false
                    }else{
                        //合法 强度计算
                        $(".streng").show();
                        $(".error-msg").hide();
                        level = level+1;
                        if(str.indexOf("p")>0){
                            level = level+1;
                        }
                        if( str.indexOf("s")>=0 && str.indexOf("b")>=0 ){
                            level = level+1;
                        }
                        //显示强度
                        if(level==1){
                            $(".streng1").css("background","red")
                            $(".streng2").css("background","none")
                            $(".streng3").css("background","none")
                            $(".tag").text("弱")
                        }else if(level==2){
                            $(".streng1").css("background","#f5b72e")
                            $(".streng2").css("background","#f5b72e")
                            $(".streng3").css("background","none")
                            $(".tag").text("中")
                        }else if(level==3){
                            $(".streng1").css("background","#56BA89")
                            $(".streng2").css("background","#56BA89")
                            $(".streng3").css("background","#56BA89")
                            $(".tag").text("强")
                        }
                        return true;
                    }
                }else{
                    $(".streng").hide();
                    $(".error-msg").show();
                    $(".error-msg").text("密码长度在8~15位");
                    return false;
                } 
            },
            ascType(chr){
                var ascChr = chr.charCodeAt(0);
                if( (ascChr>=33 && ascChr<=47) || (ascChr>=58 && ascChr<=64) || (ascChr>=91 && ascChr<=96) || (ascChr>=123 && ascChr<=126) ){
                    return "p"
                }else if( ascChr>=48 && ascChr<=57 ){
                    return "n"
                }else if( ascChr>=65 && ascChr<=90 ){
                    return "b"
                }else if( ascChr>=97 && ascChr<=122 ){
                    return "s"
                }else{
                    return "i"
                };
            },
            closePwd(){
                $("#changepwd").modal('hide')
            },
            freshData(){
                $('#changepwd').on('hidden.bs.modal', function () {
                    $(".remsg").text("")
                    $(".error-msg").text("")
                    $(".streng").hide()
                    $("#oldpwd").val("")
                    $("#newpwd").val("")
                    $("#renewpwd").val("")
                    this.errorMsg = ""
				    $('#changepwd .notice').hide()
                })
            }
        }

    }
</script>
<style scoped>
	.modal-dialog {
		margin-top: 100px;
        margin-left: 180px;
		width: 500px;
	}

	.modal-content{
		width: 550px;
	}

	.modal-header {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding: 5px 20px;
	}

    .modal-body{
        padding-bottom: 10px;
    }

	.modal-footer {
		padding: 8px 20px;
	}
    .close{
		color: #ffffff;
        margin-top:-20px; 
	}
    table{
        margin: 0 auto;
        text-align: center;
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
		height: 40px;
        line-height:20px;
		text-align: center;
	}
	
	tbody tr td {
		border-left: 1px solid #bddfff;
		border-bottom: 1px solid #bddfff;
	}
    tbody tr td:first-child {
		text-align: right;
        padding-right: 10px;		
	}
	
	td:last-child,
	th:last-child {
		border-right: 1px solid #bddfff;
	}

	td:last-child{
		text-align: left;
		padding-left: 20px;
	}

    input {
		width: 150px;
		height: 20px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
        padding: 0px 2px 2px 2px;
	}

    .sure,
    .closepwd{
        width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
    }

    .p1{
        padding-top: 10px;
        padding-left: 8px;
    }
    .p2{
        padding-top: 5px;
        padding-left: 30px;
    }

    .sure{
        background: #69b6ff;
        margin-right: 30px;
    }

    .streng{
        display: inline-block;
        width: 170px;
        padding-left: 18px;
        height: 20px;
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

    .tag{
        display: inline-block;
        width: 20px;
        padding-left: 6px;
    }
    .error-msg{
        display: inline-block;
        padding-left:15px;
        color: red;
    }
    .remsg{
        display: inline-block;
        padding-left:15px;
        color: red;
    }
    .notice {
		position: absolute;
		bottom: 10px;
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
    .result {
		text-align: center;
	}
</style>