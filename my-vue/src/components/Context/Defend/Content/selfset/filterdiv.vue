<template>
	<div>
		<ul>
			<li class="export" v-on:click='exportFile()'>
				<img src="../../../../img/export.png" />
				<span class="bulespan">导出EXCEL</span>
			</li>
			<li class="import" v-on:click='importFile()'>
				<img src="../../../../img/import.png" />
				<span class="bulespan">导入EXCEL</span>
			</li>
			<li style="position: relative;">
				<input type="text" class="styleinput" placeholder="   文件选择地址......"/>
				<label for="flieinput" class="button button--aylen" style="padding-left: 10px;font-weight: 500;padding-top:1px;margin-top:5px">浏览..</label>
				<input type="file" id='flieinput' class="flieinput" v-on:change='getNewfile()'  data-container="body" data-placement="bottom" data-content="请选择上传的文件" />
			</li>
			<li>
				<input type="checkbox" class="iscover" style="margin-left: 10px;" />
				<span style="margin:0 5px 0 3px;">导入时覆盖原有自定义表</span>
				<span style="color: #E2E2E2;">（备注：可先添加一条信息形成格式范例，根据范例导入文档）</span>
			</li>
		</ul>
		<noticeModal :impok='impok' :iscover='iscover' :errorMsg= 'errorMsg' v-on:getFileData='getFileData'></noticeModal>
	</div>
</template>
<script>
	import noticeModal from './noticeModal'
	import defendService from 'services/defendService'
	export default {
		components:{
			noticeModal			
		},
		data(){
			return{
				impok:'',
			    iscover:'',
			    formData:'',
			    errorMsg:''
			}
			
		},
		methods: {
			exportFile() { 
				var name = '主机备注'+new Date().toLocaleString()
				var url = '/services/v1_1/firewall/mac_info.php?'
				+'export=' + name 
				window.open(url);
			},
			getNewfile() {
				var newfile =this.getFilename(".flieinput")
				$('.styleinput').val(newfile)
			},
			getFilename(ele){
				var fileName="";
				if(typeof(fileName) != "undefined"){  
					fileName = $(ele).val().split("\\").pop();
				} 
				return fileName
			},
			importFile() {
				var upfile = document.getElementsByClassName('flieinput')[0].files[0]
				var fd = new FormData()
				fd.append('file', upfile)
				var overwrite = ''
				if($('.iscover').prop('checked')) {
					this.iscover =true
					fd.append('overwrite', '')
				}else{
					this.iscover =false
				}
				this.formData =fd
				if(!upfile) {
					//隐藏模态狂	
					$(".flieinput").popover('show');
					setTimeout(function() {
						$(".flieinput").popover('destroy');
					}, 500);												
				} else {
					this.impok = ''
					$('#import').modal('show')
				}
			},
			getFileData() {	
				var _this = this
				this.impok='reqing'
				$.ajax({
					url:"/services/v1_1/firewall/load_mac_info.php",
					type: 'POST',
					data: this.formData,
					processData: false,
					contentType: false
				}).then(function(data) {
					var recvdata = jQuery.parseJSON(data);
					if(recvdata.success) {					
                        _this.impok = 'ok'
                        $('.styleinput').val('')
                        var sentdata ={}
                        _this.$emit('getData',sentdata)
					}else{
						 _this.impok = 'error'
						 _this.errorMsg = recvdata.errorMessage
					}
				})

			}

		}
	}
</script>
<style scoped>
	.flieinput {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
		width: 200px;
	}
	
	.styleinput {
		background: #f1f1f1;
		border-radius: 5px;
		height: 20px;
		width: 150px;
	}
	
	.button {
		width: 50px;
		height: 20px;
		color: #FFFFFF;
		border-radius: 5px;
		background: #f5b72e;
		vertical-align: middle;
	}
	
	ul {
		border-bottom: 1px solid #ececec;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}
	
	ul li {
		display: inline-block;
		margin-right: 20px;
	}
	
	.bulespan {
		color: #69b6ff;
	}
	
	.export,
	.import {
		cursor: pointer;
	}
	span{
		vertical-align: middle;
	}
</style>