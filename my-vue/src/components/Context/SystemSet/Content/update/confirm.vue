<template>
    <div class="modal" id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					提示
					<span style="margin-right:10px;color: #fff" class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
				</div>
				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-if="result=='reqing'">
						<img style="width:100px;"  src="../../../../img/loading.gif" />
					</div>
					<!--成功-->
					<div class="result" v-else-if="result=='ok'" style="line-height: 100px;">
						<img src="../../../../img/success.png" />
					</div>
					<!--失败-->
					<div class="result" v-else-if="result=='error'">
						<img style="margin-top: 20px" src="../../../../img/fail.png" />
						<p class="notice">{{errorMsg}}</p>
					</div>	
					<div v-else class="msg" style="line-height:100px;">{{ msg }}</div>
				</div>
				<div class="modal-footer">
					<button v-if='types!="cart"' class="enter button button--aylen" @click="sure()">是</button>
					<button v-else class="enter button button--aylen" @click="sure()">确定</button>
					<button v-if='types!="cart"' class="cancel button button--aylen" data-dismiss="modal">否</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	export default {
		props:{
			types: {
				type: String,
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
		methods: {
			 sure:function(){
				 if(this.types=='cart'){
					this.$emit('reload') 
				 }else{
					 this.$emit('doThing')
				 }
				//  $("#confirm").modal("hide")
			 }
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {					
					setTimeout(function() {
						$('#confirm').modal('hide')
					}, 500)
				}
			}
		},
		computed:{
			msg(){
				if(this.types == "reboot"){
					var msg = "设备即将重启，是否现在重启"
				}else if(this.types == "backup"){
					var msg = "是否恢复出厂设置"
				}else if(this.types == "halt"){
					var msg = "是否执行关机操作"
				}else if(this.types == "delete"){
					var msg = "是否删除此用户"
				}else if(this.types == "cart"){
					var msg = "授权证书上传成功"
				}
				return msg
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
	.modal-head{
		height: 30px;
		background: #69b6ff;
		font-size: 15px;
		color: white;
		padding: 3px 0 0 15px;
	}
	.modal-body {
        padding: 0px;
        width: 500px;
		/*height: 90px;*/
    }
	.msg{
		font-size: 15px;
		text-align: center;
		margin: 0 auto;
		/*padding-top: 36px;*/
	}
	span {
		vertical-align: middle;
	}
	
	.enter,
	.cancel {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
	}
	
	input[type='text'] {
		width: 150px;
		height: 20px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
	}
    select {
        width: 150px;
		height: 25px;
		background: #FFFFFF;
		border-radius: 5px;	
        border: 1px solid #e6e6e6;
    }
    .table>tbody>tr>td, 
    .table>tbody>tr>th, 
    .table>tfoot>tr>td, 
    .table>tfoot>tr>th, 
    .table>thead>tr>td, 
    .table>thead>tr>th{
        border-top: none;
    }
    .modal-footer{
        border: none;
        text-align:right;
        /*margin-top:20px; */
        padding-top: 0;
		padding-right:30px; 
    }
    .cancel{
        margin-left: 30px;
    }
	.result{
		text-align: center;
		height: 100px;
	}
	.notice{
		text-align: center;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}	
</style>