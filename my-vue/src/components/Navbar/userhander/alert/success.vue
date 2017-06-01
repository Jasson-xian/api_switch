<template>
	<div class="modal" id="savesuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span  class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">提示</h3>
				</div>
				<div class="modal-body">
					<!--成功-->
					<div class="result" v-if="result=='ok'" style="line-height: 100px;">
						<img src="../../../img/success.png" />
					</div>
					<!--失败-->
					<div class="result" v-else-if="result=='error'">
						<img  src="../../../img/fail.png" />
						<p class="notice" >{{errorMsg}}</p>
					</div>				
					<p v-else style="line-height: 100px;">确定保存当前配置</p>
				</div>
				<div class="modal-footer">
					<template v-if='result==""'>
						<button class="sure button button--aylen" v-on:click='toDele()'>确认</button>					
						<button class="cancel button button--aylen" data-dismiss="modal">取消</button>
					</template>
					<template v-else>
						<button class="sure button button--aylen" data-dismiss="modal" >确认</button>					
					</template>
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
			}
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					//把所有的input设置成未选择				
					setTimeout(function() {
						$('#savesuccess').modal('hide')
					}, 500)
				}
			}
		},
		methods: {
			toDele() {
				this.$emit('savedata')
			}
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 300px;
		margin-left: 40%;
	}
	.modal-footer{
		line-height:30px;
		padding:10px 20px;
	}
	.modal-content {
        width: 540px;
        border: 1px solid #69b6ff;
    }
	.modal-title{
		padding-top: 5px;
	}
	.modal-header {
		background: #69b6ff;
		color: #ffffff;
		height: 35px;
		padding: 5px 20px;
		border-top-left-radius: 6px;
        border-top-right-radius: 6px;
	}
	
	h4 {
		line-height: 30px;
	}
	.close{
		color: #FFFFFF;
	}
	.sure,
	.cancel {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;	
	}
	.sure_btn{
		
	}
	.sure{
		margin-right: 30px;
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
	}
	.result{
		text-align: center;
		height: 120px;
	}
	.notice{
		width: 100%;
		line-height: 20px;
		text-align: center;		
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>