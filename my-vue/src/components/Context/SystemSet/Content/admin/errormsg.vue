<template>
    <div class="modal" id="errorfail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					提示
				</div>
				<div class="modal-body">
					<div class="msg">
						<img src="../../../../img/fail.png" />
					</div>
					<div class="error" >
						<p>原因：{{error}}</p>
					</div>
				</div>
				<div class="modal-footer">
					<button class="enter" @click="close()">确 认</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			error: {
				type: String,
				required: true
			}
		},
		methods: {
			close(){
				$("#errorfail").modal('hide')
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
		text-align: center;
		margin: 0 auto;
		padding-top: 10px;
	}
	.error{
		font-size: 14px;
		text-align: center;
	}
	p {
		color: #69b6ff;
	}
	button {
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