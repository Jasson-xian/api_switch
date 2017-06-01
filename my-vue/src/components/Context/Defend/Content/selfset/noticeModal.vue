<template>
	<div class="modal" id="import" @keydown.enter = 'changeData()'  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">上传数据</h3>
				</div>
				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-if="impok=='reqing'">
						<img style="width:70px;"  src="../../../../img/loading.gif" />
					    <p style="font-size: 12px; line-height: 20px;">正在上传，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-else-if="impok=='ok'" style="line-height: 100px;">
						<img src="../../../../img/success.png" />
					</div>
					<!--失败-->
					<div class="result" v-else-if="impok=='error'"  style="line-height: 50px;">
						<img  src="../../../../img/fail.png" />
						<p>{{errorMsg}}</p>
					</div>				
					<div class="result" v-else style="line-height: 100px;">		
                      <p>确定上传的新数据<span>{{iscover?',会覆盖原有数据':''}}</span></p>
					</div>
				</div>
				<div class="modal-footer">
					<button class="button button--aylen" @click='changeData()'>确认</button>
					<button class="button button--aylen" data-dismiss="modal">取消</button>					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			impok: {
				type: String,
				required: true
			},
			iscover: {
				type: Boolean,
				required: true
			},
			errorMsg:{
				type: String,
				required: true
			}
		},
		watch: {
			impok: function() {
				if(this.impok == 'ok') {									
					setTimeout(function() {						
						$('#import').modal('hide')
					}, 500)
				}
			}
		},
		methods: {
			changeData() {
				this.$emit('getFileData')
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
		height: 30px;
		padding: 0 15px;
		color: #FFFFFF;
	}
	
	h3 {
		line-height: 30px;
	}
	.close{
		margin-top: 2px;		
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
	.modal-body {
		text-align: center;
		font-size: 16px;
		height: 120px;
	}
	.result{
		text-align: center;
		height: 120px;
	}
</style>