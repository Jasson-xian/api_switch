<template>
	<div class="modal" id="deleModal"  @keydown.enter="toDelServer()" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h4 class="modal-title" id="myModalLabel">删除服务器日志</h4>
				</div>

				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-if="result=='reqing'" style="line-height:70px;">
						<img src="../../../../img/loading.gif" style="width: 60px;"/>
					    <p style="font-size: 12px;line-height: 20px;">正在删除，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-else-if="result=='ok'">
						<img src="../../../../img/success.png" />
					</div>
					<!--失败-->
					<div class="result" v-else-if="result=='error'" >
						<img  src="../../../../img/fail.png" />
						<p class="notice">{{errorMsg}}</p>
					</div>	
					<div  v-else style='line-height: 100px;'>
						<p>确定删除该服务器</p>
					</div>					
				</div>
				<div class="modal-footer">
					<button type="button" class="sure button button--aylen" @click="toDelServer()">确定</button>					
					<button type="button" class="cancel button button--aylen" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
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
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					setTimeout(function() {
						$('#deleModal').modal('hide')
					}, 500)
				}
			}
		},
		methods: {
			toDelServer() {
				var sentdata={
					oper:'del'
				}
				this.$emit('getData',sentdata)
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
		color: #FFFFFF;
		height: 30px;
	}
	
	.modal-header h4 {
		margin-top: -8px;
	}
	
	.close {
		margin-top: -13px;
		color: #FFFFFF;
	}
	
	.modal-body {
		text-align: center;
		font-size: 16px;
		height: 120px;
		line-height: 80px;
	}
	
	.button {
		width: 80px;
		height: 30px;
		border-radius: 5px;
		color: #FFFFFF;
		background: #69b6ff;
		margin-right: 15px;		
	}
	
	.result{
		text-align: center;
		height: 120px;
		line-height: 100px;
	}
	.notice{
        padding: 20px;
		text-align: center;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>