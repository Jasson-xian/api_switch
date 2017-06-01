
<template>
    <div class="modal" id="fail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	 data-backdrop="static" data-keyboard="false" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					提示
					<span class="close" style="margin-right:15px;" data-dismiss="modal" aria-hidden="true">&times;</span>
				</div>
				<div class="modal-body">
					<div  style="line-height: 150px;">
						<div class="erorr_img"><img src="../../../../img/cry.png" /></div>
						<span class="erorr_text">{{errorMessage}}</span>					
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
	        errorMessage:{
		        type: String,
	            require: true
	        }
		}
	}
</script>
<style scoped>
	.erorr_img{
		display: inline-block;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;		
		vertical-align: middle;
	}
	.erorr_text{
		display: inline-block;
		width: 120px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin-left: -5px;	
	}
	.modal-dialog {
		margin-top: 400px;
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
		height: 180px;
		margin: 0 auto;
		text-align: center;
    }
	.img{
		margin: 0 auto;
		text-align: center;
		width: 120px;
		margin-top:10px;
		
	}
	.msg{
	margin: 0 auto;
		text-align: center;
		width: 200px;
		font-size: 15px;
		text-align: center;
		margin-top:10px;
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
	.cancel{
		background-color: #f5b72e;
	}
</style>