<template>
	<div class="modal" id="timeout"  aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title" id="myModalLabel">登录超时</h3>
				</div>
				<div class="modal-body">
					<img src="../img/cry.png"/>
					<span>WebUI超时，请重新登录</span>
				</div>
				<div class="modal-footer">
				    <button class="sure button button--aylen" @click="jumpTo()" data-dismiss="modal">确认</button>									
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import userService from 'services/userService'
	export default {
		methods: {
			jumpTo: function() {
				this.$store.commit('EDIT_NOTE', {"isLogin":false,"user_id":null,"user_group":null,"windows":false})
		    } 
		}
	}
</script>
<style scoped>
	.modal-dialog {
		margin-top: 340px;
	}
	.modal-footer{
		line-height:30px;
		padding:10px 20px;
	}
	.modal-title{
		padding-top: 5px;
	}
	.modal-header {
		background: #69b6ff;
		color: #ffffff;
		height: 35px;
		padding: 1px 20px;
		font-size: 14px;
	}
	.sure {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;	
	}
	.modal-body {
		text-align: center;
		font-size: 16px;
		height: 120px;
		line-height: 100px;
	}
	span{
		vertical-align: middle;
	}
</style>