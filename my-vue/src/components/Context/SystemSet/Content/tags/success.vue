<template>
    <div class="modal" id="success" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					<span class="close" @click='close()' data-dismiss="modal" aria-hidden="true">&times;</span>
					提示
				</div>
				<div class="modal-body">
					<div class="msg">
						<img src="../../../../img/success.png" />
					</div>
				</div>
				<div class="modal-footer">
					<button class="enter button button--aylen" @click="close()">确 认</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	methods: {
		close(){
			$("#success").modal('hide')
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
		height: 25px;
		background: #69b6ff;
		font-size: 15px;
		color: #FFFFFF;
		padding: 3px 0 0 15px;
	}
	.modal-body {
        padding: 0px;
        width: 500px;
		height: 130px;
		line-height: 100px;
    }
	.msg{
		text-align: center;
		margin: 0 auto;
		padding-top: 20px;
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
	.close{
		margin-right: 5px;
	}
</style>