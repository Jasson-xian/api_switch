<template>
	<div class="modal deleModal-modal-lg" @keydown.enter="toDele()" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span  class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">删除主机备注</h3>
				</div>
				<div class="modal-body">
					<!-- 正在请求 -->
					<div class="result" v-if="result=='reqing'" style="line-height: 70px;">
						<img src="../../../../img/loading.gif"  style="width: 60px;"/>
					    <p style="line-height: 20px;font-size: 12px;">正在删除，请稍后……</p>
					</div>
					<!-- 成功 -->
					<div class="result" v-else-if="result=='ok'">
						<img src="../../../../img/success.png" />
					</div>
					<!-- 失败 -->
					<div class="result" v-else-if="result=='error'">
						<img  src="../../../../img/fail.png" />
						<p class="notice">{{errorMsg}}</p>
					</div>				
					<img v-else-if="result=='error'" src="../../../../img/fail.png"/>
					<p v-else>确定删除当前主机备注</p>
				</div>
				<div class="modal-footer">
					<button class="button button--aylen" v-on:click='toDele()'>确认</button>
					<button class="button button--aylen" data-dismiss="modal">取消</button>					
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
			oper:{
			    type: String,
				required: true	
			},
			errorMsg:{
				type: String,
				required: true
			}
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					//把所有的input设置成未选择
					if(this.oper=='del'){
						$('table input[type =checkbox]').each(function(index, e) {
						   $(e).prop("checked", false)
					    })
					}				
					setTimeout(function() {
						$('.deleModal-modal-lg').modal('hide')
					}, 500)
				}
			}
		},
		methods: {
			toDele() {
				this.$emit('setDelData')
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
	.close{	
		color: #FFFFFF;
	}
	.button {
		width: 80px;
		height: 30px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
		margin-right: 15px;
	}

	input {
		width: 250px;
		height: 25px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		padding: 0 10px;
	}
	
	select {
		width: 250px;
		height: 25px;
		border-radius: 5px;
		border: 1px solid #e6e6e6;
	}
	
	.modal-body {
		text-align: center;
		font-size: 16px;
		height: 120px;	
		line-height: 100px;	
	}
	.result{
		text-align: center;
		height: 120px;
	}
	.notice{
		padding: 0 20px;
		font-size: 12px;
		text-align: center;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>