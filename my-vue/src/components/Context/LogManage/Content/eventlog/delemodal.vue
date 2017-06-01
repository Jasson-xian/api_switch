<template>
	<div class="modal deleModal-modal-lg" @keydown.enter = 'toDele()' id="deleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">清空日志</h3>
				</div>
				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-if="result=='reqing'"  style="line-height: 70px;">
						<img style="width:60px;" src="../../../../img/loading.gif" />
						<p style="font-size: 12px; line-height: 20px;">正在删除，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-else-if="result=='ok'" >
						<img src="../../../../img/success.png" />
					</div>
					<!--失败-->
					<div class="result" v-else-if="result=='error'">
						<img src="../../../../img/fail.png">
					</div>
					<!--内容-->
					<div class="result " v-else>
						<p>确定清空当前日志</p>
					</div>
				</div>
				<div class="modal-footer ">
					<button class="button button--aylen" v-on:click='toDele()'>确认</button>					
					<button class="button button--aylen" data-dismiss="modal ">关闭</button>
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
			}
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
			toDele() {
				this.$emit('clearAll')
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
		color: #ffffff;
		height: 30px;
		padding: 5px 20px;
	}
	
	h4 {
		line-height: 30px;
	}
	
	.close {
		color: #FFFFFF;
	}
	
	p {
		text-align: center;
		font-size: 16px;
	}
	
	.button {
		width: 80px;
		height: 30px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
		margin-right: 15px;
	}
	
	.modal-body {
		text-align: center;
		font-size: 16px;
		height: 120px;
	}
	
	.result {
		text-align: center;
		height: 120px;
		line-height: 100px;
	}
</style>