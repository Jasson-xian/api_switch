<template>
    <div class="modal failmsg" id="failmsg" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					<span>提示</span>
				</div>
				<div class="modal-body">
					<p>{{ msg }}</p>
				</div>
				<div class="modal-footer">
					<button class="enter button button--aylen" @click="closeFail()">确 认</button>
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
		}
	},
	methods: {
		closeFail(){
			this.$emit('fresh');
			$("#failmsg").modal('hide')
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
		height: 35px;
		background: #69b6ff;
		font-size: 15px;
		color: white;
		padding: 6px 0 0 15px;
	}
	.modal-body {
        padding: 0px;
        width: 500px;
		height: 100px;
    }
	span {
		vertical-align: middle;
		color: white;
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
	p{
		text-align: center;
		font-size: 15px;
		padding-top: 40px;
	}
</style>