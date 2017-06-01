<template>
	<div class="modal addModal-modal-lg" @click.self='resset()' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div  class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel">系统策略 > 新增网管策略</h4>
					<span @click='resset()' class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
				</div>
				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-show="result=='reqing'">
						<img src="../../../../img/loading.gif"/>
					    <p style="font-size: 12px;line-height: 20px;">正在链接数据，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-show="result=='ok'" style="line-height: 280px;">
						<img  src="../../../../img/success.png" style="margin-bottom: 80px"/>
					</div>
					<!--table-->
					<table v-show="result!='ok' && result!='reqing'">
						<thead>
							<tr>
								<th colspan="2">新增网管策略</th>
							</tr>
						</thead>
						<tbody>
                            <tr>
								<td style="width:250px;">规则名称：</td>
								<td style="width: 1000px;">
									<input type="text" style="background: #fff;height: 25px" @focus="empty('.addname')" @keyup.enter='addsyspol()' @blur="wordslength('.addname',0,100)" v-model='name' class="addname" placeholder="规则名称1">
									<span class="mi">*必填 (确认后不得修改)</span>
								</td>
							</tr>
                            <tr>
								<td style="width:250px;">允许设备管理的IP：</td>
								<td style="width: 1000px;">
									<!--<input type="text" @focus="empty('.addIp')" @keyup.enter='addsyspol()' placeholder="127.3.3.3" v-model='IP' @blur="testVal('.addIp','ip',false)" class="addIp"><span class="mi">*必填</span>-->
									<ipinput class="addmip" :empty=false></ipinput>
								</td>
							</tr>
							<tr>
								<td style="width:250px;vertical-align:top;padding: 10px 15px">描述：</td>
								<td style="width: 1000px;padding:10px 15px ">
									<textarea class="adddescrip" @focus="empty('.adddescrip')"  @blur="wordslength('.adddescrip',0,100)" v-model='description'></textarea>
									<span class="mi">*必填 (文字描述不超过100字)</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="notice" v-show='!result=="error"'>
						<span>*{{errorMsg}}</span>
					</div>
					<button class="sure button button--aylen" @click='addsyspol()'>确认</button>
					<button class="button button--aylen" @click='resset()' data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
	import formatTest from 'libs/formatTest'
	import ipinput from 'components/libs/ipinput'
	export default{
		components:{
			ipinput
		},
		props:{
			result:{
				type:String,
				reqiured:true
			},
			errorMsg:{
				type:String,
				reqiured:true
			}
		},
        data(){
            return{
				name:'',
				IP:'',
				description:'',
				status:false,
				length:false
			}
        }, 
		watch: {
			result: function() {
				if(this.result == 'ok') {
					setTimeout(function() {
						$('.addModal-modal-lg').modal('hide')
					}, 500)
				}else if(this.result == 'error'){
					$('.notice').show().addClass('animated shake')
					setTimeout(function() {
						$('.notice').removeClass('animated shake')					
					}, 200)
				}
			}
		},
        methods:{
			resset(){
				this.name=''
				this.IP=''
				this.description=''
			},
			testVal: function(ele, reg) {
			    var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				this.status=test.testFormat()			
			},
			ipVal(ele){
                let ipVal =  ($(ele+' .ip_a').val()?$(ele+' .ip_a').val():"")+
				             ($(ele+' .ip_b').val()?'.'+$(ele+' .ip_b').val():"")+
							 ($(ele+' .ip_c').val()?'.'+$(ele+' .ip_c').val():"")+
							 ($(ele+' .ip_d').val()?'.'+$(ele+' .ip_d').val():"")
			    return ipVal
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
                        return true
					}else{
						return false
					}	
				}
			},
			isEmpty:function(ele) {
				var val = $(ele).val()
				if(!val) {
					$(ele).css("border",'1px solid #b63039')
					$(ele).addClass("animated shake")
					$(ele).parent().find('.mi').css('color', '#b63039')
					setTimeout(function() {
						$(ele).removeClass('animated shake')
					}, 200)
				}else{
					if(ele!='.addIp'){
						$(ele).parent().find('.mi').css('color', '#575757')
						$(ele).css('border', '1px solid #e8e8e8')
					}
				}
				$(ele).css("outline",'none')
			},
			empty:function(ele){
				var test = new formatTest(ele)
				test.notEmpty()
				$(ele).parent().find('.mi').css('color', '#575757')
			},
			addsyspol:function(){
				this.wordslength('.addname',0,100)
				this.wordslength('.adddescrip',0,100)
				let addip=this.ipVal('.addmip')
				if(this.testMacIp('.addmip','ip')&&this.name!=''&&this.length){
					let addData={
						name:this.name,
						ip:addip,
						note:this.description
					}
					this.resset()
					this.$emit('addData',addData)
				}else{
					this.isEmpty(".addname")
					// this.isEmpty(".addIp")
					this.isEmpty(".adddescrip")
					this.wordslength('.adddescrip',0,100)
				} 
			},
			wordslength:function(ele,v1,v2){
					if($(ele).val().length<v2&&$(ele).val().length>v1){
						this.length=true;
						$(ele).css("border",'1px solid #d2d2d2')
						$(ele).parent().find('.mi').css("color",'#575757')	
					}else{
						this.length=false;
						$(ele).css("border",'1px solid #b63039')
						$(ele).addClass("animated shake")
						setTimeout(function() {
							$(ele).removeClass('animated shake')
						}, 200)
						$(ele).parent().find('.mi').css("color",'#b63039')
					}
			},
			text:function(){
				if(this.status&&this.name!=''&&this.length){
					$(".mistake").show()
				}else{
					$(".mistake").hide()
				}
			}
        }

    }	
</script>
<style scoped>
	.close {
			color: #FFFFFF;
			margin-top:-20px;
		}
	.modal-dialog {
		width: 900px;
		margin-top: 200px;
		margin-left: 20%;
	}
	
	.modal-content{
		width: 900px;

	}
	
	.modal-header {
		background: #333333;
		color: #ffffff;
		height: 30px;
		padding: 5px 20px;
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
		border-left: 1px solid #69b6ff;
		border-bottom: 1px solid #69b6ff;
	}
	
	td:last-child,
	th:last-child {
		border-right: 1px solid #69b6ff;
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
	
	.button {
		width: 80px;
		height: 30px;
		color: #FFFFFF;
		border-radius: 5px;
		margin-right: 20px;
		background: #69b6ff;
	}
	
	.sure {
		margin-right: 20px
	}
	
	input[type='text'] {
		width: 250px;
		height: 20px;
		background: #e6e6e6;
		border-radius: 5px;
		padding-left: 10px;
	}
	select{
		border-radius: 5px;	
	}
	.mi{
		margin-left: 5px;
		color:#575757;
		line-height: 20px;
	}
	
	p{
		margin-top: 10px;
		color: #ff4242 ;
	}
	.adddescrip{
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		width: 460px;
		height: 70px;
		resize: none;
		vertical-align: bottom;
		box-sizing: border-box;
		padding:5px;
		vertical-align: bottom 
	}
	.result{
		height: 192px;
		text-align: center;
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