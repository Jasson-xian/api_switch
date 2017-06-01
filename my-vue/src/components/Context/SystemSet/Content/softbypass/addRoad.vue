<template>
    <div @keyup.enter="addBypass()" class="modal " id="roadmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<table class="table">
						<thead>
							<tr>
								<th colspan="4">添加线路线
									<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
								</th>
							</tr>
						</thead>
						<!--正在请求-->
						<tbody class="result" v-show="result=='loading'">
							<div style="height: 150px;">
								<img src="../../../../img/loading.gif" style="width: 80px"/>
					    		<p>正在链接数据，请稍后……</p>
							</div>
						</tbody>
						<!--成功-->
						<tbody class="result" v-show="result=='success'">
							<div style="height: 150px;padding-top: 30px;">
								<img src="../../../../img/success.png" />
							</div>
						</tbody>
						<!--添加-->
						<tbody v-show="result=='add'">
							<tr>
								<td>选择路线：</td>
								<td colspan="3">
									<select  class="route" :class="[routes.length<=0?'nosele':'']" :disabled="routes.length > 0 ? false : true"
									@blur="testVal('.route', 'allpass')" @focus="noEmpty('.route')"  >
									 	<option v-if="routes.length>0" v-for="option in routes" v-bind:value="option" >
											线路{{ option }}
										</option>
										<option v-if="routes.length<=0" value="">
											没有线路
										</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<div class="notice">
						<span>*{{errorMsg}}</span>
					</div>
					<button class="enter butn button button--aylen" @click="addBypass()">确认</button>
					<button class="cancel butn button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
    	</div>
    </div>
</template>
<script>
	import systemService from 'services/systemService'
	import formatTest from 'libs/formatTest'
	
	export default {
		props: {
			routes: {
				type: Array,
				required: true
			}
		},
		data(){
			return {
				result:"add",
				errorMsg:""
			}
		},
		methods: {
			 addBypass(){
				this.errorMsg = ""
				$('.notice').hide()

				 if ( this.testVal('.route', 'allpass') ){
					var bypass = {
						oper:"add",
						group: $('.route').val()
					};
					this.result = "loading"
					systemService.doBypass(bypass)
					.then((recvdata) => {
						recvdata = jQuery.parseJSON(recvdata);
						if(recvdata.success) {
							this.result = "success"
							this.$emit('getData');
							setTimeout(function () {
								$('#roadmodal').modal('hide');
							}, 800);
							var _this = this
							setTimeout(function () {
								_this.result = "add"
							}, 1500);
							this.errorMsg = ""
							$('.notice').hide()				
						}else if(recvdata.level == "error" && !recvdata.success) {
							this.result = "add"
							this.errorMsg = recvdata.errorMessage
							$('.notice').show().addClass('animated shake')
							setTimeout(function() {
								$('.notice').removeClass('animated shake')
							}, 200)
						}
					})
				}
            },
			noEmpty(ele){
				var test = new formatTest(ele)
			    test.notEmpty()
			},
			testVal(ele, reg) {
				var val = $(ele).val()
				var test = new formatTest(ele, reg, false)
				var flag = test.testFormat()
				if( !flag ){
					$(ele).popover('show');
					setTimeout(function() {
						$(ele).popover('destroy')
					}, 1000)
				}
				return flag
			}
		}
    }
</script>
<style scoped>
	.modal-dialog {
		margin-top: 300px;
        margin-left: 45%;
	}
    .modal-content {
        width: 502px;
        border: 1px solid #69b6ff;
    }
	.modal-body {
        padding: 0px;
        width: 500px;
		height: 150px;
    }
    .table{
        width: 100%;
        margin-bottom: none; 
    }
	thead {
		background: #69b6ff;
        border-radius: 5px;
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
	table thead tr th {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    tbody tr:nth-child(1) td {
        padding-top: 40px;
    }
    tbody tr:nth-child(1) td:nth-child(1) {
        width: 150px;
        text-align: right;
        padding-top: 44px;
    }
	span {
		vertical-align: middle;
	}
	.butn {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
	}
	
    select {
        width: 150px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
    }
    .modal-footer{
        text-align: right;
        margin: 0 auto;
    }
    .enter{
        margin-right: 30px;
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
	.alert{
		position: absolute;
		margin:auto;
		left:0; 
		right:0; 
		top: 0;
		bottom:0;
		width: 260px;
		height: 55px;
		font-size: 14px;
		display: none;
	}
	.nosele{
		color: #d2d2d2;
	}
</style>