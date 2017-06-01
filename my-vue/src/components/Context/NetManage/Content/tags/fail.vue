<template>
    <div class="modal" id="fail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					<span class="close" data-dismiss="modal" aria-hidden="true">&times;</span>
					提示
				</div>
				<div class="modal-body">
					<div class="msg">
						<img src="../../../../img/fail.png" />
					</div>
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
		height: 25px;
		background: #69b6ff;
		font-size: 15px;
		color: #FFFFFF;
		padding: 1px 0 0 15px;
	}
	.modal-body {
        padding: 0px;
        width: 500px;
		height: 150px;
		line-height: 100px;
    }
	.msg{
		text-align: center;
		margin: 0 auto;
		padding-top: 30px;
	}
	span {
		vertical-align: middle;
	}
	
	.enter {
		width: 80px;
		height: 25px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #69b6ff;
	}

    .modal-footer{
        border: none;
        text-align: center;
        margin: 0 auto;
        padding-top: 0;
    }
</style>