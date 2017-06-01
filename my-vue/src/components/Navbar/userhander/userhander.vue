<template>
	<div id="user-handle">
		<ul class="list-inline" >
			<li @click="reload()" @mouseenter="actived('reload')" @mouseleave="unactived()" >
					<img v-if="type=='reload'" src="../../img/bule_refresh.png"/>
					<img v-else src="../../img/refresh.png"/>
					<p :class="type=='reload'?'bule':'whirte'">刷新</p>
			</li>
			<li class="save" @click="saveConf()" @mouseenter="actived('save')" @mouseleave="unactived()">
				<img v-if="type=='save'" src="../../img/bule_save.png" />
				<img v-else src="../../img/save.png"/>
				<p :class="type=='save'?'bule':'whirte'">保存配置</p>
			</li>
			<li @click="goLogout()" @mouseenter="actived('exit')" @mouseleave="unactived()">
				<img v-if="type=='exit'" src="../../img/bule_exit.png" />
				<img v-else src="../../img/exit.png" />
				<p :class="type=='exit'?'bule':'whirte'">注销</p>
			</li>
			<li class="photo">
				<p id="name">{{username}}</p>
				<img v-if="type=='photo'" src="../../img/bule_photo.png" />
				<img v-else src="../../img/photo.png"/>
			</li>
		</ul>
		<success :result='result' :errorMsg='errorMsg' @savedata='savedata'></success>
	</div>
</template>
<script>
import userService from 'services/userService'
import sysService from 'services/systemService'

import success from './alert/success.vue'

export default {
	components: {
        success
	},
	data(){
		return{
			result:'',
			errorMsg:'',
			type:""
		}
	},
	computed:{
		username:function(){
			return this.$store.state.login.user_id
		}
	},
	methods: {
		goLogout() {
			userService.logout()
			.then((recvdata) => {
				recvdata = JSON.parse(recvdata)
				if(recvdata.success) {
					this.$store.commit('EDIT_NOTE', {"isLogin":false,"user_id":null,"user_group":null,"windows":false})
				}
			})
		},
		saveConf(){
			if(this.$store.state.cert.status=='valid'||this.$store.state.cert.type=='official'){
				this.result=""
			    $("#savesuccess").modal('show')
			}			
		},
		savedata(){
			sysService.saveConfig()
			.then((recvdata) => {
				recvdata = JSON.parse(recvdata)
				if(recvdata.success == true) {
					this.result="ok"
				}else{
					this.result="error"
					this.errorMsg=recvdata.errorMessage
				}
			})
		},
		reload(){
			location.reload()
		},
		actived(type){			
			if(type=='save'&&!(this.$store.state.cert.status=='valid'||this.$store.state.cert.type=='official')){
				this.type = ''
			}else{
				this.type = type
			}
		},
		unactived(){
			this.type = ""
		}
	}
}
</script>
<style scoped>	
	#user-handle {
		margin-right:15px;
		margin-top: 6px;
		line-height: 40px;
	}

	#name {
		line-height: 24px;
		box-sizing: border-box;
		max-width: 60px;
		display: inline-block;
		color: #ffffff;
		padding-right: 10px;
		font-size: 14px;
		vertical-align: middle;
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	#user-handle li{
		text-align: center;
	}
	#user-handle li:last-child img {
		width: 22px;
	}
	.list-inline{
		display: flex;
		justify-content: space-between;
	}
	.list-inline li {
		cursor: pointer;
	}	
	.list-inline p{   
	   line-height: 10px;	
	   font-size: 10px;
	}
	.photo{
		margin-top:8px;
		margin-right: 5px;
		padding-right: 0px;
		vertical-align: middle;
	}
	.whirte{
		color:#ffffff;
	}
	.bule{
		color: #69b6ff;
	}
</style>