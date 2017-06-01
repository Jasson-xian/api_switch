<template>
	<div class="modal" id="bolckmodal"  @keydown.enter = 'toAddDel()' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span  class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					<h3 class="modal-title" id="myModalLabel">{{oper=='block'?'封堵':'解封'}}主机</h3>
				</div>
				<div class="modal-body">
					<!--正在请求-->
					<div class="result" v-if="result=='reqing'" style="line-height: 80px;">
						<img src="../../../../img/loading.gif" style="width: 60px;"/>
					    <p style="font-size: 12px;line-height: 20px;">正在链接数据，请稍后……</p>
					</div>
					<!--成功-->
					<div class="result" v-else-if="result=='ok'">
						<img  src="../../../../img/success.png" />
					</div>
					<!--失败-->
					<div class="result" v-else-if="result=='error'" style="position: relative">
						<img  src="../../../../img/fail.png" />
						<p style="position:absolute;top:75px;left: 50%;line-height: 30px;transform: translate(-50%,0);text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width: 100%;font-size: 13px">{{msg}}</p>
					</div>
					<div v-else class="result">
						<p>确定{{oper=='block'?'封堵':'解封'}}此主机</p>
					</div>
				</div>
				<div class="modal-footer">
					<button v-if="result==''" class="button button--aylen" v-on:click='toAddDel()'>确认</button>					
					<button class="button button--aylen"  data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			msg: {
				type: String,
				required: true
			},
			result: {
				type: String,
				required: true
			},
			oper:{
				type: String,
				required: true
			}
		},
		data() {
			return {}
		},
		watch: {
			result: function() {
				if(this.result == 'ok') {
					setTimeout(function() {
						$('#bolckmodal').modal('hide')
					}, 500)
				}
			}
		},
		methods: {
			toAddDel() {
				this.$emit('getSetData')
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
	}
	.result{
		text-align: center;
		height: 100px;
		line-height: 100px;
	}
	.close {
		color: #FFFFFF;
	}
</style>