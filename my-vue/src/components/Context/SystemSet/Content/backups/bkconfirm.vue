
<template>
    <div class="modal" id="bkconfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					提示
				</div>
				<div class="modal-body">
					<div class="msg">是否恢复出厂设置？</div>
				</div>
				<div class="modal-footer">
					<button class="enter" @click="sure()">是</button>
					<button class="cancel" data-dismiss="modal">否</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	export default {
		methods: {
			 sure:function(){
				 this.$emit('doThing')
				 $("#bkconfirm").modal("hide")
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
		height: 90px;
    }
	.msg{
		font-size: 15px;
		text-align: center;
		margin: 0 auto;
		padding-top: 36px;
	}
	span {
		vertical-align: middle;
	}
	
	button {
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
        text-align: center;
        margin: 0 auto;
        padding-top: 0;
    }
    .enter{
        margin-right: 20px;
    }
</style>