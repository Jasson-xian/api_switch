<template>
    <div class="modal" id="mustone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					编辑
				</div>
				<div class="modal-body">
					<div class="msg">请选择一项进行编辑</div>
				</div>
				<div class="modal-footer">
					<button class="butn button button--aylen" data-dismiss="modal">确 认</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.modal-dialog {
		margin-top: 350px;
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
	
	.butn {
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
	.cancel{
		background-color: #f5b72e;
	}
	.close{
		color: #ffffff;
		margin-right: 10px;
	}
</style>