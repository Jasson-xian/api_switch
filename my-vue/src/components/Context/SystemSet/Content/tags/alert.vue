<template>
    <div class="modal" id="alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    	<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-head">
					提示
					<span class="close" @click='freshData()' data-dismiss="modal" aria-hidden="true">&times;</span>
				</div>
				<div class="modal-body">
					<p><b>{{ comm }}</b> {{ msg }}</p>
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
	props: {
		code: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			comm:""
		}
	},
	computed:{
		msg(){
			if(this.code == "no"){
				this.comm = ""
				var msg = "必须选择一个操作进行确认"
			}else if(this.code == "halt"){
				this.comm = "关机"
				var msg = "操作执行！（电源延迟开关，长按5秒关机。关机后本页面失效。）"
			}else if(this.code == "fail"){
				this.comm = "失败！"
				var msg = "本次操作执行失败！"
			}else if(this.code == "nofile"){
				this.comm = ""
				var msg = "请先选择文件！"
			}else if(this.code == "success"){
				this.comm = ""
				var msg = "操作成功！"
			}
			return msg
		}
	},
	methods: {
		close(){
			$("#alert").modal('hide')
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
	b{
		color: red
	}
	p{
		text-align: center;
		font-size: 14px;
		padding-top: 30px;
	}
</style>